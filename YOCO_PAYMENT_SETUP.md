# Yoco Payment Integration Setup

## Overview
StudyBuddy now includes Yoco payment integration to allow students to upgrade from the free tier (5 questions/day) to unlimited questions for R200/year.

## Features Implemented

### 1. Free Daily Questions
- **5 free questions per day** for all users
- Automatic daily reset at midnight
- Question counter displayed in portal header
- Questions tracked in Firestore (`questions_today`, `last_question_date`)

### 2. Payment Wall
- Shows when user runs out of free questions
- Displays R200/year special offer pricing
- Uses Yoco inline checkout SDK
- Secure payment processing
- Automatic Firestore update on successful payment

### 3. Signup Flow
- Welcome modal for new signups
- Option to try free questions or upgrade immediately
- Payment prompt encourages early conversion
- Non-intrusive - can be dismissed

## Environment Setup

### 1. Add Yoco API Keys to GitHub Secrets

Go to: https://github.com/oatswrldwide/study-buddy-ai/settings/secrets/actions

Add the following secret:

**Test Key (for development):**
```
Name: VITE_YOCO_PUBLIC_KEY
Value: pk_test_ed3c54a6gOol69qa7f45
```

**Production Key (when ready to go live):**
```
Name: VITE_YOCO_PUBLIC_KEY
Value: pk_live_YOUR_LIVE_KEY_HERE
```

### 2. Update GitHub Actions Workflow

The `.github/workflows/deploy.yml` file needs to include the Yoco key in the build environment:

```yaml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
  VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
  VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
  VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
  VITE_OPENROUTER_API_KEY: ${{ secrets.VITE_OPENROUTER_API_KEY }}
  VITE_YOCO_PUBLIC_KEY: ${{ secrets.VITE_YOCO_PUBLIC_KEY }}
```

### 3. Local Development

For local testing, create a `.env` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env

# Edit .env and add your keys
nano .env
```

Add the test key:
```
VITE_YOCO_PUBLIC_KEY=pk_test_ed3c54a6gOol69qa7f45
```

## Testing Payment Flow

### Test Cards

**Success:**
- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)

**Decline:**
- Card Number: `4000 0000 0000 0002`
- Expiry: Any future date
- CVV: Any 3 digits

### Test Scenarios

1. **New User Signup:**
   - Sign up with Google
   - See welcome modal with free vs paid options
   - Click "Try Free Questions"
   - Ask 5 questions
   - See payment wall on 6th question
   - Complete payment
   - Verify unlimited access

2. **Existing Free User:**
   - Login with existing account
   - Check questions remaining badge (top right)
   - Ask questions until limit reached
   - See payment wall
   - Complete payment

3. **Payment Success Flow:**
   - Payment wall appears
   - Click "Upgrade Now - R200/Year"
   - Yoco modal opens
   - Enter test card details
   - Payment processes
   - Firestore updates with:
     - `payment_status: "paid"`
     - `status: "active"`
     - `subscription_end: (365 days from now)`
     - `transaction_id: (Yoco transaction ID)`
   - User sees unlimited questions

## Firestore Schema Updates

### `student_signups` Collection

New fields added:
```typescript
{
  // Existing fields...
  status: "trial" | "active" | "inactive",        // User subscription status
  payment_status: "pending" | "paid",              // Payment state
  questions_today: number,                          // Count of questions asked today
  last_question_date: string,                       // Date of last question (for daily reset)
  subscription_end: string,                         // ISO date when subscription expires
  transaction_id: string,                           // Yoco transaction ID
  amount_paid: number,                              // Amount paid (200)
  currency: "ZAR",                                  // Currency
  payment_date: Timestamp,                          // When payment was made
}
```

## Component Architecture

### New Components

1. **`YocoPaymentWall.tsx`**
   - Full-screen payment modal
   - Shows when free questions exhausted
   - R200/year pricing display
   - Yoco SDK integration
   - Payment success callback

2. **`PaymentPromptModal.tsx`**
   - Welcome modal for new signups
   - Free vs paid comparison
   - Two CTAs: "Try Free" or "Upgrade"
   - Non-blocking (can be dismissed)

### Updated Components

1. **`StudentPortal.tsx`**
   - Question tracking state
   - Payment wall rendering
   - Question counter badge
   - Daily reset logic

2. **`AIChat.tsx`**
   - Accepts `hasPaid` prop
   - Accepts `onQuestionAsked` callback
   - Decrements question count per message

3. **`GoogleSignInButton.tsx`**
   - Shows payment prompt for new users
   - Initializes question tracking fields
   - Sets `status: "trial"` for new signups

## Production Checklist

Before going live with real payments:

- [ ] Replace test key with production key in GitHub Secrets
- [ ] Test payment flow with real card (small amount)
- [ ] Verify Firestore updates correctly
- [ ] Set up Yoco webhook (optional but recommended)
- [ ] Add transaction logging for reconciliation
- [ ] Test subscription expiry logic (365 days)
- [ ] Add payment history view for users
- [ ] Implement refund/cancellation flow
- [ ] Update terms of service with payment terms
- [ ] Add receipt/invoice generation

## Yoco Dashboard

Access your Yoco account at: https://portal.yoco.com/online/

Here you can:
- View all transactions
- Get production API keys
- Set up webhooks
- Download transaction reports
- Manage refunds

## Support

For Yoco API issues:
- Documentation: https://developer.yoco.com/online/
- Support: support@yoco.com

For StudyBuddy integration issues:
- Check browser console for errors
- Verify Yoco SDK loaded (check Network tab)
- Check Firestore rules allow student_signups updates
- Verify environment variable is set correctly

## Future Enhancements

1. **Webhook Verification**
   - Add backend endpoint to verify payments server-side
   - Prevent client-side payment manipulation
   - Ensure payment integrity

2. **Subscription Management**
   - Auto-renewal option
   - Subscription expiry notifications
   - Payment history page
   - Download receipts

3. **Promotional Codes**
   - Coupon system
   - Referral discounts
   - Bulk school pricing

4. **Analytics**
   - Track conversion rates
   - Payment funnel analysis
   - Revenue reporting
