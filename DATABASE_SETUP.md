# 🗄️ Database Setup Instructions

## Step 1: Access Supabase SQL Editor

Go to: https://blqpyatstentjijrelns.supabase.co/project/_/sql/new

## Step 2: Run the Schema

Copy **all content** from [src/lib/schema.sql](./src/lib/schema.sql) and paste it into the SQL Editor, then click **Run**.

This will create:

### Tables
- ✅ `school_leads` - B2B lead capture with SA-specific fields (provinces, CAPS/IEB)
- ✅ `student_signups` - B2C registrations with 14-day free trial
- ✅ `chat_conversations` - AI tutoring session metadata
- ✅ `chat_messages` - Conversation history with token tracking
- ✅ `payment_proofs` - Offline payment approval workflow

### Security
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public can submit leads and signups (no auth required)
- ✅ Users can only view their own data
- ✅ Admin role can manage all data

### Performance
- ✅ Indexes on email, status, created_at for fast queries
- ✅ Foreign keys for data integrity
- ✅ Automatic updated_at triggers

## Step 3: Verify Setup

After running the schema, verify tables were created:
1. Go to Table Editor: https://blqpyatstentjijrelns.supabase.co/project/_/editor
2. You should see 5 tables listed

## Step 4: Test the Forms

1. Start dev server: `npm run dev`
2. Visit http://localhost:8080
3. Click "Get a Demo" on Schools page
4. Fill out and submit the form
5. Check Supabase Table Editor to see the new row in `school_leads` table!

## Troubleshooting

**"relation does not exist" error?**
- Make sure you ran the full SQL schema
- Check the SQL editor logs for errors

**"permission denied" error?**
- RLS policies may need adjustment
- Check that the anon key is correct in .env

**Can't see data in tables?**
- Check the Table Editor filters
- Verify RLS policies allow viewing

## Next Steps

Once the database is set up, the app is ready to:
- ✅ Capture school leads and student signups
- 🚧 AI chat interface (Gemini ready, UI to be built)
- 🚧 Admin dashboard for lead management
- 🚧 Payment approval system
