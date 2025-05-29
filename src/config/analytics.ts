// Analytics configuration
export const analyticsConfig = {
  // Google Analytics 4 Measurement ID
  // Получите ID в Google Analytics: https://analytics.google.com/
  // Формат: G-XXXXXXXXXX
  googleAnalyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  
  // Inspectlet Site ID
  // Получите ID в Inspectlet: https://www.inspectlet.com/
  // Формат: числовой ID
  inspectletId: import.meta.env.VITE_INSPECTLET_ID || '1009173257',
  
  // Enable/disable analytics in development
  enableInDevelopment: import.meta.env.PROD || import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  
  // Cookie consent (можно интегрировать с cookie banner)
  requireCookieConsent: true,
};

// Conversion tracking IDs for Google Ads
export const conversionIds = {
  // Заявка на обучение
  leadSubmission: 'AW-XXXXXXXXX/XXXXXXXXX',
  // Запись на курс
  courseEnrollment: 'AW-XXXXXXXXX/XXXXXXXXX',
  // Подписка на рассылку
  newsletterSignup: 'AW-XXXXXXXXX/XXXXXXXXX',
  // Звонок
  phoneCall: 'AW-XXXXXXXXX/XXXXXXXXX',
};

// Event names for consistent tracking
export const eventNames = {
  // Page events
  pageView: 'page_view',
  
  // User engagement
  scrollDepth: 'scroll',
  timeOnPage: 'timing_complete',
  
  // Lead generation
  formSubmit: 'form_submit',
  phoneClick: 'phone_click',
  emailClick: 'email_click',
  whatsappClick: 'whatsapp_click',
  telegramClick: 'telegram_click',
  
  // Course related
  courseView: 'course_view',
  priceCheck: 'price_check',
  enrollmentStart: 'begin_checkout',
  enrollmentComplete: 'purchase',
  
  // Newsletter
  newsletterSubscribe: 'newsletter_subscribe',
  
  // Social media
  socialClick: 'social_click',
  
  // Downloads
  fileDownload: 'file_download',
}; 