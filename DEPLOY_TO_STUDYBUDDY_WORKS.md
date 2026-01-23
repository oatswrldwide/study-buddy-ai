# Deploy to studybuddy.works

**Status**: ✅ Ready to Deploy (GitHub Pages + Firebase Backend)

---

## 🚀 Current Configuration

### Hosting Setup
- **Frontend Hosting**: GitHub Pages
- **Backend Services**: Firebase (Auth, Firestore, Storage)
- **Domain**: `studybuddy.works`
- **CNAME Records Configured**: ✅
  - Root CNAME: `/CNAME` → `oatswrldwide.github.io`
  - Public CNAME: `/public/CNAME` → `studybuddy.works`

### GitHub Pages Configuration
- **Public Directory**: `dist/` (built React app)
- **SPA Routing**: `404.html` redirects to `/index.html` (configured in Vite)
- **Workflow**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- **Deployment**: Automatic on push to `main` branch

---

## 📋 Pre-Deployment Checklist

- [x] CNAME file configured for GitHub Pages
- [x] GitHub Pages enabled in repository settings
- [x] GitHub Actions workflow configured
- [x] GitHub Secrets configured (Firebase + Gemini API keys)
- [x] Firebase backend setup (Auth, Firestore)
- [x] Build process working
- [x] SPA routing configured (404.html)
- [x] No TypeScript errors

---

## 🎯 Deployment Steps

### 1. Configure GitHub Secrets
Add the following secrets in **Settings → Secrets and variables → Actions**:
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_GEMINI_API_KEY
```

### 2. Set Firebase Console Authorization
1. Go to [Firebase Console](https://console.firebase.google.com/project/studybuddy-a045b/authentication/settings)
2. Navigate to **Authentication → Settings**
3. Add `studybuddy.works` to **Authorized domains**
4. Add `oatswrldwide.github.io` to **Authorized domains**

### 3. Commit and Push Changes
```bash
git add .
git commit -m "Deploy to GitHub Pages with Firebase backend"
git push origin main
```
This automatically triggers the GitHub Actions workflow to build and deploy to GitHub Pages.

### 4. Verify Deployment
Check the workflow status in **Actions** tab. Once complete, visit https://studybuddy.works

---

## 🔒 Pre-Flight Checks

Before pushing to main, verify:

```bash
# 1. Test local build
npm run build

# 2. Check build output exists
ls -la dist/

# 3. Verify 404.html for SPA routing
cat dist/404.html | head -20

# 4. Test build preview locally
npm run preview

# 5. Verify CNAME file
cat dist/CNAME
```

**GitHub Actions Verification**:
1. Check GitHub Secrets are configured (Settings → Secrets → Actions)
2. Verify workflow file: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
3. Check workflow permissions include `pages: write`

---

## 🌐 Domain & DNS Configuration

### GitHub Pages Setup
1. Go to repository **Settings → Pages**
2. Verify **Source** is set to "Deploy from a branch"
3. Select **Branch**: `main` / `root` (or specify `dist` folder if needed)
4. Verify **Custom domain** is set to `studybuddy.works`

### CNAME Records Configuration
At your domain registrar, add:
```
CNAME Record:
  Name: @ (or blank for root)
  Value: oatswrldwide.github.io
  TTL: 3600 (or automatic)
```

**Subdomain Example** (if needed):
```
CNAME Record:
  Name: www
  Value: oatswrldwide.github.io
```

### Verify DNS Propagation
```bash
# Check DNS propagation
nslookup studybuddy.works

# Should return: oatswrldwide.github.io
# Or use: https://mxtoolbox.com/
```

**Note**: DNS propagation can take 24–48 hours. GitHub Pages may show "Not yet" for 1-2 minutes after domain configuration.

---

## 📝 Environment Variables

### Local Development (`.env` file)
All variables are configured locally in `.env` (Git-ignored):
```dotenv
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
VITE_GEMINI_API_KEY=...
```

### GitHub Actions (Repository Secrets)
The same variables must be added as **Repository Secrets** (Settings → Secrets → Actions):
- These are automatically injected into the build environment during GitHub Actions workflow execution
- `.env` file is **never** committed to Git (in `.gitignore`)
- GitHub Secrets are encrypted and only accessible to GitHub Actions

---

## 🔄 Deployment Workflow

```bash
# 1. Make changes locally
git add .
git commit -m "Your changes"

# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Test the build preview
npm run preview

# 5. Push to main branch
git push origin main

# 6. GitHub Actions automatically:
#    - Builds the app with secrets
#    - Uploads to GitHub Pages artifact
#    - Deploys to https://studybuddy.works

# 7. Verify at studybuddy.works (2-3 min after push)
```

---

## ✅ Post-Deployment Verification

After GitHub Actions completes (2-3 minutes), verify:

1. **Site Loads**: Visit https://studybuddy.works
   - If DNS not propagated yet, visit `https://oatswrldwide.github.io`
