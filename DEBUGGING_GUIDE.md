# Debugging Guide for StudyBuddy AI

## 🔍 What Was Fixed

### 1. **Error Boundary Added**
- **File**: `src/components/ErrorBoundary.tsx`
- **Purpose**: Catches React rendering errors and shows a user-friendly error page
- **Features**:
  - Displays error details in dev mode
  - "Refresh Page" button
  - Prevents entire app crash

### 2. **Enhanced Firebase Initialization**
- **File**: `src/lib/firebase.ts`
- **Improvements**:
  - ✅ Validates environment variables
  - ✅ Console logs for initialization status
  - ✅ Throws clear errors if config is missing

### 3. **Enhanced Auth Context Logging**
- **File**: `src/contexts/AuthContext.tsx`
- **Improvements**:
  - 🔐 Logs auth state changes
  - 🔐 Tracks user authentication flow
  - 🔐 Shows role detection process

### 4. **Route Improvements**
- **File**: `src/App.tsx`
- **Added Routes**:
  - `/student-portal` → Student Portal
  - `/admin/dashboard` → Admin Dashboard
  - `/school/dashboard` → School Dashboard
  - `/parent/dashboard` → Parent Dashboard

### 5. **Firestore Rules Updated**
- **File**: `firestore.rules`
- **Changes**:
  - ✅ Students can read their own signup data
  - ✅ Students can update their own profile
  - ✅ Simplified chat message access
  - ✅ Better permission checks

## 🐛 How to Debug Issues

### Check Browser Console
```javascript
// Look for these debug messages:
✅ Firebase initialized successfully
🔐 AuthContext: Setting up auth listener
🔐 Auth state changed: User: [email]
🔐 Auth loading complete
```

### Common Issues & Solutions

#### 1. **White Screen / App Won't Load**
**Symptoms**: Blank page, no content
**Check**:
```bash
# Open browser console (F12)
# Look for errors like:
❌ Failed to initialize Firebase
❌ Firebase configuration is missing
```
**Solution**: Check `.env` file has all Firebase variables

#### 2. **Infinite Loading Spinner**
**Symptoms**: "Loading..." never disappears
**Cause**: Auth state not resolving
**Check Console For**:
```
🔐 Auth state changed: No user  # Should see this
🔐 Auth loading complete        # Should see this
```
**Solution**: Check Firebase Auth is enabled in console

#### 3. **Login Redirects to Wrong Page**
**Symptoms**: After login, goes to `/` instead of dashboard
**Check**:
- `src/components/auth/GoogleSignInButton.tsx` - Lines 35-51
- `src/pages/Login.tsx` - Role-based redirect logic
**Solution**: Ensure user has role set in Firestore

#### 4. **Permission Denied Errors**
**Symptoms**: `FirebaseError: Missing or insufficient permissions`
**Check**:
```bash
# Open Firebase Console → Firestore → Rules
# Verify rules are deployed
```
**Solution**: Run `firebase deploy --only firestore:rules`

#### 5. **Google Sign-In Fails**
**Symptoms**: "Failed to sign in with Google"
**Check**:
- Firebase Console → Authentication → Sign-in methods
- Ensure Google provider is enabled
- Check authorized domains include your hosting URL

## 📊 Monitoring & Logs

### View Firebase Console Logs
1. Go to: https://console.firebase.google.com/project/studybuddy-a045b
2. Click "Functions" → "Logs" (if using Cloud Functions)
3. Click "Authentication" → "Users" to verify user creation

### View Browser Network Tab
1. Open DevTools (F12)
2. Go to "Network" tab
3. Filter by "firestore" to see database calls
4. Look for failed requests (red)

### Check Firestore Data
1. Firebase Console → Firestore Database
2. Verify collections exist:
   - `student_signups`
   - `admin_users`
   - `school_accounts`
   - `chat_conversations`
   - `chat_messages`

## 🚀 Testing Checklist

### Before Deploying
- [ ] Run `npm run build` successfully
- [ ] Check for TypeScript errors
- [ ] Test locally on `localhost:8080`
- [ ] Check browser console for errors

### After Deploying
- [ ] Visit live URL: https://studybuddy-a045b.web.app
- [ ] Open browser console
- [ ] Look for "✅ Firebase initialized successfully"
- [ ] Test Google Sign-In
- [ ] Verify redirects work

## 🔧 Quick Fixes

### Reset Auth State
```javascript
// In browser console:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Test Firestore Rules
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Test rules locally
firebase emulators:start --only firestore
```

### Force Rebuild
```bash
rm -rf dist/ node_modules/.vite
npm run build
```

## 📱 Production URLs

- **Live App**: https://studybuddy-a045b.web.app
- **Firebase Console**: https://console.firebase.google.com/project/studybuddy-a045b
- **GitHub Repo**: https://github.com/oatswrldwide/study-buddy-ai

## 🆘 Emergency Rollback

If deployment breaks production:
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Redeploy
npm run build
firebase deploy
```

## 📞 Support Checklist

When reporting issues, include:
1. **Browser Console Screenshot** (F12)
2. **Network Tab** showing failed requests
3. **Steps to reproduce**
4. **User role** (admin/school/parent/student)
5. **URL** where issue occurs
