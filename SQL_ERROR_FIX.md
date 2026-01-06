# ✅ SQL Setup Complete - Ready to Deploy

Your database has the correct schema with `student_signup_id` column.

---

## Quick Setup (2 Steps)

### Step 1: Add school_name Column

```sql
-- Add school_name column to student_signups
ALTER TABLE student_signups 
ADD COLUMN IF NOT EXISTS school_name TEXT;

-- Add curriculum column
ALTER TABLE student_signups
ADD COLUMN IF NOT EXISTS curriculum TEXT DEFAULT 'CAPS';

-- Create index
CREATE INDEX IF NOT EXISTS idx_student_signups_school_name 
ON student_signups(school_name);
```

**Then link students to schools:**
```sql
-- Set all existing students to "Independent" for now
UPDATE student_signups 
SET school_name = 'Independent Students'
WHERE school_name IS NULL;
```

---

### Step 2: Run SQL Files

**A. Chat RLS Policies**
- File: `src/lib/chat-rls-policies.sql`
- Copy entire file → Supabase SQL Editor → Run
- ✅ Should succeed with multiple policies created

**B. Chat Functions**
- File: `src/lib/chat-functions.sql`
- Copy entire file → Supabase SQL Editor → Run
- ✅ Function `increment_conversation_count` created

---

## Verification

```sql
-- ✅ Verify school_name column exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'student_signups' 
  AND column_name = 'school_name';

-- ✅ Verify all students have schools
SELECT school_name, COUNT(*) as students 
FROM student_signups 
GROUP BY school_name;

-- ✅ Verify RLS policies created
SELECT tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('chat_conversations', 'chat_messages')
ORDER BY tablename, policyname;

-- ✅ Test analytics query (should return data)
SELECT 
  ss.school_name,
  COUNT(DISTINCT ss.id) as total_students,
  COUNT(DISTINCT cc.id) as total_conversations,
  COUNT(DISTINCT cm.id) as total_messages
FROM student_signups ss
LEFT JOIN chat_conversations cc ON cc.student_signup_id = ss.id
LEFT JOIN chat_messages cm ON cm.conversation_id = cc.id
GROUP BY ss.school_name;
```

---

## What's Fixed

✅ **chat-rls-policies.sql** - Uses `student_signup_id` (your schema)
✅ **school-analytics.ts** - Updated all queries to use `student_signup_id`
✅ Both files now match your database structure

---

## Next Steps After SQL

1. **Commit & Deploy:**
   ```bash
   git add -A
   git commit -m "feat: fix analytics queries to use student_signup_id"
   git push origin main
   ```

2. **Test with Real Data:**
   - Log in as a student
   - Use the AI chat (send messages)
   - Log in as school admin
   - Check dashboard shows analytics

3. **Link More Students:**
   ```sql
   -- Update specific students
   UPDATE student_signups 
   SET school_name = 'Springfield High School'
   WHERE email IN ('student1@example.com', 'student2@example.com');
   ```

---

## For Future Signups

Add school name to signup form or use school-specific URLs:
```
https://studybuddy.works/signup?school=Springfield%20High%20School
```

Done! 🎉
