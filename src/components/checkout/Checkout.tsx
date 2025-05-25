import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AddressForm from './components/AddressForm.tsx';
import PaymentForm from './components/PaymentForm.tsx';
import Review from './components/Review.tsx';
import MobileProgress from './components/MobileProgress.tsx';
import OrderSummaryCard from './components/OrderSummaryCard.tsx';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { StripePaymentProvider } from './services/StripePaymentService.tsx';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

// Create a context to share payment state across components
const CheckoutContext = React.createContext<{
  paymentData: Record<string, unknown> | null;
  setPaymentData: (data: Record<string, unknown> | null) => void;
  paymentSuccess: boolean;
  setPaymentSuccess: (success: boolean) => void;
}>({
  paymentData: null,
  setPaymentData: () => {},
  paymentSuccess: false,
  setPaymentSuccess: () => {},
});

export const useCheckoutContext = () => React.useContext(CheckoutContext);

export default function Checkout(props: { disableCustomTheme?: boolean }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  const steps = [t('checkout.steps.shipping'), t('checkout.steps.payment'), t('checkout.steps.review')];
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [transmissionType, setTransmissionType] = React.useState('manual'); // Default to manual
  const [paymentData, setPaymentData] = React.useState<Record<string, unknown> | null>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  
  const handleNext = React.useCallback(() => {
    setActiveStep(activeStep + 1);
  }, [activeStep]);
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };
  
  // Get category from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || 'default';
  const instructor = searchParams.get('instructor'); // Get selected instructor if any
  
  // Determine price based on category and transmission type
  const getPriceByCategory = () => {
    switch(category) {
      case 'category-a':
        return '570€';
      case 'category-b':
        return transmissionType === 'manual' ? '700€' : '840€';
      case 'category-c':
        return '150€';
      default:
        return '570€'; // Default to category A if not specified
    }
  };
  
  const totalPrice = getPriceByCategory();
  
  // Handle transmission type change
  const handleTransmissionChange = (type: string) => {
    setTransmissionType(type);
  };
  
  // Add function to proceed to next step when payment is successful
  React.useEffect(() => {
    if (activeStep === 1 && paymentSuccess) {
      // After payment is successful, automatically advance to review step after a short delay
      const timer = setTimeout(() => {
        handleNext();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, activeStep, handleNext]);
  
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review 
          paymentSuccess={paymentSuccess} 
          paymentData={paymentData} 
          orderTotal={totalPrice}
        />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  const contextValue = {
    paymentData,
    setPaymentData,
    paymentSuccess,
    setPaymentSuccess
  };
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      
      {/* Mobile Header */}
      {isMobile && (
        <Paper
          elevation={3}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            borderRadius: 0,
            py: 2,
            px: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.95)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <IconButton
            onClick={handleClose}
            aria-label={t('common.close') || 'Close'}
            sx={{
              bgcolor: 'action.hover',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'action.selected',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            {t('checkout.title', 'Запись на курс')}
          </Typography>
          
          <ColorModeIconDropdown />
        </Paper>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <>
          <Box sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1100 }}>
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1100 }}>
            <IconButton
              onClick={handleClose}
              aria-label={t('common.close') || 'Close'}
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </>
      )}

      <CheckoutContext.Provider value={contextValue}>
        <StripePaymentProvider>
          {isMobile ? (
            // Mobile Layout
            <Container maxWidth={isTablet ? "md" : "sm"} sx={{ py: 0, px: 0 }}>
              <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                {/* Mobile Progress */}
                <MobileProgress activeStep={activeStep} steps={steps} />

                {/* Mobile Order Summary */}
                <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={300}>
                  <Box>
                    <OrderSummaryCard
                      totalPrice={totalPrice}
                      category={category}
                      transmissionType={transmissionType}
                      instructor={instructor}
                      onTransmissionChange={handleTransmissionChange}
                    />
                  </Box>
                </Slide>

                {/* Mobile Form Content */}
                <Box sx={{ px: 2, py: 3 }}>
                  <Fade in={true} timeout={600} key={activeStep}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: { xs: 2, sm: 3 },
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {getStepContent(activeStep)}
                    </Paper>
                  </Fade>
                </Box>

                {/* Mobile Navigation */}
                <Paper
                  elevation={8}
                  sx={{
                    position: 'sticky',
                    bottom: 0,
                    p: 2,
                    borderRadius: '20px 20px 0 0',
                    bgcolor: 'background.paper',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Stack direction="row" spacing={2} justifyContent="space-between">
                    {activeStep !== 0 && (
                      <Fade in={activeStep !== 0}>
                        <Button
                          startIcon={<ChevronLeftRoundedIcon />}
                          onClick={handleBack}
                          variant="outlined"
                          size="large"
                          sx={{ 
                            flex: 1,
                            borderRadius: 3,
                            py: 1.5,
                            fontWeight: 600,
                            borderWidth: 2,
                            '&:hover': {
                              borderWidth: 2,
                              transform: 'translateY(-1px)',
                              boxShadow: 2,
                            },
                            transition: 'all 0.2s ease-in-out',
                          }}
                        >
                          {t('checkout.back', 'Назад')}
                        </Button>
                      </Fade>
                    )}
                    
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={() => {
                          window.location.href = '/';
                        }}
                        size="large"
                        sx={{ 
                          flex: activeStep === 0 ? 1 : 2,
                          borderRadius: 3,
                          py: 1.5,
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                          },
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        {t('checkout.place_order', 'Оформить заказ')}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={handleNext}
                        disabled={activeStep === 1 && !paymentSuccess}
                        size="large"
                        sx={{ 
                          flex: activeStep === 0 ? 1 : 2,
                          borderRadius: 3,
                          py: 1.5,
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                          },
                          '&:disabled': {
                            background: 'grey.300',
                            boxShadow: 'none',
                            transform: 'none',
                          },
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        {activeStep === steps.length - 2
                          ? t('checkout.proceed_to_review', 'К проверке')
                          : t('checkout.next', 'Далее')}
                      </Button>
                    )}
                  </Stack>
                </Paper>
              </Box>
            </Container>
          ) : (
            // Desktop Layout (Improved)
            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
              <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
                {/* Desktop Header with Title */}
                <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
                  <Typography 
                    variant={{ xs: 'h5', md: 'h4' }}
                    sx={{ 
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                    }}
                  >
                    {t('checkout.title', 'Запись на курс')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {t('checkout.subtitle', 'Заполните форму для записи на обучение')}
                  </Typography>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3, lg: 4 }}>
                  {/* Left Column - Progress & Order Summary */}
                  <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                    <Stack spacing={{ xs: 2, md: 3 }}>
                      {/* Desktop Progress */}
                      <Fade in={true} timeout={600}>
                        <Paper
                          elevation={2}
                          sx={{
                            borderRadius: 4,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                              transform: 'translateY(-1px)',
                            },
                          }}
                        >
                          <MobileProgress activeStep={activeStep} steps={steps} />
                        </Paper>
                      </Fade>

                      {/* Desktop Order Summary */}
                      <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={400}>
                        <Box>
                          <OrderSummaryCard
                            totalPrice={totalPrice}
                            category={category}
                            transmissionType={transmissionType}
                            instructor={instructor}
                            onTransmissionChange={handleTransmissionChange}
                          />
                        </Box>
                      </Slide>
                    </Stack>
                  </Grid>

                  {/* Right Column - Form Content */}
                  <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                    <Stack spacing={{ xs: 2, md: 3 }}>
                      {/* Form Content */}
                      <Fade in={true} timeout={600} key={activeStep}>
                        <Paper
                          elevation={2}
                          sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          {getStepContent(activeStep)}
                        </Paper>
                      </Fade>

                      {/* Desktop Navigation */}
                      <Paper
                        elevation={3}
                        sx={{
                          p: { xs: 2, md: 3 },
                          borderRadius: 4,
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        }}
                      >
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3 }} justifyContent="space-between" alignItems="center">
                          {activeStep !== 0 ? (
                            <Fade in={activeStep !== 0}>
                                                              <Button
                                  startIcon={<ChevronLeftRoundedIcon />}
                                  onClick={handleBack}
                                  variant="outlined"
                                  size="large"
                                  fullWidth={{ xs: true, sm: false }}
                                  sx={{ 
                                    borderRadius: 3,
                                    py: 1.5,
                                    px: { xs: 3, sm: 4 },
                                    fontWeight: 600,
                                    borderWidth: 2,
                                    minWidth: { sm: '140px' },
                                    '&:hover': {
                                      borderWidth: 2,
                                      transform: 'translateY(-1px)',
                                      boxShadow: 2,
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                  }}
                                >
                                {t('checkout.back', 'Назад')}
                              </Button>
                            </Fade>
                          ) : (
                            <Box /> // Empty box to maintain spacing
                          )}
                          
                          {activeStep === steps.length - 1 ? (
                            <Button
                              variant="contained"
                              endIcon={<ChevronRightRoundedIcon />}
                              onClick={() => {
                                window.location.href = '/';
                              }}
                              size="large"
                              fullWidth={{ xs: true, sm: false }}
                              sx={{ 
                                borderRadius: 3,
                                py: 1.5,
                                px: { xs: 3, sm: 4 },
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                minWidth: { sm: '180px' },
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                                },
                                transition: 'all 0.3s ease-in-out',
                              }}
                            >
                              {t('checkout.place_order', 'Оформить заказ')}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              endIcon={<ChevronRightRoundedIcon />}
                              onClick={handleNext}
                              disabled={activeStep === 1 && !paymentSuccess}
                              size="large"
                              fullWidth={{ xs: true, sm: false }}
                              sx={{ 
                                borderRadius: 3,
                                py: 1.5,
                                px: { xs: 3, sm: 4 },
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                minWidth: { sm: '180px' },
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                                },
                                '&:disabled': {
                                  background: 'grey.300',
                                  boxShadow: 'none',
                                  transform: 'none',
                                },
                                transition: 'all 0.3s ease-in-out',
                              }}
                            >
                              {activeStep === steps.length - 2
                                ? t('checkout.proceed_to_review', 'К проверке')
                                : t('checkout.next', 'Далее')}
                            </Button>
                          )}
                        </Stack>
                      </Paper>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          )}
        </StripePaymentProvider>
      </CheckoutContext.Provider>
    </AppTheme>
  );
}
