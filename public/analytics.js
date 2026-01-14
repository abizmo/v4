/**
 * Analytics Configuration
 * Flexible analytics setup supporting multiple providers
 */

const ANALYTICS_CONFIG = {
  // Set to false to disable analytics completely
  enabled: true,

  // Choose your provider: 'plausible', 'google', 'umami', or 'custom'
  provider: null, // Set to null to disable until configured

  // Provider-specific settings
  plausible: {
    domain: 'abizmo.dev',
    src: 'https://plausible.io/js/script.js',
  },

  google: {
    measurementId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
  },

  umami: {
    websiteId: 'your-website-id',
    src: 'https://analytics.umami.is/script.js', // Or your self-hosted URL
  },
};

/**
 * Initialize analytics based on configuration
 */
function initAnalytics() {
  if (!ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.provider) {
    return;
  }

  switch (ANALYTICS_CONFIG.provider) {
    case 'plausible':
      initPlausible();
      break;
    case 'google':
      initGoogleAnalytics();
      break;
    case 'umami':
      initUmami();
      break;
    case 'custom':
      // Add your custom analytics initialization here
      break;
    default:
      console.warn('Unknown analytics provider:', ANALYTICS_CONFIG.provider);
  }
}

/**
 * Plausible Analytics
 * Privacy-friendly, lightweight (<1KB), no cookies
 * https://plausible.io
 */
function initPlausible() {
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', ANALYTICS_CONFIG.plausible.domain);
  script.src = ANALYTICS_CONFIG.plausible.src;
  document.head.appendChild(script);
}

/**
 * Google Analytics 4
 * Comprehensive analytics, requires cookie consent in EU
 * https://analytics.google.com
 */
function initGoogleAnalytics() {
  // Load gtag.js
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.google.measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.google.measurementId, {
    anonymize_ip: true, // Privacy-friendly option
    cookie_flags: 'SameSite=None;Secure',
  });

  // Make gtag available globally
  window.gtag = gtag;
}

/**
 * Umami Analytics
 * Open-source, privacy-focused, self-hostable
 * https://umami.is
 */
function initUmami() {
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-website-id', ANALYTICS_CONFIG.umami.websiteId);
  script.src = ANALYTICS_CONFIG.umami.src;
  document.head.appendChild(script);
}

/**
 * Track custom events (works across providers)
 * @param {string} eventName - Name of the event
 * @param {object} properties - Event properties
 */
function trackEvent(eventName, properties = {}) {
  if (!ANALYTICS_CONFIG.enabled || !ANALYTICS_CONFIG.provider) {
    return;
  }

  switch (ANALYTICS_CONFIG.provider) {
    case 'plausible':
      if (window.plausible) {
        window.plausible(eventName, { props: properties });
      }
      break;
    case 'google':
      if (window.gtag) {
        window.gtag('event', eventName, properties);
      }
      break;
    case 'umami':
      if (window.umami) {
        window.umami.track(eventName, properties);
      }
      break;
  }
}

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalytics);
} else {
  initAnalytics();
}

// Export for use in other scripts
window.trackEvent = trackEvent;
