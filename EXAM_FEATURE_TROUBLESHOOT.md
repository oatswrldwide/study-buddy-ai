# 🔍 Can't See Exam Feature? Troubleshooting Guide

## Where to Look for the Feature

The exam feature appears **ONLY after you're logged in and have selected a subject/grade**. Here's the step-by-step:

### Step 1: Login
1. Go to the StudyBuddy site
2. Click "Login" or "Get Started"
3. Sign in with your student account

### Step 2: Select Subject & Grade
After logging in, you'll see a screen asking you to:
- Choose a **Subject** (Mathematics, Physical Sciences, etc.)
- Choose your **Grade** (8, 9, 10, 11, or 12)
- Click to start

### Step 3: Look for the Tabs
Once you've selected your subject/grade, you'll see:

**On Desktop (wide screens):**
- Look at the TOP of the screen
- You'll see TWO TABS:
  - 📱 **Chat** (default)
  - 📄 **Exam Papers** <-- CLICK THIS!

**On Mobile (small screens):**
- Look just below your name at the top
- You'll see TWO BUTTONS side by side:
  - 💬 **Chat**
  - 📄 **Exams** <-- TAP THIS!

## Visual Location

```
┌─────────────────────────────────────┐
│ [Your Name]      Grade 12 Math      │
│                                      │
│  [Chat] [Exam Papers] <-- HERE!     │  <-- Desktop
│                                      │
│  [Subject Selector] [Logout]        │
└─────────────────────────────────────┘
│                                      │
│     Chat or Exam Papers Content     │
│                                      │
```

## Common Issues

### Issue 1: "I don't see any tabs"
**Solution:** Make sure you've completed the subject/grade selection screen first.

### Issue 2: "The page looks different"
**Solution:** Hard refresh your browser:
- **Windows/Linux:** Ctrl + Shift + R
- **Mac:** Cmd + Shift + R
- **Mobile:** Clear browser cache

### Issue 3: "I'm on mobile and can't see it"
**Solution:** Look right under your name at the top. The tabs are stacked vertically on mobile.

### Issue 4: "I see the tabs but clicking doesn't work"
**Solution:** Try:
1. Refresh the page (Ctrl+R or Cmd+R)
2. Log out and log back in
3. Clear browser cache

## What You Should See After Clicking "Exam Papers"

When you click the Exam Papers tab, you should see:

```
┌─────────────────────────────────────┐
│  NSC Exam Papers                     │
│  Browse and download past papers •   │
│  508 available                        │
├─────────────────────────────────────┤
│  [Search box]                        │
│  [Grade] [Year] [Session] filters   │
├─────────────────────────────────────┤
│  📚 Mathematics                      │
│     48 papers • Latest: 2024         │
│     ├─ Maths P1 Nov 2024 [Download] │
│     └─ Maths P2 Nov 2024 [Download] │
│                                      │
│  📚 Physical Sciences                │
│     32 papers • Latest: 2024         │
│     ├─ Physics P1 Nov 2024 [Download]│
│     └─ Physics P2 Nov 2024 [Download]│
└─────────────────────────────────────┘
```

## Still Can't See It?

1. **Check you're on the right page:**
   - URL should end with `/students` or show the student portal
   - NOT the landing page or schools page

2. **Verify you're logged in:**
   - You should see your name at the top
   - You should see "questions left today" if free user

3. **Deploy status:**
   - If you just pushed changes, wait 2-3 minutes for deployment
   - Check GitHub Actions to ensure deployment succeeded

4. **Try a different browser:**
   - Sometimes browser extensions interfere
   - Try incognito/private mode

## Quick Test

To quickly test if the feature is there:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `document.querySelector('[value="exams"]')`
4. Hit Enter
5. If it returns an element (not null), the feature is there but maybe hidden by CSS

## Need More Help?

If you still can't see it:
- Screenshot what you're seeing
- Check browser console for errors (F12 → Console)
- Verify you're on the latest deployed version
- Try logging out and back in

---

**Last Updated:** February 13, 2026
**Feature Status:** ✅ Deployed and working
