# Schools Contact Form Setup

## Overview
The schools landing page has been simplified to focus on lead generation through a direct contact form powered by Formspree.

## What Changed

### 1. Simplified Landing Page
- **Before**: Complex multi-section page with Features, Pricing, Stats, Testimonials, CTA sections
- **After**: Clean single-page layout with just Header, Hero (with contact form), and Footer

### 2. Contact Form Implementation
- **Component**: `src/components/schools/SchoolContactForm.tsx`
- **Service**: Formspree (https://formspree.io)
- **Email Destination**: ongezile.mqokeli@gmail.com
- **Form Endpoint**: https://formspree.io/f/xbljelry

### 3. Hero Section Updates
- **Component**: `src/components/schools/HeroSchools.tsx`
- Removed complex dashboard mockup
- Added direct contact form in right column
- Simplified value proposition with 4 key benefits:
  - Unlimited Students
  - All Subjects
  - Track Progress
  - POPIA Compliant

## Form Fields

The contact form collects:
1. **School Name** * (required)
2. **Contact Person** * (required)
3. **Email Address** * (required)
4. **Phone Number** (optional)
5. **Number of Students** (optional)
6. **Message** * (required)

## Features

### User Experience
- Real-time form validation
- Loading spinner during submission
- Success message with confirmation
- Error handling with toast notifications
- Option to send another message after success

### Design
- Clean, professional layout
- Matches existing brand colors
- Mobile responsive
- Accessible form labels
- Clear call-to-action

## Formspree Configuration

### Current Setup
- **Endpoint ID**: xbljelry
- **Receiving Email**: ongezile.mqokeli@gmail.com
- **Method**: POST with JSON acceptance
- **CORS**: Enabled for studybuddy.works domain

### Response Handling
```typescript
// Success Response
{
  ok: true,
  next: string  // Optional redirect URL
}

// Error Response
{
  ok: false,
  errors: Array<{
    field: string,
    code: string,
    message: string
  }>
}
```

## Email Notifications

When a school submits the form, you'll receive an email at **ongezile.mqokeli@gmail.com** with:
- School name
- Contact person name
- Email address
- Phone number (if provided)
- Number of students (if provided)
- Message content
- Timestamp
- Source URL

## Managing Form Submissions

### Formspree Dashboard
1. Go to https://formspree.io
2. Sign in with your account
3. View all submissions in real-time
4. Export data as CSV
5. Set up auto-responses
6. Configure spam protection

### Recommended Settings
- **Auto-response**: Enable to send confirmation email to school
- **Spam Protection**: Enable reCAPTCHA or honeypot
- **Email Notifications**: Enable instant notifications
- **Archiving**: Export submissions monthly

## Testing

### Test the Form
1. Navigate to https://studybuddy.works/schools
2. Fill out the contact form
3. Submit and verify:
   - Success message appears
   - Email received at ongezile.mqokeli@gmail.com
   - Form data is correct

### Test Scenarios
- ✅ All required fields filled
- ✅ Valid email format
- ✅ Optional fields empty
- ✅ Very long message text
- ❌ Missing required fields (should show validation)
- ❌ Invalid email format (should show validation)

## Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify Formspree endpoint ID is correct
3. Check network tab for failed requests
4. Ensure CORS is configured for your domain

### Not Receiving Emails
1. Check spam/junk folder
2. Verify email address in Formspree dashboard
3. Check Formspree submission log
4. Confirm email notifications are enabled

### Validation Errors
1. Ensure all required fields have `required` attribute
2. Check email input has `type="email"`
3. Verify field names match Formspree expectations

## Customization

### Changing the Receiving Email
1. Update Formspree form settings
2. Or create a new form at formspree.io
3. Update the endpoint in `SchoolContactForm.tsx`:
   ```typescript
   const response = await fetch("https://formspree.io/f/YOUR_NEW_ID", {
   ```

### Adding Fields
Add new input in `SchoolContactForm.tsx`:
```typescript
<div>
  <label htmlFor="fieldname">Field Label *</label>
  <Input
    id="fieldname"
    name="fieldname"
    type="text"
    required
    placeholder="Placeholder text"
  />
</div>
```

### Styling Changes
Update classes in `SchoolContactForm.tsx` using Tailwind CSS utilities.

## Deployment

Changes are automatically deployed via GitHub Actions:
- **Commit**: 09dcaee
- **Files Modified**:
  - `src/components/schools/SchoolContactForm.tsx` (new)
  - `src/components/schools/HeroSchools.tsx`
  - `src/pages/SchoolsLanding.tsx`

## Next Steps

### Optional Enhancements
1. **Auto-Response Email**: Set up in Formspree to confirm receipt
2. **CRM Integration**: Connect Formspree to your CRM
3. **Webhooks**: Set up webhooks for Slack/Discord notifications
4. **Analytics**: Track form completion rates
5. **A/B Testing**: Test different form layouts

### Maintenance
- Monitor submission volume
- Review and respond to inquiries within 24 hours
- Update email if ongezile.mqokeli@gmail.com changes
- Export submissions monthly for backup

## Support

For Formspree support:
- Documentation: https://help.formspree.io
- Support: support@formspree.io
- Status: https://status.formspree.io
