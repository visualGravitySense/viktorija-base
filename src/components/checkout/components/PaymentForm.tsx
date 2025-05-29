import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import SecurityIcon from '@mui/icons-material/Security';
import { useTranslation } from 'react-i18next';
import { StripePaymentProvider, CardForm, usePaymentProcessor } from '../services/StripePaymentService';
import { useCheckoutContext } from '../Checkout.tsx';

interface CardProps {
  selected?: boolean;
}

const Card = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<CardProps>(({ theme, selected }) => ({
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  width: '100%',
  '&:hover': {
    background:
      'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
    borderColor: 'primary.light',
    boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
    ...theme.applyStyles('dark', {
      background:
        'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
      borderColor: 'primary.dark',
      boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
    }),
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  ...(selected && {
    borderColor: (theme.vars || theme).palette.primary.light,
    ...theme.applyStyles('dark', {
      borderColor: (theme.vars || theme).palette.primary.dark,
    }),
  }),
}));

const PaymentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: '1px solid ',
  borderColor: (theme.vars || theme).palette.divider,
  background:
    'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
  boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
  [theme.breakpoints.up('xs')]: {
    height: 300,
  },
  [theme.breakpoints.up('sm')]: {
    height: 350,
  },
  ...theme.applyStyles('dark', {
    background:
      'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
    boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
  }),
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type PaymentType = 'creditCard' | 'bankTransfer' | 'stripeCard';

export default function PaymentForm() {
  const { t } = useTranslation();
  
  const [paymentType, setPaymentType] = React.useState<PaymentType>('stripeCard');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [savePaymentMethod, setSavePaymentMethod] = React.useState(false);
  
  const { 
    processPayment, 
    resetPayment 
  } = usePaymentProcessor();
  
  // Get the checkout context to share payment state
  const { setPaymentData, setPaymentSuccess } = useCheckoutContext();

  const handlePaymentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value as PaymentType);
    // Reset payment state when changing payment type
    resetPayment();
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  const handlePaymentSuccess = (paymentMethod: any) => {
    // For demo purposes, assume a fixed amount of €100
    // In a real application, this would come from the shopping cart/order total
    processPayment(10000, 'eur', paymentMethod)
      .then((response) => {
        // Update the checkout context when payment is successful
        setPaymentData(response);
        setPaymentSuccess(true);
      })
      .catch((error) => {
        console.error('Payment error:', error);
      });
  };

  return (
    <Box>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: 'text.primary',
          fontSize: { xs: '1.25rem', md: '1.5rem' }
        }}
      >
        {t('checkout.payment.title', 'Способ оплаты')}
      </Typography>

      {/* Security Badge */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: 'success.light',
          color: 'success.contrastText',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <SecurityIcon fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {t('checkout.payment.secure_payment', 'Безопасная оплата с SSL шифрованием')}
        </Typography>
      </Paper>

      <Stack spacing={3}>
        {/* Payment Method Selection */}
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="Payment options"
            name="paymentType"
            value={paymentType}
            onChange={handlePaymentTypeChange}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Card 
              selected={paymentType === 'stripeCard'}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardActionArea
                onClick={() => setPaymentType('stripeCard')}
                sx={{
                  p: 2,
                  '.MuiCardActionArea-focusHighlight': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CreditCardRoundedIcon
                    sx={{
                      color: paymentType === 'stripeCard' ? 'primary.main' : 'grey.400',
                      fontSize: '2rem',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {t('checkout.payment.secure_card', 'Банковская карта')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('checkout.payment.card_description', 'Visa, Mastercard, American Express')}
                    </Typography>
                  </Box>
                  {paymentType === 'stripeCard' && (
                    <Chip 
                      label={t('checkout.payment.recommended', 'Рекомендуется')} 
                      color="primary" 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </Stack>
              </CardActionArea>
            </Card>
            <Card 
              selected={paymentType === 'creditCard'}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardActionArea
                onClick={() => setPaymentType('creditCard')}
                sx={{
                  p: 2,
                  '.MuiCardActionArea-focusHighlight': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CreditCardRoundedIcon
                    sx={{
                      color: paymentType === 'creditCard' ? 'primary.main' : 'grey.400',
                      fontSize: '2rem',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {t('checkout.payment.card', 'Кредитная карта')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('checkout.payment.manual_entry', 'Ручной ввод данных карты')}
                    </Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
            <Card 
              selected={paymentType === 'bankTransfer'}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardActionArea
                onClick={() => setPaymentType('bankTransfer')}
                sx={{
                  p: 2,
                  '.MuiCardActionArea-focusHighlight': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <AccountBalanceRoundedIcon
                    sx={{
                      color: paymentType === 'bankTransfer' ? 'primary.main' : 'grey.400',
                      fontSize: '2rem',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {t('checkout.payment.bank_account', 'Банковский перевод')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('checkout.payment.bank_description', 'Перевод на банковский счет')}
                    </Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
        </RadioGroup>
      </FormControl>
      
      {paymentType === 'stripeCard' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <PaymentContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">{t('checkout.payment.secure_card_payment')}</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            
            {paymentStatus === 'success' ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                gap: 2
              }}>
                <CheckCircleOutlineRoundedIcon sx={{ fontSize: 64, color: 'success.main' }} />
                <Typography variant="h6" color="success.main">
                  {t('checkout.payment.payment_successful')}
                </Typography>
                <Typography variant="body2" align="center">
                  {t('checkout.payment.receipt_email')}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <StripePaymentProvider>
                  <CardForm onSuccess={handlePaymentSuccess} />
                </StripePaymentProvider>
              </Box>
            )}
          </PaymentContainer>
          
          {paymentStatus !== 'success' && (
            <FormControlLabel
              control={
                <Checkbox 
                  name="saveCard" 
                  value="yes" 
                  checked={savePaymentMethod}
                  onChange={(e) => setSavePaymentMethod(e.target.checked)}
                />
              }
              label={t('checkout.payment.remember_card')}
            />
          )}
          
          <Alert
            severity="info"
            icon={<WarningRoundedIcon fontSize="small" />}
            sx={{ mb: 2 }}
          >
            {t('checkout.payment.secure_payment_message')}
          </Alert>
        </Box>
      )}
      
      {paymentType === 'creditCard' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <PaymentContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">{t('checkout.payment.credit_card')}</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: 'rotate(90deg)',
                color: 'text.secondary',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  {t('checkout.payment.card_number')}
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  size="small"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  {t('checkout.payment.cvv')}
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  size="small"
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </FormGrid>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="expiration-date" required>
                  {t('checkout.payment.expiry_date')}
                </FormLabel>
                <OutlinedInput
                  id="expiration-date"
                  autoComplete="expiration-date"
                  placeholder="MM/YY"
                  required
                  size="small"
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="cardholder-name" required>
                  {t('checkout.payment.name_on_card')}
                </FormLabel>
                <OutlinedInput
                  id="cardholder-name"
                  autoComplete="cc-name"
                  placeholder={t('checkout.payment.name_placeholder')}
                  required
                  size="small"
                />
              </FormGrid>
            </Box>
          </PaymentContainer>
          <FormControlLabel
            control={<Checkbox name="saveCard" value="yes" />}
            label={t('checkout.payment.remember_card')}
          />
          <Alert
            severity="info"
            icon={<WarningRoundedIcon fontSize="small" />}
            sx={{ mb: 2 }}
          >
            {t('checkout.payment.test_mode_message')}
          </Alert>
        </Box>
      )}
      
      {paymentType === 'bankTransfer' && (
        <Stack spacing={2} useFlexGap>
          <Alert
            severity="info"
            icon={<WarningRoundedIcon fontSize="small" />}
            sx={{ mb: 2 }}
          >
            {t('checkout.payment.bank_info_message')}
          </Alert>
          <FormGrid>
            <FormLabel htmlFor="account-name" required>
              {t('checkout.payment.account_name')}
            </FormLabel>
            <OutlinedInput
              id="account-name"
              placeholder={t('checkout.payment.account_name_placeholder')}
              required
              size="small"
            />
          </FormGrid>
          <FormGrid>
            <FormLabel htmlFor="account-number" required>
              {t('checkout.payment.account_number')}
            </FormLabel>
            <OutlinedInput
              id="account-number"
              placeholder={t('checkout.payment.account_number_placeholder')}
              required
              size="small"
            />
          </FormGrid>
          <FormGrid>
            <FormLabel htmlFor="routing-number" required>
              {t('checkout.payment.routing_number')}
            </FormLabel>
            <OutlinedInput
              id="routing-number"
              placeholder={t('checkout.payment.routing_number_placeholder')}
              required
              size="small"
            />
          </FormGrid>
          <FormControlLabel
            control={<Checkbox name="saveAccount" value="yes" />}
            label={t('checkout.payment.save_account_info')}
          />
        </Stack>
      )}
      </Stack>
    </Box>
  );
}
