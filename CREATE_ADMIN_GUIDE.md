# Create Admin User Guide

## ⚠️ Important: Cloud Functions require Firebase Blaze Plan

Firebase Cloud Functions require the **Blaze (Pay-as-you-go) plan**. 

**However, you can create an admin user directly without Cloud Functions using these methods:**

---

## ✅ Method 1: Using Firebase Console (Easiest)

### Step 1: Create the User
1. Go to [Firebase Console](https://console.firebase.google.com/project/studybuddy-a045b/authentication/users)
2. Click **"Add user"**
3. Enter email: `admin@example.com` (or your email)
4. Enter a strong password
5. Click **"Add user"**

### Step 2: Get the User ID
1. Find the user you just created in the list
2. Copy their **User UID** (looks like: `abc123xyz...`)

### Step 3: Set Custom Claims
1. Open **Firebase Console** → **Firestore Database**
2. Click **"+ Start collection"** 
3. Collection ID: `admin_users`
4. Document ID: **Paste the User UID you copied**
5. Add fields:
   - `email` (string): `admin@example.com`
   - `name` (string): `Admin User`
   - `role` (string): `admin`
   - `created_at` (timestamp): Click "Insert field" → Type: timestamp
   - `permissions` (array): `["all"]`
6. Click **Save**

### Step 4: Set Auth Custom Claims (requires Firebase CLI)
```bash
# Install Firebase CLI tools if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Set custom claim for the user
firebase auth:import admin-user.json --project studybuddy-a045b
```

Create `admin-user.json`:
```json
{
  "users": [{
    "localId": "YOUR_USER_UID_HERE",
    "email": "admin@example.com",
    "customClaims": "{\"role\":\"admin\"}"
  }]
}
```

---

## ✅ Method 2: Using Node.js Script (Local)

Create a file `create-admin.js`:

```javascript
const admin = require('firebase-admin');

// Initialize with your service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function createAdmin() {
  const email = 'admin@example.com';
  const password = 'SecurePassword123!';
  
  try {
    // Create user
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: true,
      displayName: 'Admin User'
    });

    console.log('✅ User created:', userRecord.uid);

    // Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });
    console.log('✅ Custom claims set');

    // Create Firestore document
    await admin.firestore().collection('admin_users').doc(userRecord.uid).set({
      email: email,
      name: 'Admin User',
      role: 'admin',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      permissions: ['all']
    });

    console.log('✅ Firestore document created');
    console.log('\n🎉 Admin user ready!');
    console.log('Sign in at: https://studybuddy-a045b.web.app/login');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit();
}

createAdmin();
```

### Get Service Account Key:
1. Go to [Firebase Console](https://console.firebase.google.com/project/studybuddy-a045b/settings/serviceaccounts/adminsdk)
2. Click **"Generate new private key"**
3. Save the JSON file as `serviceAccountKey.json` in your project root
4. **⚠️ Keep this file secret! Add it to `.gitignore`**

### Run the script:
```bash
npm install firebase-admin
node create-admin.js
```

---

## ✅ Method 3: Manual Firestore + Custom Claims

If you just created a user via Google Sign-In:

1. **Sign in with Google** on your app
2. **Get your User ID**:
   - Go to Firebase Console → Authentication → Users
   - Find your account and copy the User UID

3. **Add Firestore Document**:
   - Go to Firestore Database
   - Create collection `admin_users`
   - Add document with ID = your User UID
   - Add fields as shown in Method 1

4. **Wait or Refresh**: Custom claims may take a few minutes to propagate
   - Sign out and sign back in
   - Or force token refresh by reopening the app

---

## 🔐 Sign In as Admin

Once your admin user is created:

1. Go to: https://studybuddy-a045b.web.app/login
2. Sign in with the email and password (or Google if you used that method)
3. You should be redirected to: `/admin/dashboard`

---

## 📊 Admin Dashboard Navigation

### Main Sections:

1. **Dashboard** (`/admin`) or (`/admin/dashboard`)
   - Overview statistics
   - Recent activity
   - Key metrics

2. **School Leads** (`/admin/leads`)
   - View all school inquiries
   - Update lead status
   - Contact information

3. **Student Signups** (`/admin/students`)
   - View all student registrations
   - Approve/verify accounts
   - Parent information

4. **Payments** (`/admin/payments`)
   - View payment proofs
   - Approve/reject payments
   - Transaction history

### Navigation Sidebar:
- Click the menu icon (☰) to open the sidebar
- All admin sections are accessible from the left menu

---

## 🐛 Troubleshooting

### "Permission Denied" Error
- **Cause**: Custom claims not set or Firestore document missing
- **Fix**: Make sure you completed BOTH steps:
  1. Created Firestore document in `admin_users`
  2. Set custom claims with `role: "admin"`

### "No role found for user"
- **Cause**: Document in `admin_users` collection is missing
- **Fix**: Add the document as described in Method 1, Step 3

### Redirects to wrong page
- **Cause**: Role not properly detected
- **Solution**: 
  1. Sign out completely
  2. Clear browser cache
  3. Sign in again
  4. Check browser console for role detection logs

### Custom claims not working
- **Wait**: Custom claims can take 1-2 minutes to propagate
- **Force refresh**: Sign out and sign back in
- **Check**: Use browser console to verify: `auth.currentUser.getIdTokenResult()`

---

## 🆘 Need Help Upgrading to Blaze Plan?

If you want to use Cloud Functions for easier admin creation:

1. Go to: https://console.firebase.google.com/project/studybuddy-a045b/usage/details
2. Click **"Upgrade to Blaze plan"**
3. Set spending limits (recommended: $10/month max)
4. Deploy functions: `firebase deploy --only functions`
5. Use the HTTP endpoint to create admins

**Note**: Blaze plan has a generous free tier. You only pay if you exceed the free quotas.

---

## 📞 Quick Reference

- **Firebase Console**: https://console.firebase.google.com/project/studybuddy-a045b
- **App URL**: https://studybuddy-a045b.web.app
- **Login Page**: https://studybuddy-a045b.web.app/login
- **Admin Dashboard**: https://studybuddy-a045b.web.app/admin/dashboard
