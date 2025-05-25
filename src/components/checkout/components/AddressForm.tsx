import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';

export default function AddressForm() {
  const { t } = useTranslation();
  
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
        {t('checkout.address.title', 'Контактная информация')}
      </Typography>
      
      <Stack spacing={3}>
        {/* Name Fields */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            id="first-name"
            name="first-name"
            label={t('checkout.address.first_name', 'Имя')}
            placeholder={t('checkout.address.first_name_placeholder', 'Введите ваше имя')}
            autoComplete="given-name"
            required
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            id="last-name"
            name="last-name"
            label={t('checkout.address.last_name', 'Фамилия')}
            placeholder={t('checkout.address.last_name_placeholder', 'Введите вашу фамилию')}
            autoComplete="family-name"
            required
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Stack>

        {/* Contact Fields */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            id="email"
            name="email"
            type="email"
            label={t('checkout.address.email', 'Email')}
            placeholder={t('checkout.address.email_placeholder', 'example@email.com')}
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            id="phone"
            name="phone"
            type="tel"
            label={t('checkout.address.phone', 'Телефон')}
            placeholder={t('checkout.address.phone_placeholder', '+372 XXXX XXXX')}
            autoComplete="tel"
            required
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Stack>

        {/* Address */}
        <TextField
          id="address1"
          name="address1"
          label={t('checkout.address.address_line1', 'Адрес')}
          placeholder={t('checkout.address.address_line1_placeholder', 'Улица, дом, квартира')}
          autoComplete="street-address"
          required
          fullWidth
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />

        {/* City and Postal Code */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            id="city"
            name="city"
            label={t('checkout.address.city', 'Город')}
            placeholder={t('checkout.address.city_placeholder', 'Таллин')}
            autoComplete="address-level2"
            required
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <TextField
            id="zip"
            name="zip"
            label={t('checkout.address.zip', 'Почтовый индекс')}
            placeholder={t('checkout.address.zip_placeholder', '10001')}
            autoComplete="postal-code"
            required
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Stack>

        {/* Country */}
        <TextField
          id="country"
          name="country"
          label={t('checkout.address.country', 'Страна')}
          placeholder={t('checkout.address.country_placeholder', 'Эстония')}
          autoComplete="country-name"
          required
          fullWidth
          variant="outlined"
          defaultValue="Эстония"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />

        {/* Additional Options */}
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Checkbox 
                name="saveAddress" 
                value="yes"
                sx={{
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('checkout.address.save_info', 'Сохранить информацию для будущих заказов')}
              </Typography>
            }
          />
        </Box>
      </Stack>
    </Box>
  );
}
