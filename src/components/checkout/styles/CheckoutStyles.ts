import { styled } from '@mui/material/styles';
import { Paper, Button, Box } from '@mui/material';

// Styled components for better performance and reusability
export const StyledMobileHeader = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  borderRadius: 0,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
}));

export const StyledNavigationButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  fontWeight: 600,
  fontSize: '1.1rem',
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
  },
  '&:disabled': {
    background: theme.palette.grey[300],
    boxShadow: 'none',
    transform: 'none',
  },
}));

export const StyledFormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2, 3),
  '& .MuiPaper-root': {
    padding: theme.spacing(2, 3),
    borderRadius: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)',
    },
  },
  [theme.breakpoints.up('sm')]: {
    '& .MuiPaper-root': {
      padding: theme.spacing(3),
    },
  },
}));

export const StyledMobileNavigation = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  padding: theme.spacing(2),
  borderRadius: '20px 20px 0 0',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
}));

// Animation keyframes
export const slideInUp = {
  '@keyframes slideInUp': {
    from: {
      transform: 'translateY(100%)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
};

export const fadeInScale = {
  '@keyframes fadeInScale': {
    from: {
      transform: 'scale(0.9)',
      opacity: 0,
    },
    to: {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
};

// Theme overrides for checkout
export const checkoutThemeOverrides = {
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 12,
          transition: 'all 0.2s ease-in-out',
          '&:hover fieldset': {
            borderColor: '#2196F3',
          },
          '&.Mui-focused fieldset': {
            borderWidth: 2,
          },
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 12,
        fontWeight: 600,
        transition: 'all 0.2s ease-in-out',
      },
      contained: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-1px)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },
}; 