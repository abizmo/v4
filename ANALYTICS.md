# Analytics Configuration Guide

This project supports multiple analytics providers with a flexible, privacy-friendly setup.

## Quick Start

1. Edit `public/analytics.js`
2. Set your preferred `provider`
3. Configure provider-specific settings
4. Deploy

## Supported Providers

### 1. Plausible Analytics ⭐ Recommended

**Pros:**

- Ultra lightweight (<1KB)
- Privacy-friendly (no cookies, GDPR compliant)
- No cookie banner needed
- Simple, clean dashboard
- Affordable ($9/mo for 10K pageviews)

**Cons:**

- Less detailed than GA4
- Paid service (has free trial)

**Setup:**

```javascript
// In public/analytics.js
const ANALYTICS_CONFIG = {
  enabled: true,
  provider: 'plausible',
  plausible: {
    domain: 'abizmo.dev', // Your domain
    src: 'https://plausible.io/js/script.js',
  },
};
```

**Steps:**

1. Sign up at https://plausible.io
2. Add your domain
3. Update `domain` in config
4. Deploy

### 2. Google Analytics 4 (GA4)

**Pros:**

- Free
- Most comprehensive features
- Industry standard
- Integration with Google services

**Cons:**

- Heavier (~45KB)
- Requires cookie consent in EU
- More complex setup
- Privacy concerns

**Setup:**

```javascript
// In public/analytics.js
const ANALYTICS_CONFIG = {
  enabled: true,
  provider: 'google',
  google: {
    measurementId: 'G-XXXXXXXXXX', // Your GA4 ID
  },
};
```

**Steps:**

1. Create account at https://analytics.google.com
2. Create GA4 property
3. Get your Measurement ID (G-XXXXXXXXXX)
4. Update `measurementId` in config
5. Add cookie consent banner (required in EU)

### 3. Umami Analytics

**Pros:**

- Open source
- Privacy-friendly
- Self-hostable (free) or cloud ($9/mo)
- Simple and fast
- No cookie banner needed

**Cons:**

- Less features than GA4
- Requires setup if self-hosting

**Setup:**

```javascript
// In public/analytics.js
const ANALYTICS_CONFIG = {
  enabled: true,
  provider: 'umami',
  umami: {
    websiteId: 'your-website-id',
    src: 'https://analytics.umami.is/script.js', // Or your server
  },
};
```

**Steps:**

**Option A - Cloud (Paid):**

1. Sign up at https://umami.is
2. Add website
3. Get website ID
4. Update config

**Option B - Self-hosted (Free):**

1. Deploy Umami to your server
2. Add website in dashboard
3. Get website ID and script URL
4. Update config

## Custom Event Tracking

Track custom events across all providers:

```javascript
// Track a button click
document.querySelector('#contact-button').addEventListener('click', () => {
  window.trackEvent('Contact Button Clicked', {
    location: 'hero',
  });
});

// Track file download
window.trackEvent('Resume Downloaded', {
  format: 'pdf',
});

// Track outbound links
window.trackEvent('Outbound Link', {
  url: 'https://github.com/abizmo',
});
```

## Privacy Best Practices

1. **Be Transparent**: Add analytics mention to your privacy policy
2. **Respect DNT**: The implementation respects Do Not Track settings
3. **Minimize Data**: Only track what you need
4. **Cookie Consent**: Required for GA4 in EU (not for Plausible/Umami)

## Testing

Test analytics in development:

```bash
npm run dev
```

Check browser console for analytics initialization messages.

## Disable Analytics

To completely disable analytics:

```javascript
const ANALYTICS_CONFIG = {
  enabled: false, // Set to false
  // ...
};
```

## Comparison Table

| Feature       | Plausible  | GA4        | Umami            |
| ------------- | ---------- | ---------- | ---------------- |
| Price         | $9/mo      | Free       | Free (self) / $9 |
| Size          | <1KB       | ~45KB      | ~2KB             |
| Privacy       | ⭐⭐⭐⭐⭐ | ⭐⭐       | ⭐⭐⭐⭐⭐       |
| Features      | ⭐⭐⭐     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐           |
| Setup         | Easy       | Medium     | Medium           |
| Cookie Banner | No         | Yes        | No               |

## Recommendation

For a personal portfolio:

1. **Best overall**: Plausible - simple, fast, privacy-friendly
2. **Budget**: Umami (self-hosted) - free and open source
3. **Maximum features**: GA4 - if you need detailed analytics

Start with Plausible or Umami for the best balance of simplicity and privacy.
