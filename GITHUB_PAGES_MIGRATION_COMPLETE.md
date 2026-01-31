# GitHub Pages + Firebase Backend Migration

**Status**: ✅ Implementation Complete

---

## 📦 What Was Updated

### 1. GitHub Actions Workflow
**File**: `.github/workflows/deploy.yml`
- Switched from Supabase to Firebase environment variables
- Added 8 Firebase secrets to build environment
- Automatic deployment on `main` push

**Required Secrets** (add to GitHub Settings → Secrets → Actions):
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_OPENROUTER_API_KEY
```

### 2. Deployment Guide Updated
**File**: `DEPLOY_TO_STUDYBUDDY_WORKS.md`
- Complete rewrite for GitHub Pages hosting
- Firebase backend integration steps
- DNS/CNAME configuration
- Troubleshooting guide

### 3. Current Setup
- **Frontend**: GitHub Pages (free)
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Domain**: studybuddy.works (CNAME → oatswrldwide.github.io)
- **Deployment**: Automatic on git push

---

## 🚀 Immediate Action Items

### Step 1: Add GitHub Secrets (5 min)
Go to: `https://github.com/oatswrldwide/study-buddy-ai/settings/secrets/actions`

Add these 8 secrets with values from `.env`:
```
VITE_FIREBASE_API_KEY = AIzaSyDH-e0msObVOA7ObibMSA4QoPWvz3rR2l0
VITE_FIREBASE_AUTH_DOMAIN = studybuddy-a045b.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = studybuddy-a045b
VITE_FIREBASE_STORAGE_BUCKET = studybuddy-a045b.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 588704939341
VITE_FIREBASE_APP_ID = 1:588704939341:web:12f72cbd8ff111835dcb04
VITE_FIREBASE_MEASUREMENT_ID = G-FJMTH74WZW
VITE_OPENROUTER_API_KEY = [YOUR_OPENROUTER_API_KEY]
```

### Step 2: Authorize Firebase Domains (5 min)
Go to: `https://console.firebase.google.com/project/studybuddy-a045b/authentication/settings`

Under **Authorized domains**, add:
- ✅ `studybuddy.works`
- ✅ `oatswrldwide.github.io`

### Step 3: Update DNS at Domain Registrar (5 min)

**For Root Domain (studybuddy.works)**

Option A: CNAME (Recommended)
```
Type: CNAME
Name: @ (or leave blank)
Value: oatswrldwide.github.io
TTL: 3600
```

Option B: A Records (Alternative)
```
Type: A
Name: @ (or leave blank)
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
TTL: 3600 (or lower to 300 for faster updates during setup)
```

**TTL Recommendations**:
- **During Setup**: TTL: 300 (5 min) - Changes propagate faster
- **After Verification**: TTL: 3600 (1 hour) or higher - Reduces DNS queries
- **Production**: TTL: 86400 (24 hours) - Most efficient

**For www Subdomain (www.studybuddy.works) - REQUIRED**
```
Type: CNAME
Name: www
Value: oatswrldwide.github.io
TTL: 3600
```

⚠️ **Important**: You MUST add the www CNAME record. GitHub Pages requires it.

**Verify DNS After Changes**
```bash
# Check root domain
nslookup studybuddy.works
# Should show: oatswrldwide.github.io or A records

# Check www subdomain
nslookup www.studybuddy.works
# Should show: oatswrldwide.github.io
```

**Common Issues**:
- ❌ `www.studybuddy.works` shows "Domain's DNS record could not be retrieved" → missing www CNAME record
- ❌ TTL too high → changes take longer to propagate
- ✅ Add BOTH root (@) and www records for full coverage

⏱️ DNS propagation: 5 min to 48 hours (usually 15-30 min)

### Step 4: Verify GitHub Pages is Enabled (2 min)
Go to: `https://github.com/oatswrldwide/study-buddy-ai/settings/pages`

**Configure GitHub Pages**:
1. **Source**: 
   - Change from "Deploy from a branch" to **"GitHub Actions"**
   - (Our workflow uses the `actions/deploy-pages@v4` action, which requires this setting)

2. **Custom domain** (optional): 
   - If you want to use `studybuddy.works`, add it here
   - Otherwise, site will be at `oatswrldwide.github.io`

3. **Click Save**

4. **Wait 1-2 minutes** for GitHub Pages to initialize

5. **Verify site loads**:
   - Visit: `https://oatswrldwide.github.io`
   - Or: `https://studybuddy.works` (if custom domain configured)

⚠️ **CRITICAL**: You MUST set Source to "GitHub Actions" (not "Deploy from a branch")

---

## 🔄 Workflow After Setup

```bash
# 1. Make changes
git add .
git commit -m "Your changes"

# 2. Push to main
git push origin main

# 3. GitHub Actions automatically:
#    - Builds app (2 min)
#    - Deploys to GitHub Pages (1 min)
#    - Available at studybuddy.works (or oatswrldwide.github.io if DNS not ready)
```