2. **Routing Works**: Navigate between pages, refresh, go back
   - SPA routing should work (no 404 errors)
   - URL should update correctly
3. **Static Assets**: Images, styles, fonts load correctly
   - Check Network tab in DevTools (should see `dist` files)
4. **Authentication**: 
   - Try Google Sign-In
   - Verify token exchange works
   - Check browser console for auth errors
5. **Firebase Backend**: 
   - Firestore data loads
   - Cloud Storage access works
   - Console shows proper Firebase initialization
6. **Console Errors**: Check browser DevTools Console for warnings/errors

---

## 🔍 Troubleshooting

### Site Not Loading
```bash
# 1. Verify build succeeds locally
npm run build

# 2. Check GitHub Actions workflow
# Go to: Settings → Actions → General
# Verify permissions include "pages: write"

# 3. Check deployment status
# Settings → Pages → Deployments
```

### Domain Not Resolving
1. Verify CNAME file exists: `cat dist/CNAME`
2. Check DNS propagation: https://mxtoolbox.com/
3. GitHub Pages may show DNS not ready for 1-2 minutes (normal)
4. Try accessing via `https://oatswrldwide.github.io` first
5. Wait 24-48 hours for full DNS propagation

### Authentication Not Working
**Most Common Issue**: Firebase Console authorization missing

```bash
# 1. Add domains to Firebase Console
# Go to: https://console.firebase.google.com/project/studybuddy-a045b/authentication/settings
# Add BOTH:
#   - studybuddy.works
#   - oatswrldwide.github.io

# 2. Check browser console for auth errors
# DevTools → Console → Look for red errors

# 3. Verify Firebase config in src/lib/firebase.ts
cat src/lib/firebase.ts | grep config

# 4. Verify GitHub Secrets are set
# Settings → Secrets and variables → Actions → Review VITE_* variables
```

### GitHub Actions Build Fails
```bash
# 1. Check workflow logs
# Go to: Actions → Latest workflow run → build job

# 2. Common issues:
# - Missing GitHub Secrets (see step 1 of deployment steps)
# - Node cache issues: Delete .github/workflows/deploy.yml cache, re-push
# - Wrong environment variables: Verify secrets match .env exactly
```

### SPA Routes Show 404
1. Verify `dist/404.html` exists: `ls -la dist/404.html`
2. Check Vite config includes 404.html copy:
   ```bash
   grep -A 5 "404.html" vite.config.ts
   ```
3. Rebuild: `npm run build`

### Performance Issues
1. Check bundle size: `npm run build` (outputs bundle stats)
2. Use DevTools → Network tab (filter by JS/CSS)
3. Use DevTools → Performance tab to profile loading
4. Check for unused dependencies: `npm ls --depth=0`

---

## 🚀 Quick Deploy Commands

```bash
# Test build locally
npm run build && npm run preview

# Push to deploy (GitHub Actions handles the rest)
git add . && git commit -m "Deploy changes" && git push origin main

# Check deployment status
# Go to: Repository → Actions → Latest workflow run
```

---

## 📞 Support & Resources

### GitHub Pages
- **GitHub Pages Settings**: https://github.com/oatswrldwide/study-buddy-ai/settings/pages
- **GitHub Actions Logs**: https://github.com/oatswrldwide/study-buddy-ai/actions
- **GitHub Pages Docs**: https://docs.github.com/en/pages

### Firebase Backend
- **Firebase Console**: https://console.firebase.google.com/project/studybuddy-a045b
- **Firebase Auth Settings**: https://console.firebase.google.com/project/studybuddy-a045b/authentication/settings
- **Firebase Docs**: https://firebase.google.com/docs

### Domain & DNS
- **Domain Registrar**: Check your registrar for CNAME management
- **DNS Propagation Check**: https://mxtoolbox.com/
- **GitHub Pages Domain Guide**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-pages-site

---

## ✨ Deployment Checklist Summary

- [ ] Step 1: Configure GitHub Secrets (8 Firebase + Gemini variables)
- [ ] Step 2: Add `studybuddy.works` to Firebase Console Authorized domains
- [ ] Step 3: Add `oatswrldwide.github.io` to Firebase Console Authorized domains
- [ ] Step 4: Update DNS CNAME to point to `oatswrldwide.github.io`
- [ ] Step 5: Commit and push changes to main
- [ ] Step 6: Verify GitHub Actions workflow runs successfully
- [ ] Step 7: Check site loads at https://studybuddy.works
- [ ] Step 8: Test authentication flow
- [ ] Step 9: Verify Firebase backend functions (Firestore, auth)
- [ ] Step 10: Monitor browser console for errors

**Next Step**: Go to repository Settings → Secrets → Actions and add the GitHub Secrets! 🚀
