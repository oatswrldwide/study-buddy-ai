-- Complete RLS Policy Reset for StudyBuddy AI
-- This fixes the circular dependency issue where users can't check their role

-- STEP 1: Drop ALL existing policies on auth tables
DROP POLICY IF EXISTS "Admin users can view all admin records" ON admin_users;
DROP POLICY IF EXISTS "Admin users can view their own record" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;

DROP POLICY IF EXISTS "Schools can view their own account" ON school_accounts;
DROP POLICY IF EXISTS "Schools can update their own account" ON school_accounts;
DROP POLICY IF EXISTS "Users can view their own school account" ON school_accounts;
DROP POLICY IF EXISTS "Admins can view all schools" ON school_accounts;
DROP POLICY IF EXISTS "Admins can update all schools" ON school_accounts;

DROP POLICY IF EXISTS "Students can view their own signup" ON student_signups;
DROP POLICY IF EXISTS "Students can update their own signup" ON student_signups;
DROP POLICY IF EXISTS "Users can view their own student signup" ON student_signups;
DROP POLICY IF EXISTS "Parents can view their children's signups" ON student_signups;

-- STEP 2: Create simple, working policies

-- admin_users: Allow authenticated users to check if they're an admin
CREATE POLICY "Allow users to check their admin status"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- school_accounts: Allow authenticated users to check if they're a school
CREATE POLICY "Allow users to check their school status"
  ON school_accounts FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- school_accounts: Allow schools to update their own data
CREATE POLICY "Allow schools to update own account"
  ON school_accounts FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- student_signups: Allow users to check if they're a student
CREATE POLICY "Allow users to check their student status"
  ON student_signups FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- student_signups: Allow parents to view their children
CREATE POLICY "Allow parents to view their children"
  ON student_signups FOR SELECT
  TO authenticated
  USING (parent_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- student_signups: Allow students to update their own data
CREATE POLICY "Allow students to update own signup"
  ON student_signups FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_user_id);

-- OPTIONAL: Add admin bypass policies (run these after you can log in as admin)
-- CREATE POLICY "Admins can view all admin records"
--   ON admin_users FOR SELECT
--   TO authenticated
--   USING (
--     EXISTS (SELECT 1 FROM admin_users WHERE auth_user_id = auth.uid())
--   );

-- CREATE POLICY "Admins can view all schools"
--   ON school_accounts FOR ALL
--   TO authenticated
--   USING (
--     EXISTS (SELECT 1 FROM admin_users WHERE auth_user_id = auth.uid())
--   );

-- Verify policies are created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('admin_users', 'school_accounts', 'student_signups')
ORDER BY tablename, policyname;
