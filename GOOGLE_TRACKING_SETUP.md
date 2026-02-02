# Google Analytics & Search Console Setup Guide

This guide will help you set up Google Analytics and Google Search Console for tracking your StudyBuddy Works website.

## Google Analytics (GA4) Setup

### 1. Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Start measuring** or **Admin** (gear icon)
3. Create an account or use existing one
4. Create a new **Property** for StudyBuddy Works
5. Choose **Web** as the platform

### 2. Get Your Measurement ID

1. After creating the property, you'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

### 3. Update Your Website

In `index.html`, replace `G-XXXXXXXXXX` with your actual Measurement ID in **TWO** places:

```html
<!-- Replace both instances -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); <!-- Replace here too -->
</script>
```

### 4. Verify Installation

1. Deploy your website with the changes
2. Visit your website
3. In Google Analytics, go to **Reports** → **Realtime**
4. You should see your visit appear within seconds

---

## Google Search Console Setup

### 1. Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **Add Property**
3. Choose **URL prefix** and enter: `https://studybuddyworks.com`

### 2. Verify Ownership (Method 1: HTML Tag)

1. Select **HTML tag** verification method
2. Copy the verification code (looks like: `google-site-verification=abc123def456...`)
3. In `index.html`, replace `YOUR_VERIFICATION_CODE_HERE` with your code:

```html
<meta name="google-site-verification" content="abc123def456..." />
```

4. Deploy your website
5. Go back to Search Console and click **Verify**

### 2. Verify Ownership (Method 2: HTML File) - Alternative

If you prefer file verification:

1. Download the verification HTML file from Search Console (e.g., `google1234567890abcdef.html`)
2. Place it in your `public/` folder
3. Deploy your website
4. The file will be accessible at `https://studybuddyworks.com/google1234567890abcdef.html`
5. Click **Verify** in Search Console

### 3. Submit Your Sitemap

1. After verification, go to **Sitemaps** in the left menu
2. Enter your sitemap URL: `sitemap.xml` or `sitemap_index.xml`
3. Click **Submit**

---

## Additional Features

### Enhanced Conversions & Event Tracking

You can track custom events in Google Analytics by adding code in your React components:

```typescript
// Track button clicks
gtag('event', 'button_click', {
  'event_category': 'engagement',
  'event_label': 'signup_button'
});

// Track page views (already automatic with GA4)
// But you can manually track for SPA route changes
gtag('event', 'page_view', {
  page_path: window.location.pathname
});
```

### User Properties

Track user types (student, teacher, admin):

```typescript
gtag('set', 'user_properties', {
  user_type: 'student', // or 'teacher', 'admin', 'parent'
  school_id: 'school_123'
});
```

### E-commerce Tracking (for subscription payments)

```typescript
gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 499,
  currency: 'ZAR',
  items: [{
    item_id: 'subscription_monthly',
    item_name: 'Monthly Subscription',
    price: 499,
    quantity: 1
  }]
});
```

---

## Testing

### Test Google Analytics

1. Open your website in an incognito window
2. Open browser console (F12)
3. Type: `gtag` - you should see it's defined
4. Check Network tab for requests to `www.google-analytics.com`
5. Check Real-time reports in GA4 dashboard

### Test Search Console

1. After verification, wait 24-48 hours for initial data
2. Check **Performance** reports for search queries
3. Monitor **Coverage** for indexing status
4. Review **Enhancements** for any issues

---

## Privacy Considerations

### GDPR Compliance

If you have European users, consider:

1. **Cookie Consent**: Add a cookie banner before initializing GA
2. **IP Anonymization**: Already enabled by default in GA4
3. **Data Retention**: Configure in GA4 settings (Admin → Data Settings → Data Retention)

### Privacy Policy

Update your privacy policy to mention:
- Google Analytics usage
- Cookies used for analytics
- How to opt-out (browser extensions, Do Not Track)

---

## Troubleshooting

### GA4 Not Tracking

- Check browser console for errors
- Verify Measurement ID is correct
- Disable ad blockers during testing
- Check if gtag.js loaded successfully

### Search Console Not Verifying

- Clear browser cache and try again
- Wait 24 hours and retry
- Try alternative verification method (DNS, Google Analytics)
- Ensure verification file/tag is on the live site

---

## Next Steps

1. **Set up Goals/Conversions** in GA4 for signup, login, subscription events
2. **Create Custom Reports** in GA4 for school vs student analytics
3. **Set up Alerts** in GA4 for traffic drops or spikes
4. **Link GA4 to Search Console** for combined insights
5. **Set up Google Tag Manager** (optional) for easier tag management

---

## Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Search Console Help](https://support.google.com/webmasters/answer/9128668)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
