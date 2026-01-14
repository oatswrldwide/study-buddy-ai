# Firebase Quick Reference

## Environment Setup

```bash
# Required environment variables (.env file)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GEMINI_API_KEY=
```

## Common Firebase Operations

### Authentication
```typescript
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign in
await signInWithEmailAndPassword(auth, email, password);

// Sign out
await signOut(auth);

// Get current user
const user = auth.currentUser;

// Get custom claims
const idTokenResult = await user?.getIdTokenResult();
const role = idTokenResult?.claims.role;
```

### Firestore Queries

```typescript
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

// Read all documents
const snapshot = await getDocs(collection(db, "students"));
const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

// Query with filter
const q = query(collection(db, "students"), where("grade", "==", 10));
const snapshot = await getDocs(q);

// Add document
await addDoc(collection(db, "students"), { name: "John", grade: 10 });

// Update document
await updateDoc(doc(db, "students", "doc-id"), { grade: 11 });

// Delete document
await deleteDoc(doc(db, "students", "doc-id"));
```

### Timestamps
```typescript
import { serverTimestamp } from "firebase/firestore";

// Add server timestamp
await addDoc(collection(db, "students"), {
  name: "John",
  created_at: serverTimestamp()
});

// Read timestamp
const createdAt = doc.data().created_at?.toDate(); // Convert to JS Date
```

## Firebase CLI Commands

```bash
# Login
firebase login

# Initialize project
firebase init

# Deploy rules
firebase deploy --only firestore:rules

# Deploy hosting
firebase deploy --only hosting

# Deploy everything
firebase deploy

# View logs
firebase functions:log
```

## Setting Custom Claims (Admin SDK)

```javascript
// Cloud Function or Admin SDK script
const admin = require('firebase-admin');

// Set user role
await admin.auth().setCustomUserClaims(userId, { role: 'admin' });

// Verify
const user = await admin.auth().getUser(userId);
console.log(user.customClaims); // { role: 'admin' }
```

## Migration from Supabase Patterns

| Supabase | Firebase |
|----------|----------|
| `supabase.from("table").select()` | `getDocs(collection(db, "table"))` |
| `.eq("field", value)` | `where("field", "==", value)` |
| `.in("field", [values])` | Load all & filter (no direct equivalent) |
| `.order("field", { ascending: false })` | `orderBy("field", "desc")` |
| `.single()` | `getDoc(doc(db, "table", "id"))` |
| `.insert({ data })` | `addDoc(collection(db, "table"), data)` |
| `.update({ data }).eq("id", id)` | `updateDoc(doc(db, "table", id), data)` |

## Security Rules Examples

```javascript
// Public read, auth write
match /collection/{docId} {
  allow read: if true;
  allow write: if request.auth != null;
}

// Owner only
match /collection/{docId} {
  allow read, write: if request.auth.uid == docId;
}

// Admin only
match /collection/{docId} {
  allow read, write: if request.auth.token.role == 'admin';
}

// Public write, admin read
match /leads/{leadId} {
  allow create: if true;
  allow read, update: if request.auth.token.role == 'admin';
}
```

## Useful Links

- Firebase Console: https://console.firebase.google.com/
- Firestore Rules Reference: https://firebase.google.com/docs/firestore/security/rules-structure
- Auth Custom Claims: https://firebase.google.com/docs/auth/admin/custom-claims
- Pricing Calculator: https://firebase.google.com/pricing

## Troubleshooting

**Problem**: Permission denied
- Check Firestore rules in Firebase Console
- Verify user is authenticated: `console.log(auth.currentUser)`
- Deploy latest rules: `firebase deploy --only firestore:rules`

**Problem**: Query returns empty
- Check collection name (case-sensitive)
- Verify data exists in Firebase Console
- Check where() conditions match field types

**Problem**: Slow queries
- Add indexes (Firebase Console will suggest)
- Reduce data fetched (use limit())
- Consider denormalization

**Problem**: Auth state not persisting
- Check Firebase config is correct
- Clear browser localStorage
- Verify API key has correct permissions
