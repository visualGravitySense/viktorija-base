import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  measurementId: string;
  enabled?: boolean;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics({ measurementId, enabled = true }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (!enabled || !measurementId) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };

    // Configure GA4
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      // Privacy settings
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    // Track page views on route changes
    const handleRouteChange = () => {
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [measurementId, enabled]);

  if (!enabled || !measurementId) return null;

  return (
    <Helmet>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
    </Helmet>
  );
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

export const trackConversion = (conversionId: string, value?: number, currency = 'EUR') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency,
    });
  }
}; 