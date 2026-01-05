# 🔧 Fixing Supabase Connection

## Issue
The anon key format appears incorrect. You need the full JWT token from Supabase.

## How to Get the Correct Anon Key

1. **Go to Supabase Settings:**
   https://blqpyatstentjijrelns.supabase.co/project/_/settings/api

2. **Look for "Project API keys" section**

3. **Copy the `anon` `public` key** (the long JWT token)
   - It should start with: `eyJhbGc...`
   - It should be around 200+ characters long
   - It should have THREE parts separated by dots (.)
   - Example format: `eyJhbGc....eyJpc3M....signature_part`

4. **NOT the "Project URL" or "Project Reference ID"**

## Update Your .env File

Replace the VITE_SUPABASE_ANON_KEY line with the correct key:

```bash
VITE_SUPABASE_URL=https://blqpyatstentjijrelns.supabase.co
VITE_SUPABASE_ANON_KEY=<paste_the_full_anon_public_key_here>
VITE_GEMINI_API_KEY=AIzaSyB7sYJ4UhpUbwS7g7cLmaRAftzR4349lHM
```

## Then Restart Dev Server

```bash
# Stop the server (Ctrl+C if running)
# Then restart:
npm run dev
```

## Test Again

Once you've updated the key:
1. Go to http://localhost:8081/schools
2. Click "Get a Demo"
3. Fill out and submit the form
4. Check browser console (F12) for any errors
5. Check Supabase Table Editor for the new row

## How to Verify It's Working

The form should:
- Show loading state while submitting
- Show success message after submission
- Add a row to the `school_leads` table in Supabase

If you see an error in the console, share it with me!
