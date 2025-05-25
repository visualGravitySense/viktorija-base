import { StrictMode, useState, useMemo, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { getDesignTokens } from './theme'
import { registerServiceWorker } from './utils/serviceWorker'
import Analytics from './components/analytics/Analytics'
import { analyticsConfig } from './config/analytics'
import './index.css'
import App from './App.tsx'
import './i18n/i18n'

const ThemeApp = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Register Service Worker for caching
  useEffect(() => {
    registerServiceWorker();
  }, []);
  
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Analytics 
          googleAnalyticsId={analyticsConfig.googleAnalyticsId}
          inspectletId={analyticsConfig.inspectletId}
          enabled={analyticsConfig.enableInDevelopment}
          cookieConsent={!analyticsConfig.requireCookieConsent}
        />
        <App toggleColorMode={toggleColorMode} />
      </ThemeProvider>
    </HelmetProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeApp />
  </StrictMode>,
)
