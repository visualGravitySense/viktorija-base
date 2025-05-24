import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown.tsx';
import LanguageSwitcher from '../../shared-theme/LanguageSwitcher.tsx';
import Sitemark from './SitemarkIcon.tsx';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.8)`
    : alpha(theme.palette.background.default, 0.8),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px 10px',
  },
}));

const ContactBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 0',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  width: '100%',
}));

interface AppAppBarProps {
  toggleColorMode?: () => void;
}

export default function AppAppBar({ toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        [theme.breakpoints.down('sm')]: {
          mt: 'calc(var(--template-frame-height, 0px) + 16px)',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Contact Bar */}
        <ContactBar sx={{ display: { xs: 'none', md: 'flex' }, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PhoneIcon fontSize="small" />
              <Link href="tel:+37253464508" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                +372 53464508
              </Link>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <EmailIcon fontSize="small" />
              <Link href="mailto:viktorijaautokool@hot.ee" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                viktorijaautokool@hot.ee
              </Link>
            </Stack>
          </Box>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FacebookIcon fontSize="small" />
            <Link href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Facebook
            </Link>
          </Stack>
        </ContactBar>
        
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                ml: 2,
                gap: 0.5,
              }}
            >
              <Button
                variant="text"
                color="primary"
                size="small"
                component={RouterLink}
                to="/"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:focus': { textDecoration: 'none' },
                  '&:active': { textDecoration: 'none' }
                }}
              >
                {t('navigation.home')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                component={RouterLink}
                to="/features"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:focus': { textDecoration: 'none' },
                  '&:active': { textDecoration: 'none' }
                }}
              >
                {t('navigation.services')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                component={RouterLink}
                to="/about"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:focus': { textDecoration: 'none' },
                  '&:active': { textDecoration: 'none' }
                }}
              >
                {t('navigation.about')}
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                component={Link}
                href="#testimonials"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:focus': { textDecoration: 'none' },
                  '&:active': { textDecoration: 'none' }
                }}
              >
                {t('navigation.reviews')}
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                component={Link}
                href="#highlights"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:focus': { textDecoration: 'none' },
                  '&:active': { textDecoration: 'none' }
                }}
              >
                {t('navigation.advantages')}
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                component={Link}
                href="#pricing"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:focus': { textDecoration: 'none' },
                  '&:active': { textDecoration: 'none' }
                }}
              >
                {t('navigation.prices')}
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small" 
                sx={{ 
                  minWidth: 0,
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:focus': { textDecoration: 'none' },
                  '&:active': { textDecoration: 'none' }
                }}
                component={Link}
                href="#faq"
              >
                {t('navigation.questions')}
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <LanguageSwitcher />
            <Button 
              color="primary" 
              variant="text" 
              size="small"
              component={RouterLink}
              to="/checkout?category=category-c"
            >
              {t('navigation.signin')}
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              size="small"
              component={RouterLink}
              to="/checkout?category=category-b"
            >
              {t('navigation.signup')}
            </Button>
            <ColorModeIconDropdown 
              sx={{
                ml: 1,
              }}
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <LanguageSwitcher />
            <ColorModeIconDropdown 
              sx={{
                mr: 0.5,
              }}
            />
            <IconButton 
              aria-label="Menu button" 
              onClick={toggleDrawer(true)}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Sitemark />
                  <IconButton onClick={toggleDrawer(false)} color="primary">
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Contact info in mobile menu */}
                <Box sx={{ mb: 2, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Контакты:
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <PhoneIcon fontSize="small" />
                    <Link href="tel:+37253464508" sx={{ color: 'text.primary' }}>
                      +372 53464508
                    </Link>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <EmailIcon fontSize="small" />
                    <Link href="mailto:viktorijaautokool@hot.ee" sx={{ color: 'text.primary' }}>
                      viktorijaautokool@hot.ee
                    </Link>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FacebookIcon fontSize="small" />
                    <Link href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer" sx={{ color: 'text.primary' }}>
                      Facebook
                    </Link>
                  </Stack>
                </Box>

                <MenuItem 
                  component={RouterLink} 
                  to="/" 
                  onClick={toggleDrawer(false)} 
                  sx={{ 
                    textDecoration: 'none',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': { 
                      textDecoration: 'none',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {t('navigation.home')}
                </MenuItem>
                <MenuItem 
                  component={RouterLink} 
                  to="/features" 
                  onClick={toggleDrawer(false)} 
                  sx={{ 
                    textDecoration: 'none',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': { 
                      textDecoration: 'none',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {t('navigation.services')}
                </MenuItem>
                <MenuItem 
                  component={RouterLink} 
                  to="/about" 
                  onClick={toggleDrawer(false)} 
                  sx={{ 
                    textDecoration: 'none',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': { 
                      textDecoration: 'none',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {t('navigation.about')}
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  href="#testimonials" 
                  onClick={toggleDrawer(false)}
                  sx={{ 
                    textDecoration: 'none',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': { 
                      textDecoration: 'none',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {t('navigation.reviews')}
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  href="#highlights" 
                  onClick={toggleDrawer(false)}
                  sx={{ 
                    textDecoration: 'none',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': { 
                      textDecoration: 'none',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {t('navigation.advantages')}
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  href="#pricing" 
                  onClick={toggleDrawer(false)}
                  sx={{ 
                    textDecoration: 'none',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': { 
                      textDecoration: 'none',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {t('navigation.prices')}
                </MenuItem>
                <MenuItem 
                  component={Link} 
                  href="#faq" 
                  onClick={toggleDrawer(false)}
                  sx={{ 
                    textDecoration: 'none',
                    py: 1.5,
                    borderRadius: 1,
                    '&:hover': { 
                      textDecoration: 'none',
                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {t('navigation.questions')}
                </MenuItem>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button 
                    color="primary" 
                    variant="outlined" 
                    fullWidth
                    size="medium"
                    component={RouterLink}
                    to="/checkout?category=category-c"
                  >
                    {t('navigation.signin')}
                  </Button>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth
                    size="medium"
                    component={RouterLink}
                    to="/checkout?category=category-b"
                  >
                    {t('navigation.signup')}
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
