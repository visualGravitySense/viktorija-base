import React from 'react';
import { useTranslation } from 'react-i18next';
import { subscribeToNewsletter } from '../firebase/newsletterService';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export const useNewsletterSubscription = (source: string = 'unknown') => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [snackbar, setSnackbar] = React.useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError(t('errors.invalidEmail'));
    } else {
      setEmailError('');
    }
  };

  const handleSubscribe = async () => {
    if (!email) {
      setEmailError(t('errors.required'));
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(t('errors.invalidEmail'));
      return;
    }

    setIsLoading(true);
    setEmailError('');

    try {
      const result = await subscribeToNewsletter(email, source, 'ru');
      
      if (result.success) {
        setSnackbar({
          open: true,
          message: result.message,
          severity: 'success'
        });
        setEmail(''); // Очищаем поле после успешной подписки
      } else {
        setSnackbar({
          open: true,
          message: result.message,
          severity: 'error'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Произошла ошибка при подписке. Попробуйте еще раз.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const resetForm = () => {
    setEmail('');
    setEmailError('');
    setIsLoading(false);
  };

  return {
    email,
    emailError,
    isLoading,
    snackbar,
    handleEmailChange,
    handleSubscribe,
    handleCloseSnackbar,
    resetForm,
    validateEmail
  };
}; 