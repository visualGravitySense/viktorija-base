import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  padding: '12px 24px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
}));

const InstructorCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: theme.palette.background.paper,
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  border: '1px solid',
  borderColor: theme.palette.divider,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

interface Instructor {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  car?: string;
}

interface InstructorsProps {
  title?: string;
  subtitle?: string;
}

export default function Instructors({ 
  title = "Наши преподаватели",
  subtitle = "Опытные инструкторы помогут вам освоить вождение"
}: InstructorsProps) {
  const { t } = useTranslation();
  
  const instructors: Instructor[] = [
    {
      id: "igor",
      name: "Игорь Нагорский",
      description: "Основатель и руководитель автошколы \"Viktorija\", опытный инструктор по вождению. Автомобиль: Toyota Corolla",
      imageUrl: "/igor-ready.png",
      car: "Toyota Corolla"
    },
    {
      id: "maksim",
      name: "Максим Федоренко",
      description: "Инструктор по вождению, терпеливый и заботливый учитель. Автомобиль: Volkswagen Golf",
      imageUrl: "/maksim-ready.png",
      car: "Volkswagen Golf"
    },
    {
      id: "stanislav",
      name: "Станислав Зигадло",
      description: "Инструктор по вождению, педагогический стаж 18 лет. Автомобиль: Skoda Octavia",
      imageUrl: "/stas-ready.png",
      car: "Skoda Octavia"
    },
    {
      id: "ivan",
      name: "Иван Скоробогатов",
      description: "Опытный инструктор, работал экзаменатором АРК более 2,5 лет. Автомобиль: Toyota Yaris",
      imageUrl: "/ivan-ready.png",
      car: "Toyota Yaris"
    },
    {
      id: "andrei",
      name: "Андрей Наан",
      description: "Высококвалифицированный инструктор по вождению категорий B и A. Автомобиль: Volkswagen Polo",
      imageUrl: "/andrei-ready.png",
      car: "Volkswagen Polo"
    }
  ];
  
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 1, fontWeight: 700 }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          {subtitle}
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 5 }} justifyContent="center">
          {instructors.map((instructor) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={instructor.id} sx={{ maxWidth: { md: '33.333%' } }}>
              <InstructorCard>
                <Box 
                  component="img" 
                  src={instructor.imageUrl}
                  alt={instructor.name}
                  sx={{ 
                    width: '100%', 
                    borderRadius: '8px',
                    objectFit: 'cover',
                    aspectRatio: '1/1',
                    mb: 2
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {instructor.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ mb: 3 }}
                  >
                    {instructor.description}
                  </Typography>
                </Box>
                <StyledButton 
                  variant="contained" 
                  fullWidth
                  component={RouterLink}
                  to={`/checkout?category=category-b&instructor=${instructor.id}`}
                >
                  Записаться на урок
                </StyledButton>
              </InstructorCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 