-- Instructions to Create Your First Admin User
-- ============================================

-- STEP 1: Create Auth User in Supabase Dashboard
-- ------------------------------------------------
-- 1. Go to your Supabase project: https://supabase.com/dashboard
-- 2. Navigate to: Authentication → Users
-- 3. Click "Add user" button
-- 4. Fill in:
--    - Email: admin@studybuddy.co.za (or your email)
--    - Password: Create a secure password
--    - Auto Confirm User: ✓ Check this box
-- 5. Click "Create user"
-- 6. Copy the UUID from the newly created user (you'll see it in the users list)

-- STEP 2: Link Auth User to admin_users Table
-- --------------------------------------------
-- Replace 'YOUR-AUTH-USER-UUID-HERE' with the UUID you copied above
-- Then run this SQL in the Supabase SQL Editor:

INSERT INTO admin_users (auth_user_id, email, full_name, role)
VALUES (
  'YOUR-AUTH-USER-UUID-HERE',  -- Replace with actual UUID from Step 1
  'admin@studybuddy.co.za',    -- Same email as Step 1
  'Admin User',                 -- Your name
  'admin'                       -- Role (admin or super_admin)
);

-- STEP 3: Verify It Worked
-- -------------------------
-- Run this query to check:
SELECT 
  au.id,
  au.email,
  au.full_name,
  au.role,
  au.created_at
FROM admin_users au;

-- You should see your admin user listed!

-- STEP 4: Test Login
-- -------------------
-- 1. Go to: https://studybuddy.works/login
-- 2. Enter the email and password from Step 1
-- 3. You should be redirected to: https://studybuddy.works/admin
-- 4. You're now logged in as an admin!

-- ============================================
-- CREATING ADDITIONAL ADMIN USERS
-- ============================================

-- If you need to create more admin users later, repeat these steps
-- or use this SQL (after creating the auth user in dashboard):

-- INSERT INTO admin_users (auth_user_id, email, full_name, role)
-- VALUES (
--   'ANOTHER-UUID-HERE',
--   'another-admin@studybuddy.co.za',
--   'Another Admin',
--   'admin'
-- );

-- ============================================
-- CREATING SCHOOL ACCOUNTS
-- ============================================

-- For schools, after they fill out the school lead form and you convert them:
-- 1. Create auth user in Supabase Auth with their email
-- 2. Run this SQL:

-- INSERT INTO school_accounts (
--   auth_user_id, 
--   school_lead_id, 
--   school_name, 
--   contact_email,
--   subscription_status
-- )
-- VALUES (
--   'SCHOOL-AUTH-UUID',
--   'SCHOOL-LEAD-ID-FROM-SCHOOL-LEADS-TABLE',
--   'School Name',
--   'school@email.com',
--   'trial'  -- or 'active'
-- );

-- ============================================
-- TROUBLESHOOTING
-- ============================================

-- If you get "User already exists" error:
-- Check if user is already in admin_users:
SELECT * FROM admin_users WHERE email = 'admin@studybuddy.co.za';

-- If you need to update an existing admin user:
-- UPDATE admin_users 
-- SET full_name = 'New Name', role = 'super_admin'
-- WHERE email = 'admin@studybuddy.co.za';

-- If you need to delete an admin user:
-- DELETE FROM admin_users WHERE email = 'admin@studybuddy.co.za';
-- Then also delete from: Authentication → Users in Supabase dashboard
