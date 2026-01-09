# Database Scripts

This directory contains utility scripts for managing the StudyBuddy AI database.

## Apply RLS Policies Fix

Automatically applies the RLS (Row Level Security) policies to your Supabase database.

### Prerequisites

You need the **service_role key** from your Supabase project:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the `service_role` key (not the `anon` key)

### Usage

```bash
# Set the service key as an environment variable
export SUPABASE_SERVICE_KEY="your-service-role-key-here"

# Run the script
bun run fix:rls
```

Or in one command:

```bash
SUPABASE_SERVICE_KEY="your-key" bun run fix:rls
```

### What It Does

The script will:

1. ✅ Drop all existing RLS policies (clean slate)
2. ✅ Enable RLS on all tables
3. ✅ Create new, simplified policies for:
   - School leads (public insert, admin view/update)
   - Student signups (public insert, self-view, admin manage)
   - Chat conversations (user-owned, school-visible, admin access)
   - Chat messages (user-owned, school-visible, admin access)
   - Payment proofs (user-owned, admin approve)
4. ✅ Verify policies were created successfully

### Troubleshooting

If the script fails, you can apply the fix manually:

1. Open the [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql/new)
2. Copy the entire contents of `src/lib/fix-rls-policies.sql`
3. Paste into the SQL Editor
4. Click **Run**

### Security Note

⚠️ **Never commit your service_role key to git!**

The service_role key has full database access and should be kept secret. Use it only for administrative tasks and never expose it in your frontend code.
