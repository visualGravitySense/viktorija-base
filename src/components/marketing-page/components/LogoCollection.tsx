import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { GradientText } from '../styles/antiDesign';
import { useTranslation } from 'react-i18next';

// Import images as modules to ensure correct paths
import creditinfoLight from '/creditinfo_ready_light.png';
import maanteeametLight from '/maanteeamet-ready-light.png';
import teoriaLight from '/teoria-ready-light.png';
import creditinfoDark from '/creditinfo_ready.png';
import maanteeametDark from '/maanteeamet-ready.png';
import teoriaDark from '/teoria-ready.png';

// Logos for light theme (light versions, light visuals on light background)
const logosForLightTheme = [
  creditinfoLight,
  maanteeametLight,
  teoriaLight,
];

// Logos for dark theme (regular versions, dark visuals on dark background)
const logosForDarkTheme = [
  creditinfoDark,
  maanteeametDark,
  teoriaDark,
];

export default function LogoCollection() {
  const theme = useTheme();
  const { t } = useTranslation();
  
  // Use the appropriate logo set based on the current theme
  const logos = theme.palette.mode === 'light' 
    ? logosForLightTheme  // Use dark visuals on light background
    : logosForDarkTheme;  // Use light visuals on dark background

  // Image error handling function
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`Failed to load image: ${e.currentTarget.src}`);
    // Optionally fall back to a different image
    // e.currentTarget.src = '/fallback-image.png';
  };

  return (
    <Box id="logoCollection" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <GradientText 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
          mb: { xs: 1, sm: 2 }
        }}
      >
        {t('logo_collection.title')}
      </GradientText>
      <Box sx={{ maxWidth: { xs: '100%', sm: 600, md: 800 }, mx: 'auto', px: { xs: 2, sm: 0 } }}>
        <Typography
          component="p"
          variant="subtitle2"
          align="center"
          sx={{ 
            color: 'text.secondary',
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            mb: { xs: 1, sm: 2 }
          }}
        >
          {t('logo_collection.description')}
        </Typography>
      </Box>
      <Grid 
        container 
        sx={{ 
          justifyContent: 'center', 
          mt: { xs: 0, sm: 0.5 }, 
          opacity: 0.6,
          gap: { xs: 0, sm: 1 }
        }}
      >
        {logos.map((logo, index) => (
          <Grid 
            key={index}
            item
            xs={4}
            sm={4}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={logo}
              alt={`Partner logo ${index + 1}`}
              loading="lazy"
              width="200"
              height="150"
              onError={handleImageError}
              sx={{
                width: '100%',
                maxWidth: { xs: '100px', sm: '140px', md: '180px' },
                height: 'auto',
                maxHeight: { xs: '60px', sm: '100px', md: '140px' },
                objectFit: 'contain',
                opacity: 0.7,
                p: { xs: 0.5, sm: 1 }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
