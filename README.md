# StudyBuddy AI - CAPS-Aligned AI Tutor Platform

[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/badge/Build-Passing-green)](https://github.com)

**AI-powered tutoring platform for South African learners (Grades 8-12)** - Using Google's Gemini AI and aligned with CAPS curriculum.

## 🚀 Recent Update: Firebase Migration Complete!

This project has been successfully migrated from Supabase to Firebase (January 2026).  
See [MIGRATION_COMPLETE.md](MIGRATION_COMPLETE.md) for full details.

## 📋 Quick Links

- **Migration Guide**: [FIREBASE_MIGRATION.md](FIREBASE_MIGRATION.md)
- **Quick Reference**: [FIREBASE_QUICKREF.md](FIREBASE_QUICKREF.md)
- **Live Demo**: [studybuddy-ai.web.app](#) *(Coming Soon)*

---

## Features

### For Students 🎓
- **AI Tutor**: Socratic method teaching with Gemini AI
- **CAPS Aligned**: South African curriculum (Grades 8-12)
- **Subjects**: Mathematics, Physical Sciences, Life Sciences
- **7-Day Free Trial**: No payment required upfront

### For Schools 🏫
- **Analytics Dashboard**: Track student engagement
- **At-Risk Detection**: Identify struggling students
- **Multi-Student Management**: Monitor entire classes
- **Custom Pricing**: Volume discounts available

### For Parents 👨‍👩‍👧
- **Progress Monitoring**: View child's learning activity
- **Usage Reports**: Sessions, subjects, time spent
- **Safety**: Moderated AI responses, privacy-first

### For Admins ⚙️
- **Lead Management**: School inquiries & follow-ups
- **Student Management**: Approve signups, handle payments
- **Payment Verification**: Manual payment proof review
- **Analytics**: Platform-wide usage statistics

---

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS + shadcn/ui components
- React Router for navigation

**Backend:**
- Firebase Authentication (Email/Password)
- Cloud Firestore (NoSQL database)
- Firebase Storage (Payment proof images)
- Firebase Hosting (Deployment)

**AI:**
- Google Gemini AI (Generative AI)
- Custom prompts for Socratic teaching

---

## Getting Started

### Prerequisites

- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm))
- Firebase account ([create here](https://console.firebase.google.com/))
- Gemini API key ([get here](https://ai.google.dev/))

### Installation

```sh
# Clone the repository
git clone https://github.com/oatswrldwide/study-buddy-ai.git
cd study-buddy-ai

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your Firebase and Gemini credentials

# Start development server
npm run dev
```

Visit `http://localhost:5173`

---

## Environment Variables

Create a `.env` file with:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key
```

See [.env.example](.env.example) for full template.

---

## Firebase Setup

**1. Create Firebase Project**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize project
firebase init
```

**2. Enable Services**
- Authentication → Email/Password
- Firestore Database → Production mode
- Storage → Production mode (optional)

**3. Deploy Security Rules**
```bash
firebase deploy --only firestore:rules
```

**4. Create Admin User**
- Go to Authentication → Add User
- Copy UID and create document in `admin_users` collection

See [FIREBASE_MIGRATION.md](FIREBASE_MIGRATION.md) for detailed instructions.

---

## Deployment

### Option 1: Firebase Hosting (Recommended)

```bash
npm run build
firebase deploy --only hosting
```

### Option 2: GitHub Pages

```bash
npm run deploy
```

---

## Project Structure

```
study-buddy-ai/
├── src/
│   ├── components/        # React components
│   ├── contexts/          # Auth context
│   ├── lib/              # Firebase, Gemini config
│   ├── pages/            # Route pages
│   └── main.tsx          # Entry point
├── firestore.rules       # Security rules
├── firebase.json         # Firebase config
└── package.json
```

---

## License

This project is private and proprietary. All rights reserved.

---

## Support

- **Email**: support@studybuddy.co.za
- **Docs**: [FIREBASE_MIGRATION.md](FIREBASE_MIGRATION.md)

---

**Built with ❤️ for South African learners**

