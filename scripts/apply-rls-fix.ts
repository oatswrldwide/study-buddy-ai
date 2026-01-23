#!/usr/bin/env node
/**
 * Apply RLS Policy Fix Script
 * 
 * This script automatically applies the RLS policies fix to your Supabase database.
 * 
 * Usage:
 *   npm run fix:rls
 * 
 * Or with environment variables:
 *   SUPABASE_URL=https://your-project.supabase.co SUPABASE_SERVICE_KEY=your-service-key npm run fix:rls
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SUPABASE_URL = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL) as string | undefined;
const SUPABASE_SERVICE_KEY = (process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_SERVICE_KEY) as string | undefined;

if (!SUPABASE_URL) {
  console.error('❌ Error: SUPABASE_URL or VITE_SUPABASE_URL environment variable is required');
  process.exit(1);
}

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: SUPABASE_SERVICE_KEY environment variable is required');
  console.error('');
  console.error('This is the service_role key from your Supabase project settings.');
  console.error('Find it at: https://supabase.com/dashboard/project/_/settings/api');
  console.error('');
  console.error('Usage:');
  console.error('  SUPABASE_SERVICE_KEY=your-key bun run scripts/apply-rls-fix.ts');
  process.exit(1);
}

async function applySqlFile(sqlFilePath: string) {
  console.log('🔧 Reading SQL file:', sqlFilePath);
  
  const sqlContent = readFileSync(sqlFilePath, 'utf-8');
  
  console.log('📡 Connecting to Supabase...');
  console.log('   URL:', SUPABASE_URL);
  
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_SERVICE_KEY!,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
    } as Record<string, string>,
    body: JSON.stringify({ query: sqlContent })
  });

  if (!response.ok) {
    // Try alternative method using the PostgREST query parameter
    console.log('⚠️  First method failed, trying direct SQL execution...');
    
    const queries = sqlContent
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));
    
    console.log(`📝 Executing ${queries.length} SQL statements...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i] + ';';
      
      if (query.toLowerCase().includes('select') && 
          (query.toLowerCase().includes('from pg_policies') || 
           query.toLowerCase().includes('information_schema'))) {
        console.log(`⏭️  Skipping verification query ${i + 1}/${queries.length}`);
        continue;
      }
      
      try {
        const execResponse = await fetch(`${SUPABASE_URL}/rest/v1/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY!,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
            'Prefer': 'return=minimal'
          } as Record<string, string>,
          body: JSON.stringify({ query })
        });
        
        if (execResponse.ok || execResponse.status === 204) {
          successCount++;
          console.log(`✅ Statement ${i + 1}/${queries.length} executed successfully`);
        } else {
          const errorText = await execResponse.text();
          // Ignore "already exists" errors for idempotency
          if (errorText.includes('already exists') || errorText.includes('does not exist')) {
            console.log(`⚠️  Statement ${i + 1}/${queries.length}: ${errorText.substring(0, 100)}`);
            successCount++;
          } else {
            console.error(`❌ Statement ${i + 1}/${queries.length} failed:`, errorText.substring(0, 200));
            errorCount++;
          }
        }
      } catch (error: any) {
        console.error(`❌ Statement ${i + 1}/${queries.length} error:`, error.message);
        errorCount++;
      }
    }
    
    console.log('');
    console.log('📊 Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    
    if (errorCount === 0) {
      console.log('');
      console.log('🎉 RLS policies fix applied successfully!');
      return true;
    } else {
      console.log('');
      console.log('⚠️  Some statements failed. Please review the errors above.');
      console.log('💡 Tip: You can also copy the SQL file content and paste it directly into');
      console.log('   Supabase SQL Editor at:');
      console.log(`   ${SUPABASE_URL!.replace('https://', 'https://supabase.com/dashboard/project/')}/sql`);
      return false;
    }
  }
  
  const data = await response.json();
  console.log('✅ SQL executed successfully!');
  console.log('');
  console.log('📊 Result:', data);
  return true;
}

async function verifyPolicies() {
  console.log('');
  console.log('🔍 Verifying RLS policies...');
  
  const query = `
    SELECT 
      tablename,
      policyname,
      permissive,
      roles,
      cmd
    FROM pg_policies 
    WHERE schemaname = 'public'
      AND tablename IN ('school_leads', 'student_signups', 'chat_conversations', 'chat_messages', 'payment_proofs')
    ORDER BY tablename, policyname;
  `;
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY!,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      } as Record<string, string>,
      body: JSON.stringify({ query })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('');
      console.log('📋 Created RLS Policies:');
      console.table(data);
    } else {
      console.log('⚠️  Could not verify policies automatically.');
      console.log('   Please verify manually in Supabase dashboard.');
    }
  } catch (error: any) {
    console.log('⚠️  Verification skipped:', error.message);
  }
}

async function main() {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         StudyBuddy AI - RLS Policies Fix Script           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  
  const sqlFilePath = join(__dirname, '..', 'src/lib/fix-rls-policies.sql');
  
  try {
    const success = await applySqlFile(sqlFilePath);
    
    if (success) {
      await verifyPolicies();
      
      console.log('');
      console.log('✨ All done! Your RLS policies have been updated.');
      console.log('');
      console.log('Next steps:');
      console.log('  1. Test authentication in your app');
      console.log('  2. Verify users can access their own data');
      console.log('  3. Verify schools can see their students\' chats');
      console.log('  4. Verify admins have full access');
      console.log('');
      process.exit(0);
    } else {
      console.log('');
      console.log('🔧 Manual application required:');
      console.log('   1. Open: https://supabase.com/dashboard/project/_/sql/new');
      console.log('   2. Copy contents from: src/lib/fix-rls-policies.sql');
      console.log('   3. Paste and click "Run"');
      console.log('');
      process.exit(1);
    }
  } catch (error: any) {
    console.error('');
    console.error('❌ Error applying SQL fix:', error.message);
    console.error('');
    console.error('🔧 Please apply manually:');
    console.error('   1. Open Supabase SQL Editor:');
    console.error(`      ${SUPABASE_URL!.replace('https://', 'https://supabase.com/dashboard/project/')}/sql`);
    console.error('   2. Copy contents from: src/lib/fix-rls-policies.sql');
    console.error('   3. Paste and click "Run"');
    console.error('');
    process.exit(1);
  }
}

main();
