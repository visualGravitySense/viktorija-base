import React from 'react';
import GoogleAnalytics from './GoogleAnalytics';
import Inspectlet from './Inspectlet';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  inspectletId?: string;
  enabled?: boolean;
  cookieConsent?: boolean;
}

export default function Analytics({ 
  googleAnalyticsId, 
  inspectletId, 
  enabled = true,
  cookieConsent = true 
}: AnalyticsProps) {
  // Only load analytics if enabled and user has given consent
  const shouldLoad = enabled && cookieConsent;

  return (
    <>
      {googleAnalyticsId && (
        <GoogleAnalytics 
          measurementId={googleAnalyticsId} 
          enabled={shouldLoad} 
        />
      )}
      {inspectletId && (
        <Inspectlet 
          siteId={inspectletId} 
          enabled={shouldLoad} 
        />
      )}
    </>
  );
}

// Export utility functions
export { trackEvent, trackPageView, trackConversion } from './GoogleAnalytics';
export { inspectletTrack, inspectletIdentify, inspectletTagSession } from './Inspectlet'; 