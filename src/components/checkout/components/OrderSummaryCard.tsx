import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'react-i18next';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  borderRadius: 16,
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    pointerEvents: 'none',
  },
}));

interface OrderSummaryCardProps {
  totalPrice: string;
  category: string;
  transmissionType?: string;
  instructor?: string | null;
  onTransmissionChange?: (type: string) => void;
}

export default function OrderSummaryCard({ 
  totalPrice, 
  category, 
  transmissionType, 
  instructor,
  onTransmissionChange 
}: OrderSummaryCardProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState(false);

  const getCategoryName = () => {
    switch(category) {
      case 'category-a':
        return t('pricing.category_a.title', 'Категория A (Мотоцикл)');
      case 'category-b':
        return t('pricing.category_b.title', 'Категория B (Легковой автомобиль)');
      case 'category-c':
        return t('pricing.category_c.title', 'Категория C (Грузовой автомобиль)');
      default:
        return t('pricing.category_a.title', 'Категория A (Мотоцикл)');
    }
  };

  const getTransmissionName = () => {
    return transmissionType === 'manual' 
      ? t('checkout.transmission.manual', 'Механическая КПП')
      : t('checkout.transmission.automatic', 'Автоматическая КПП');
  };

  return (
    <StyledPaper elevation={3} sx={{ mx: 2, mt: 2 }}>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.875rem' }}>
              {t('checkout.total_amount', 'Общая стоимость')}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {totalPrice}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{ 
              color: 'inherit',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>

        {/* Quick Info */}
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            icon={<SchoolIcon />}
            label={getCategoryName().split('(')[0].trim()}
            size="small"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              color: 'inherit',
              fontWeight: 500,
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
          {category === 'category-b' && (
            <Chip
              icon={<SettingsIcon />}
              label={transmissionType === 'manual' ? 'МКПП' : 'АКПП'}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.15)',
                color: 'inherit',
                fontWeight: 500,
                '& .MuiChip-icon': {
                  color: 'inherit',
                },
              }}
            />
          )}
        </Stack>

        {/* Expandable Details */}
        <Collapse in={expanded}>
          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
          <Stack spacing={2}>
            {/* Course Details */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                {t('checkout.course_details', 'Детали курса')}
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SchoolIcon fontSize="small" sx={{ opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {getCategoryName()}
                  </Typography>
                </Stack>
                {category === 'category-b' && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SettingsIcon fontSize="small" sx={{ opacity: 0.8 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {getTransmissionName()}
                    </Typography>
                  </Stack>
                )}
                {instructor && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PersonIcon fontSize="small" sx={{ opacity: 0.8 }} />
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {t('checkout.instructor', 'Инструктор')}: {instructor}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>

            {/* Transmission Type Selector for Category B */}
            {category === 'category-b' && onTransmissionChange && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  {t('checkout.transmission_type', 'Тип коробки передач')}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={t('checkout.transmission.manual', 'Механическая')}
                    variant={transmissionType === 'manual' ? 'filled' : 'outlined'}
                    onClick={() => onTransmissionChange('manual')}
                    sx={{
                      bgcolor: transmissionType === 'manual' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                      color: 'inherit',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                  <Chip
                    label={t('checkout.transmission.automatic', 'Автоматическая')}
                    variant={transmissionType === 'automatic' ? 'filled' : 'outlined'}
                    onClick={() => onTransmissionChange('automatic')}
                    sx={{
                      bgcolor: transmissionType === 'automatic' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                      color: 'inherit',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                </Stack>
              </Box>
            )}
          </Stack>
        </Collapse>
      </Box>
    </StyledPaper>
  );
} 