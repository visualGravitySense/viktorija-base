import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface InspectletProps {
  siteId: string;
  enabled?: boolean;
}

declare global {
  interface Window {
    __insp: any[];
    __inspld: number;
  }
}

export default function Inspectlet({ siteId, enabled = true }: InspectletProps) {
  useEffect(() => {
    if (!enabled || !siteId) return;

    // Initialize Inspectlet
    window.__insp = window.__insp || [];
    window.__inspld = 1;

    // Load Inspectlet script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.id = 'inspsync';
    script.src = `https://cdn.inspectlet.com/inspectlet.js?wid=${siteId}&r=${Math.floor(new Date().getTime() / 3600000)}`;
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    return () => {
      // Cleanup on unmount
      const inspectletScript = document.getElementById('inspsync');
      if (inspectletScript && inspectletScript.parentNode) {
        inspectletScript.parentNode.removeChild(inspectletScript);
      }
    };
  }, [siteId, enabled]);

  if (!enabled || !siteId) return null;

  return null; // Inspectlet loads via script injection
}

// Utility functions for Inspectlet tracking
export const inspectletTrack = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.__insp) {
    window.__insp.push(['track', eventName, properties]);
  }
};

export const inspectletIdentify = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.__insp) {
    window.__insp.push(['identify', userId, traits]);
  }
};

export const inspectletTagSession = (tags: string[]) => {
  if (typeof window !== 'undefined' && window.__insp) {
    tags.forEach(tag => {
      window.__insp.push(['tagSession', tag]);
    });
  }
}; 