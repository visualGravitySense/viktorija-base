import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import SitemarkIcon from './SitemarkIcon';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'react-i18next';

function Copyright() {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {t('footer.copyright')}
      {' '}
      <Link color="text.secondary" href="https://mui.com/">
        Viktorija Autokool Nõmme
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      {/* Contact Info Banner */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 2, sm: 4 },
          p: 2,
          bgcolor: 'primary.light',
          borderRadius: 1,
          mb: 2,
          color: 'primary.contrastText',
          flexWrap: 'wrap',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneIcon fontSize="small" />
          <Typography variant="body2">
            Телефон/Viber: <Link href="tel:+37253464508" sx={{ color: 'inherit', fontWeight: 'bold' }}>+372 53464508</Link>
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={1} alignItems="center">
          <EmailIcon fontSize="small" />
          <Typography variant="body2">
            Email: <Link href="mailto:viktorijaautokool@hot.ee" sx={{ color: 'inherit', fontWeight: 'bold' }}>viktorijaautokool@hot.ee</Link>
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={1} alignItems="center">
          <FacebookIcon fontSize="small" />
          <Typography variant="body2">
            Facebook: <Link href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', fontWeight: 'bold' }}>viktorija.autokool</Link>
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <SitemarkIcon />
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
              {t('footer.subscribe')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {t('footer.weekly_updates')}
            </Typography>
            <InputLabel htmlFor="email-newsletter">{t('footer.email')}</InputLabel>
            <Stack direction="row" spacing={1} useFlexGap>
              <TextField
                id="email-newsletter"
                hiddenLabel
                size="small"
                variant="outlined"
                fullWidth
                aria-label={t('footer.your_email')}
                placeholder={t('footer.your_email')}
                slotProps={{
                  htmlInput: {
                    autoComplete: 'off',
                    'aria-label': t('footer.your_email'),
                  },
                }}
                sx={{ width: '250px' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ flexShrink: 0 }}
              >
                {t('footer.subscribe_button')}
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('footer.product')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="/viktorija-base/features">
            {t('navigation.services')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#testimonials">
            {t('navigation.reviews')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#highlights">
            {t('navigation.advantages')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#pricing">
            {t('navigation.prices')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#faq">
            {t('navigation.questions')}
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('footer.company')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="/viktorija-base/about">
            {t('navigation.about')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('footer.jobs')}
          </Link>
          <Link color="text.secondary" variant="body2" href="#">
            {t('footer.press')}
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {t('footer.contacts')}
          </Typography>
          <Link color="text.secondary" variant="body2" href="tel:+37253464508">
            Телефон/Viber: +372 53464508
          </Link>
          <Link color="text.secondary" variant="body2" href="mailto:viktorijaautokool@hot.ee">
            Email: viktorijaautokool@hot.ee
          </Link>
          <Link color="text.secondary" variant="body2" href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer">
            Facebook: viktorija.autokool
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">
            {t('footer.privacy_policy')}
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="text.secondary" variant="body2" href="#">
            {t('footer.terms_of_service')}
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://www.facebook.com/viktorija.autokool"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="mailto:viktorijaautokool@hot.ee"
            aria-label="Email"
            sx={{ alignSelf: 'center' }}
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="tel:+37253464508"
            aria-label="Phone"
            sx={{ alignSelf: 'center' }}
          >
            <PhoneIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
