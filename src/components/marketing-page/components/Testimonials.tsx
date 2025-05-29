import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import StarIcon from '@mui/icons-material/Star';

const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const { t } = useTranslation();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  const testimonials = [
    {
      name: t('testimonials.testimonial1.author'),
      occupation: t('testimonials.testimonial1.role'),
      testimonial: t('testimonials.testimonial1.text'),
      initials: 'EK',
      rating: 5,
      source: 'facebook',
      date: '2024-01-15',
      sourceUrl: 'https://www.facebook.com/viktorija.autokool'
    },
    {
      name: t('testimonials.testimonial2.author'),
      occupation: t('testimonials.testimonial2.role'),
      testimonial: t('testimonials.testimonial2.text'),
      initials: 'MV',
      rating: 5,
      source: 'google',
      date: '2024-01-10',
      sourceUrl: 'https://www.google.com/maps/place/Viktorija+Autokool'
    },
    {
      name: t('testimonials.testimonial3.author'),
      occupation: t('testimonials.testimonial3.role'),
      testimonial: t('testimonials.testimonial3.text'),
      initials: 'AS',
      rating: 5,
      source: 'facebook',
      date: '2024-01-08',
      sourceUrl: 'https://www.facebook.com/viktorija.autokool'
    }
  ];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'facebook':
        return <FacebookIcon sx={{ fontSize: 20, color: '#1877F2' }} />;
      case 'google':
        return <GoogleIcon sx={{ fontSize: 20, color: '#4285F4' }} />;
      default:
        return <StarIcon sx={{ fontSize: 20, color: '#FFD700' }} />;
    }
  };

  const getSourceName = (source: string) => {
    switch (source) {
      case 'facebook':
        return 'Facebook';
      case 'google':
        return 'Google';
      default:
        return 'Отзыв';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          {t('testimonials.title')}
        </Typography>
        
        {/* Social Reviews Stats */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 4,
          mt: 3,
          mb: 2,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FacebookIcon sx={{ color: '#1877F2', fontSize: 24 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                4.9
              </Typography>
              <Rating value={4.9} readOnly size="small" precision={0.1} />
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Facebook (25+ отзывов)
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GoogleIcon sx={{ color: '#4285F4', fontSize: 24 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
                4.8
              </Typography>
              <Rating value={4.8} readOnly size="small" precision={0.1} />
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Google (15+ отзывов)
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
          Реальные отзывы наших учеников из социальных сетей
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {testimonials.map((testimonial, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                textAlign: 'left',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              {/* Header with source and rating */}
              <Box sx={{ p: 2, pb: 0 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 1
                }}>
                  <Link
                    href={testimonial.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      textDecoration: 'none',
                      '&:hover': { opacity: 0.8 }
                    }}
                  >
                    {getSourceIcon(testimonial.source)}
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {getSourceName(testimonial.source)}
                    </Typography>
                  </Link>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{ color: '#FFD700' }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {formatDate(testimonial.date)}
                </Typography>
              </Box>

              <CardContent sx={{ textAlign: 'left', pt: 1 }}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ 
                    color: 'text.secondary', 
                    textAlign: 'left',
                    fontStyle: 'italic',
                    lineHeight: 1.6
                  }}
                >
                  "{testimonial.testimonial}"
                </Typography>
              </CardContent>
              
              <Box sx={{ p: 2, pt: 0 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ 
                      bgcolor: 'primary.main',
                      width: 40,
                      height: 40,
                      fontSize: '0.9rem'
                    }}>
                      {testimonial.initials}
                    </Avatar>
                  }
                  title={
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {testimonial.occupation}
                    </Typography>
                  }
                  sx={{ p: 0 }}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
