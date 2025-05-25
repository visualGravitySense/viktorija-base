import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useTranslation } from 'react-i18next';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 3,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
}));

interface MobileProgressProps {
  activeStep: number;
  steps: string[];
}

export default function MobileProgress({ activeStep, steps }: MobileProgressProps) {
  const { t } = useTranslation();
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
      <Stack spacing={2}>
        {/* Progress Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('checkout.progress.title', 'Прогресс оформления')}
          </Typography>
          <Chip 
            label={`${activeStep + 1}/${steps.length}`}
            size="small"
            color="primary"
            sx={{ fontWeight: 600 }}
          />
        </Stack>

        {/* Progress Bar */}
        <Box>
          <StyledLinearProgress 
            variant="determinate" 
            value={progress}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {Math.round(progress)}% {t('checkout.progress.completed', 'завершено')}
          </Typography>
        </Box>

        {/* Steps List */}
        <Stack spacing={1}>
          {steps.map((step, index) => (
            <Stack 
              key={step}
              direction="row" 
              alignItems="center" 
              spacing={2}
              sx={{
                p: 1,
                borderRadius: 1,
                bgcolor: index === activeStep ? 'primary.light' : 'transparent',
                color: index === activeStep ? 'primary.contrastText' : 'text.primary',
                transition: 'all 0.3s ease',
              }}
            >
              {index < activeStep ? (
                <CheckCircleIcon 
                  sx={{ 
                    color: 'success.main',
                    fontSize: '1.25rem',
                  }} 
                />
              ) : (
                <RadioButtonUncheckedIcon 
                  sx={{ 
                    color: index === activeStep ? 'primary.contrastText' : 'grey.400',
                    fontSize: '1.25rem',
                  }} 
                />
              )}
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: index === activeStep ? 600 : 400,
                  flex: 1,
                }}
              >
                {step}
              </Typography>
              {index < activeStep && (
                <Chip 
                  label={t('checkout.progress.done', 'Готово')}
                  size="small"
                  color="success"
                  variant="outlined"
                />
              )}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
} 