const admin = require('firebase-admin');

// Initialize Firebase
admin.initializeApp({
  projectId: 'studybuddy-a045b'
});

const uid = 'fEVXlsDhDeTrhgOwMtm9sSxGTy62';
const email = 'ongezile.mqokeli@gmail.com';

async function setAdminClaims() {
  try {
    console.log('Setting custom claims for user:', email);
    
    await admin.auth().setCustomUserClaims(uid, { role: 'admin' });
    console.log('✅ Custom claims set successfully!');
    console.log('✅ User is now an admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setAdminClaims();
