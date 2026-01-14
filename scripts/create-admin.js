#!/usr/bin/env node

/**
 * Script to create an admin user for StudyBuddy AI
 * 
 * Usage:
 * 1. Download service account key from Firebase Console
 * 2. Save it as serviceAccountKey.json
 * 3. Run: node scripts/create-admin.js
 */

const readline = require('readline');

// Check if service account key exists
let serviceAccount;
try {
  serviceAccount = require('../serviceAccountKey.json');
} catch (error) {
  console.error('\n❌ Error: serviceAccountKey.json not found!');
  console.error('\nTo get your service account key:');
  console.error('1. Go to: https://console.firebase.google.com/project/studybuddy-a045b/settings/serviceaccounts/adminsdk');
  console.error('2. Click "Generate new private key"');
  console.error('3. Save the file as "serviceAccountKey.json" in the project root');
  console.error('4. Run this script again\n');
  process.exit(1);
}

const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  console.log('\n🔐 StudyBuddy AI - Create Admin User\n');
  console.log('═'.repeat(50));
  
  try {
    // Get user input
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password (min 6 chars): ');
    const name = await question('Enter admin name (optional): ') || 'Admin User';

    if (!email || !password) {
      console.error('\n❌ Email and password are required!');
      rl.close();
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('\n❌ Password must be at least 6 characters!');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Creating admin user...\n');

    // Create user
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      emailVerified: true,
      displayName: name
    });

    console.log('✅ User created:', userRecord.uid);

    // Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });
    console.log('✅ Custom claims set (role: admin)');

    // Create Firestore document
    await admin.firestore().collection('admin_users').doc(userRecord.uid).set({
      email: email,
      name: name,
      role: 'admin',
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      permissions: ['all']
    });

    console.log('✅ Firestore document created');
    
    console.log('\n' + '═'.repeat(50));
    console.log('🎉 Admin user created successfully!');
    console.log('═'.repeat(50));
    console.log('\n📧 Email:', email);
    console.log('👤 Name:', name);
    console.log('🆔 UID:', userRecord.uid);
    console.log('\n🌐 Sign in at: https://studybuddy-a045b.web.app/login');
    console.log('📊 Admin dashboard: https://studybuddy-a045b.web.app/admin/dashboard\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.code === 'auth/email-already-exists') {
      console.error('\n💡 This email is already registered. Try signing in or use a different email.');
    }
  } finally {
    rl.close();
    process.exit();
  }
}

// Run the script
createAdmin();
