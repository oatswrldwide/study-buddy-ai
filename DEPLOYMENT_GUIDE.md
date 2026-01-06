# StudyBuddy AI - Deployment Guide

## 🚀 Enterprise Analytics Implementation Complete!

The School Dashboard now features real-time analytics, usage tracking, and at-risk student detection.

---

## 📋 Next Steps to Go Live

### 1. Run SQL Files in Supabase

You need to run **THREE** SQL files in the correct order to enable analytics:

#### A. Add School Name Column (REQUIRED FIRST!)
**File:** `/src/lib/add-school-name-to-students.sql`

This adds the `school_name` column to `student_signups` table so students can be linked to schools.

**Steps:**
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `src/lib/add-school-name-to-students.sql`
4. Paste and click **Run**
5. Verify success: You should see the columns listed in the output

**Important:** After running this, you need to manually update existing students to set their `school_name`:
```sql
-- Example: Update students from "Springfield High School"
UPDATE student_signups 
SET school_name = 'Springfield High School'
WHERE email LIKE '%@springfield%' OR parent_email LIKE '%@springfield%';
```

#### B. Chat RLS Policies
**File:** `/src/lib/chat-rls-policies.sql`

This enables schools to access their students' chat data for analytics.

**Steps:**
1. In Supabase SQL Editor
2. Copy the contents of `src/lib/chat-rls-policies.sql`
3. Paste and click **Run**
4. Verify success: You should see "Success. No rows returned"

#### C. Chat Functions
**File:** `/src/lib/chat-functions.sql`

This creates a database function to track message counts.

**Steps:**
1. In Supabase SQL Editor
2. Copy the contents of `src/lib/chat-functions.sql`
3. Paste and click **Run**
4. Verify success: Function `increment_conversation_count` created

---

### 2. Deploy to Production

```bash
git add -A
git commit -m "feat: integrate enterprise analytics dashboard with risk detection"
git push origin main
```

GitHub Actions will automatically deploy to https://studybuddy.works

---

### 3. Test the Analytics Dashboard

**Important:** The dashboard requires real usage data to display analytics.

#### To Generate Test Data:
1. Log in as a **student** (from the school you want to test)
2. Use the AI chat feature
3. Send at least 5-10 messages across multiple subjects
4. Repeat with 2-3 different students

#### Then View Analytics:
1. Log in as the **school admin**
2. Navigate to Dashboard
3. You should now see:
   - ✅ Total Sessions
   - ✅ Total Messages  
   - ✅ 7-Day Usage Trend
   - ✅ Popular Subjects
   - ✅ At-Risk Student Alerts (if applicable)

---

## 🎯 What's New in the Dashboard

### Real-Time Metrics
- **Total Students:** Count of enrolled students
- **Total Sessions:** AI chat sessions started
- **Total Messages:** Messages sent by students
- **At-Risk Students:** Students needing attention

### 7-Day Usage Trend
- Daily session counts
- Daily message counts
- Visual progress bars showing engagement over time

### Popular Subjects
- Top 5 most-used subjects
- Percentage distribution
- Student count per subject

### Risk Detection System
Three risk types automatically detected:

1. **Inactive (Red Badge)**
   - No activity for 7+ days
   - Recommendation: "Check in with student"

2. **Struggling (Orange Badge)**
   - Many sessions but very few messages
   - Recommendation: "May need additional help understanding the chat"

3. **Excessive (Yellow Badge)**
   - Over 200 messages this month
   - Recommendation: "Monitor for over-reliance on AI"

### Alert Banner
- Shows count of at-risk students
- Quick link to Students page for details

---

## 🔍 Troubleshooting

### No Analytics Showing?

**Check:**
1. ✅ SQL files have been run in Supabase
2. ✅ Students have used the chat feature (creates data)
3. ✅ You're logged in as the correct school account
4. ✅ Students are linked to your school via `school_name` field

### RLS Errors?

If you see "permission denied" errors:
1. Verify `/src/lib/fix-rls-policies.sql` has been run
2. Ensure chat tables have RLS enabled
3. Check that student records have matching `school_name`

### No At-Risk Alerts?

This is good! It means:
- All students are active (used chat within 7 days)
- No excessive usage detected
- No struggling students (good message-to-session ratio)

---

## 📊 Business Value for B2B Customers

### For School Administrators
- **Visibility:** Complete oversight of AI usage across the school
- **ROI Tracking:** Measure student engagement and adoption
- **Early Intervention:** Identify at-risk students before issues escalate
- **Subject Insights:** Understand which subjects need most support
- **Compliance:** Monitor usage patterns and ensure appropriate use

### For Sales/Marketing
- Enterprise-grade dashboard with real-time analytics
- Proactive risk detection (not just reactive reporting)
- Data-driven insights to justify subscription costs
- Professional, polished interface matching industry standards

---

## 🎓 What's Next?

### Recommended Enhancements (Priority Order)

1. **Student-Level Analytics** (High Priority)
   - Enhance Students page with per-student engagement scores
   - Show at-risk badges directly in roster
   - Add individual progress tracking

2. **Export Reports** (Medium Priority)
   - CSV export of usage data
   - PDF weekly/monthly reports
   - Email digest for administrators

3. **Parent Dashboard** (Medium Priority)
   - Activity page showing child's chat history
   - Payments page for subscription management

4. **Admin Panel** (Low Priority)
   - View all schools
   - Manage accounts
   - Platform-wide analytics

---

## ✅ Checklist Before Going Live

- [ ] Run `chat-rls-policies.sql` in Supabase
- [ ] Run `chat-functions.sql` in Supabase
- [ ] Test with at least 3 students using chat
- [ ] Verify analytics display correctly
- [ ] Test risk detection (create inactive/struggling scenarios)
- [ ] Commit and push to deploy
- [ ] Test on production URL (https://studybuddy.works)
- [ ] Clear browser cache / test in incognito
- [ ] Document for sales team

---

## 🛟 Need Help?

The analytics service is located at `/src/lib/school-analytics.ts`:
- `getSchoolAnalytics()` - School-wide metrics
- `getStudentAnalytics()` - Per-student data
- `getRiskIndicators()` - At-risk detection

All three functions are fully implemented and ready to use.

---

**Last Updated:** January 6, 2026
**Status:** ✅ Ready for Deployment
