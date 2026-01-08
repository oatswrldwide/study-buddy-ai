# Admin Login Fix Guide

## Problem
You're getting a 404 error when trying to log in as admin. This is caused by:
1. RLS (Row Level Security) policies blocking your authentication queries
2. SPA routing not properly configured (now fixed)

## Solution Steps

### Step 1: Run RLS Policy Fix in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your StudyBuddy AI project
3. Go to **SQL Editor** (left sidebar)
4. Copy and paste the entire contents of `src/lib/fix-rls-policies.sql` into the editor
5. Click **Run** (or press Ctrl+Enter)

This will:
- Drop all conflicting RLS policies
- Create new simplified policies that allow users to check their own roles
- Fix the circular dependency issue

### Step 2: Verify Your Admin Account

Run this query in Supabase SQL Editor to confirm your admin account exists:

```sql
-- Check if your admin account exists
SELECT 
  au.id,
  au.email,
  au.auth_user_id,
  u.email as auth_email,
  u.created_at
FROM admin_users au
LEFT JOIN auth.users u ON au.auth_user_id = u.id
ORDER BY au.created_at DESC;
```

**Expected Result:** You should see your admin account with matching `auth_user_id` and email.

If you DON'T see your account, create it:

```sql
-- Replace with your actual email and auth.uid()
INSERT INTO admin_users (email, auth_user_id)
VALUES ('your-email@example.com', 'your-auth-user-id-here');
```

To get your `auth_user_id`:
```sql
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
```

### Step 3: Test Login

1. Wait 2-3 minutes for GitHub Pages to deploy the latest changes
2. Go to: https://oatswrldwide.github.io/study-buddy-ai/login
3. Log in with your admin credentials
4. You should be redirected to: https://oatswrldwide.github.io/study-buddy-ai/admin

### Step 4: If Still Having Issues

Check browser console for errors:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try logging in
4. Look for error messages

Common issues:
- **"role is null"** → RLS policies not run yet (go back to Step 1)
- **"403 Forbidden"** → Wrong credentials or account doesn't exist (go to Step 2)
- **"401 Unauthorized"** → Session expired, try logging out and back in

### Step 5: Optional - Enable RLS Back On

Once you can log in successfully, you can re-enable RLS for security:

```sql
-- Re-enable RLS on auth tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_signups ENABLE ROW LEVEL SECURITY;
```

The policies we created will still allow proper authentication while keeping data secure.

## What Changed

### Code Updates
- ✅ Removed school backend complexity from AuthContext
- ✅ Removed school login redirect from Login.tsx
- ✅ Removed school routes from App.tsx
- ✅ Added external demo link to HeroSchools
- ✅ Rebuilt app with proper SPA routing (404.html)

### Architecture Simplification
- **Schools**: Static marketing page → External demo (zenzele-edu)
- **Admin**: Full backend access to manage everything
- **Students/Parents**: Full backend features (authentication, portal, payments)
- **School Accounts**: Keep table for manual setup, but no self-service login

## URLs

- **Main Site**: https://oatswrldwide.github.io/study-buddy-ai/
- **Login**: https://oatswrldwide.github.io/study-buddy-ai/login
- **Admin Dashboard**: https://oatswrldwide.github.io/study-buddy-ai/admin
- **External School Demo**: https://oatswrldwide.github.io/zenzele-edu/

## Need Help?

If you're still having issues after following these steps, check:
1. Supabase project settings → Is it active?
2. Environment variables → Are Supabase URL and keys correct?
3. Browser cache → Try clearing cache or use incognito mode
4. Network tab in DevTools → Look for failed API calls to Supabase