Monitor deployment: **Repository → Actions → Latest workflow**

---

## ✅ Verification Checklist

After setup is complete, verify each item:

- [ ] GitHub Actions workflow passes on next push
- [ ] Site loads at `https://oatswrldwide.github.io`
- [ ] DNS updated (test: `nslookup studybuddy.works` → should resolve)
- [ ] Site loads at `https://studybuddy.works` (after DNS propagates)
- [ ] Google Sign-In works (Firebase auth domains authorized)
- [ ] Firestore data loads (backend connected)
- [ ] SPA routing works (navigate between pages)
- [ ] No console errors in DevTools

---

## 🆘 Troubleshooting

**"DNS Check in Progress" Stuck/Looping After Successful Check**
- ❌ **Cause**: GitHub Pages DNS verification is stuck in a loop
- ✅ **Fix**:

**Method 1: Force DNS Verification to Complete (For studybuddy.works)**
1. Go to: https://github.com/oatswrldwide/study-buddy-ai/settings/pages
2. Under Custom domain, click **Remove** (X button)
3. **Wait 5 minutes** (important - clears GitHub's cache)
4. **Re-add the custom domain**: Type `studybuddy.works`
5. Click **Save**
6. **Wait 15-30 minutes** for full DNS verification
7. Refresh the GitHub Pages settings page - should show green checkmark
8. Visit: `https://studybuddy.works`

**If still stuck after 30 minutes**:
1. Check DNS is correct:
   ```bash
   # Root domain should return GitHub A records
   getent hosts studybuddy.works
   # www should return oatswrldwide.github.io
   getent hosts www.studybuddy.works
   ```
2. If DNS is correct, try:
   - Remove custom domain again
   - Wait 10 minutes
   - Delete BOTH CNAME files temporarily:
     ```bash
     rm public/CNAME CNAME
     git commit -am "Remove CNAME temporarily"
     git push origin main
     ```
   - Wait for deployment (2-3 min)
   - Verify site works at `oatswrldwide.github.io`
   - Re-add CNAME files:
     ```bash
     echo "studybuddy.works" > public/CNAME
     git commit -am "Re-add CNAME for custom domain"
     git push origin main
     ```
   - Re-add custom domain in GitHub Pages settings
   - Wait 15-30 minutes

**Method 2: Wait It Out (Simplest)**
- DNS check can take 10-60 minutes (sometimes longer)
- Site might be accessible at `https://studybuddy.works` even while DNS check shows "In Progress"
- Try visiting: `https://studybuddy.works` directly (ignore GitHub's DNS check status)
- Check back in 1 hour

**Why this happens**: GitHub's DNS verification sometimes gets stuck even when DNS is correctly configured. The remove/wait/re-add cycle usually fixes it by clearing GitHub's internal cache.

---

**DNS Error: "Domain does not resolve to the GitHub Pages server" (NotServedByPagesError)**
- ❌ **Cause**: DNS correct but GitHub Pages hasn't verified it yet OR deployment needed
- ✅ **Fix Steps**:

**Quick Verification (Run these commands):**
```bash
# Check DNS resolution
getent hosts studybuddy.works
# Should show: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153

getent hosts www.studybuddy.works
# Should show: oatswrldwide.github.io (or IPv6 addresses)

# Check CNAME file exists in build
cat dist/CNAME
# Should show: studybuddy.works
```

**If DNS and CNAME are correct** ✅

1. **Trigger a fresh deployment** (GitHub Pages needs to detect DNS):
   ```bash
   # Make a trivial change and push
   git commit --allow-empty -m "Trigger GitHub Pages deployment"
   git push origin main
   ```
   - Wait 2-3 minutes for workflow to complete
   - Check: Repository → Actions → Latest workflow

2. **If still showing error after deployment**:
   - Go to: https://github.com/oatswrldwide/study-buddy-ai/settings/pages
   - Remove custom domain (click X)
   - Wait 2 minutes
   - Re-add: `studybuddy.works`
   - Wait 10-15 minutes for GitHub's DNS verification

3. **Verify DNS propagation globally**:
   - Use: https://mxtoolbox.com/SuperTool.aspx
   - Check both `studybuddy.works` and `www.studybuddy.works`
   - Should show GitHub Pages IPs/CNAME

**If DNS is INCORRECT** ❌

At your domain registrar, ensure you have:
```
Root domain:
  Type: A
  Name: @ (or blank)
  Values: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  
www subdomain:
  Type: CNAME
  Name: www
  Value: oatswrldwide.github.io
```

**Common Issues**:
- ❌ Old Firebase DNS records still active → Delete them
- ❌ DNS records correct but added < 30 min ago → Wait longer
- ❌ GitHub Pages custom domain removed → Re-add it
- ❌ CNAME file missing from deployment → Verify `dist/CNAME` exists after build

---

**DNS Error: "Domain's DNS record could not be retrieved" for www.studybuddy.works**
- ❌ **Cause**: Missing CNAME record OR DNS just propagated and GitHub hasn't refreshed yet
- ✅ **Fix Options**:

**Option 1: Verify DNS Record Exists**
```
Type: CNAME
Name: www
Value: oatswrldwide.github.io
TTL: 300-3600
```

**Option 2: If DNS Already Exists (Check with command)**
```bash
# Check if www resolves (Linux/Mac)
getent hosts www.studybuddy.works
# Should show: oatswrldwide.github.io

# Or use online tool: https://mxtoolbox.com/SuperTool.aspx?action=cname%3awww.studybuddy.works
```

**If www DNS resolves correctly but GitHub still shows error**:
1. **Wait 15-30 minutes** - GitHub Pages DNS check cache may be stale
2. **Remove and re-add custom domain** in GitHub Pages settings:
   - Settings → Pages → Custom domain → Click X to remove
   - Wait 2 minutes
   - Re-add: studybuddy.works
   - Save and wait 5-10 minutes
3. **Check again** - Should now detect www subdomain correctly

**If www DNS does NOT resolve**:
- Add/update the CNAME record at your domain registrar
- Wait 5-30 minutes for propagation
- Verify again with: `getent hosts www.studybuddy.works`

**GitHub Actions Workflow Fails**
- Check missing secrets: Settings → Secrets → Actions
- Verify 8 Firebase secrets are added (see Step 1 above)
- Workflow logs: Actions → Latest run → build job

**Browser Console Error: "Firebase configuration is missing" or "auth/invalid-api-key"**
- ❌ **Cause**: GitHub Secrets not configured, so the deployed build has NO Firebase environment variables
- ✅ **Fix**: This is CRITICAL - you MUST add GitHub Secrets for the site to work!

**This is your current issue!** Follow these steps:

1. **Add ALL 8 GitHub Secrets** (Go to: https://github.com/oatswrldwide/study-buddy-ai/settings/secrets/actions)
   
   Click **"New repository secret"** for EACH of these:
   
   ```
   Name: VITE_FIREBASE_API_KEY
   Secret: AIzaSyDH-e0msObVOA7ObibMSA4QoPWvz3rR2l0
   
   Name: VITE_FIREBASE_AUTH_DOMAIN
   Secret: studybuddy-a045b.firebaseapp.com
   
   Name: VITE_FIREBASE_PROJECT_ID
   Secret: studybuddy-a045b
   
   Name: VITE_FIREBASE_STORAGE_BUCKET
   Secret: studybuddy-a045b.firebasestorage.app
   
   Name: VITE_FIREBASE_MESSAGING_SENDER_ID
   Secret: 588704939341
   
   Name: VITE_FIREBASE_APP_ID
   Secret: 1:588704939341:web:12f72cbd8ff111835dcb04
   
   Name: VITE_FIREBASE_MEASUREMENT_ID
   Secret: G-FJMTH74WZW
   
   Name: VITE_OPENROUTER_API_KEY
   Secret: [YOUR_OPENROUTER_API_KEY]
   ```

2. **Trigger a NEW deployment** (secrets are only used during build):
   ```bash
   git commit --allow-empty -m "Rebuild with Firebase secrets"
   git push origin main
   ```

3. **Wait 2-3 minutes** for GitHub Actions to complete:
   - Monitor: https://github.com/oatswrldwide/study-buddy-ai/actions

4. **Clear browser cache** and reload `https://studybuddy.works`:
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

5. **Verify in console**:
   - Should see: "✅ Firebase initialized successfully" (NO other Firebase errors)
   - No "auth/invalid-api-key" errors

**Why this happens**: The current deployed build was created WITHOUT the GitHub Secrets, so it has no Firebase config. Adding secrets and redeploying fixes this permanently.

**Auth Not Working** 
- Firebase Console must have `studybuddy.works` + `oatswrldwide.github.io` in authorized domains
- Check browser console for auth errors
- Clear cookies/cache and retry

**Domain Not Resolving (Both Root & www)**
- DNS propagation takes up to 48 hours
- Test with: `nslookup studybuddy.works` or https://mxtoolbox.com/
- Use `oatswrldwide.github.io` in the meantime
- Verify BOTH records exist (root @ and www)

**404 on SPA Routes**
- Verify `dist/404.html` exists after build
- This file redirects routes back to index.html (already configured in Vite)

---

## 📚 Documentation Files

- **Deployment Guide**: `DEPLOY_TO_STUDYBUDDY_WORKS.md`
- **Workflow**: `.github/workflows/deploy.yml`
- **Config**: `vite.config.ts`

---

**Next**: Go add the GitHub Secrets! Once all 4 steps complete, the site will auto-deploy. 🚀
