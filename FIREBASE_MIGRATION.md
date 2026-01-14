# Firebase Migration Guide - StudyBuddy AI

## Migration Complete! 🎉

StudyBuddy AI has been successfully migrated from Supabase to Firebase. This guide will help you set up and deploy the application.

---

## What Changed

### Backend Services
- **Authentication**: Supabase Auth → Firebase Authentication
- **Database**: PostgreSQL (Supabase) → Cloud Firestore
- **Security**: Row Level Security (RLS) → Firestore Security Rules

### Key Benefits
- ✅ Simpler authentication with custom claims
- ✅ No more complex RLS policy issues
- ✅ Better free tier (longer runway before costs)
- ✅ Gradual scaling costs ($0 → $2 → $10)
- ✅ Real-time capabilities built-in

---

## Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Name it `studybuddy-ai` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click **Create Project**

### 2. Enable Firebase Services

#### Authentication
1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Save changes

#### Firestore Database
1. Go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in Production Mode**
4. Select your region (closest to South Africa: `europe-west1` or `asia-south1`)
5. Click **Enable**

#### Firebase Storage (Optional - for payment proofs)
1. Go to **Storage**
2. Click **Get Started**
3. Start in production mode
4. Choose same region as Firestore

### 3. Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (⚙️ icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`)
4. Register your app: `StudyBuddy AI Web`
5. Copy the configuration object

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Deploy Firestore Security Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project (if not done)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules
```

### 6. Create Admin User

Since we're using custom claims for roles, you need to create admin users via Firebase Admin SDK or manually:

**Option A: Using Firebase Console**
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter admin email and password
4. Copy the User UID

**Option B: Create via Code** (Recommended)
Create a Cloud Function or use Firebase Admin SDK:

```javascript
const admin = require('firebase-admin');

// Set custom claims
await admin.auth().setCustomUserClaims(userId, { 
  role: 'admin' 
});

// Also create document in admin_users collection
await admin.firestore().collection('admin_users').doc(userId).set({
  email: 'admin@studybuddy.co.za',
  role: 'admin',
  created_at: admin.firestore.FieldValue.serverTimestamp()
});
```

---

## Data Migration

### Migrate Existing Data from Supabase

If you have existing data in Supabase that needs to be migrated:

1. **Export from Supabase**:
   - Go to Supabase Dashboard → SQL Editor
   - Export each table as JSON
   
2. **Import to Firestore**:
   - Use the Firebase Admin SDK
   - Or use a migration script (see `scripts/migrate-data.js` if created)

**Important Field Mappings**:
- `auth_user_id` (Supabase) → Document ID in Firestore
- `created_at` (timestamp) → Use Firestore `serverTimestamp()`
- UUID primary keys → Firestore auto-generated IDs

---

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## Deployment

### Option 1: Firebase Hosting (Recommended)

```bash
# Build the app
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Your app will be live at: `https://your-project-id.web.app`

### Option 2: GitHub Pages (Current Setup)

Update GitHub Actions workflow to use Firebase env variables:

```yaml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  # ... other Firebase variables
```

Add secrets in GitHub: Settings → Secrets and variables → Actions

---

## Testing the Migration

### 1. Test Public Forms
- ✅ School Lead Form: Submit without authentication
- ✅ Student Signup Form: Submit without authentication

### 2. Test Authentication
- ✅ Login with admin credentials
- ✅ Check role detection in console
- ✅ Verify redirect to admin dashboard

### 3. Test Admin Features
- ✅ View school leads
- ✅ View student signups
- ✅ Update lead/student status
- ✅ Dashboard statistics

### 4. Test Chat System
- ✅ Create new conversation
- ✅ Send messages
- ✅ Verify message persistence
- ✅ Check message count increment

---

## Cost Monitoring

### Free Tier Limits
- **Firestore**: 50K reads/day, 20K writes/day, 1GB storage
- **Authentication**: Unlimited users
- **Hosting**: 10GB storage, 360MB/day transfer

### Monitor Usage
1. Go to Firebase Console
2. Check **Usage** tab in each service
3. Set up budget alerts in Google Cloud Console

### Estimated Costs at Scale
- **0-100 active users/day**: $0/month (free tier)
- **100-500 users/day**: $2-5/month
- **500-2000 users/day**: $10-20/month
- **2000+ users/day**: $20-100/month

---

## Troubleshooting

### Authentication Issues

**Problem**: "Role is null" or "Cannot read role"
- **Solution**: Ensure custom claims are set via Admin SDK
- **Fallback**: The app checks Firestore collections (admin_users, student_signups)

**Problem**: "Permission denied" errors
- **Solution**: Deploy Firestore security rules: `firebase deploy --only firestore:rules`

### Database Query Issues

**Problem**: "Missing or insufficient permissions"
- **Solution**: Check Firestore Security Rules
- **Debug**: Use Firebase Console → Firestore → Rules Playground

**Problem**: Queries timing out
- **Solution**: Create indexes for compound queries
- **Auto-create**: Firestore will suggest indexes in console errors

### Deployment Issues

**Problem**: Environment variables not working
- **Solution**: Ensure `.env` file exists and variables start with `VITE_`
- **Production**: Add secrets to GitHub/hosting platform

---

## Migration Checklist

- [x] Install Firebase SDK
- [x] Create Firebase configuration
- [x] Migrate AuthContext to Firebase Auth
- [x] Migrate AIChat to Firestore
- [x] Migrate admin dashboard queries
- [x] Migrate form submissions
- [x] Create Firestore Security Rules
- [ ] Deploy Firestore rules to Firebase
- [ ] Create admin user with custom claims
- [ ] Test all features
- [ ] Migrate existing data (if any)
- [ ] Update GitHub secrets (if using GitHub Pages)
- [ ] Deploy to production

---

## Support

For issues or questions:
1. Check Firebase Console for error logs
2. Review browser console for client-side errors
3. Check Firestore Rules for permission issues
4. Contact: support@studybuddy.co.za

---

## Next Steps (Optional Enhancements)

1. **Cloud Functions**: Create function to set custom claims on user creation
2. **Realtime Updates**: Use Firestore's `onSnapshot()` for real-time admin dashboard
3. **Analytics**: Enable Firebase Analytics for user behavior tracking
4. **Performance Monitoring**: Add Firebase Performance SDK
5. **Crash Reporting**: Enable Crashlytics for error tracking

---

**Migration completed on**: {{ date }}
**Migrated by**: AI Assistant
**Status**: ✅ Ready for deployment
