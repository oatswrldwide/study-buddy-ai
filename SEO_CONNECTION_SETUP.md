# SEO Repository Connection - Setup Complete

**Status**: ✅ Connected

---

## What Was Done

### 1. Git Remote Added
The `studybuddy-south-africa` repository has been added as a remote named `seo`:
```bash
git remote -v
# origin  https://github.com/oatswrldwide/study-buddy-ai
# seo     https://github.com/oatswrldwide/studybuddy-south-africa.git
```

### 2. Auto-Deployment Workflow Created
**File**: `.github/workflows/deploy-seo.yml`

This workflow automatically deploys SEO content to the `studybuddy-south-africa` repository when:
- You push changes to `main` branch
- Changes are made to `pseo-output/`, `pseo-output-conversion/`, or `seo-content/` folders
- You manually trigger it from GitHub Actions

---

## 🚀 Required Setup (5 minutes)

### Step 1: Create GitHub Personal Access Token (PAT)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Settings:
   - **Note**: `StudyBuddy SEO Deployment`
   - **Expiration**: 90 days (or No expiration)
   - **Scopes**: Check these boxes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
4. Click **"Generate token"**
5. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Add Token to GitHub Secrets

1. Go to: https://github.com/oatswrldwide/study-buddy-ai/settings/secrets/actions
2. Click **"New repository secret"**
3. Settings:
   - **Name**: `GH_PAT`
   - **Secret**: Paste the token from Step 1
4. Click **"Add secret"**

### Step 3: Test the Connection

```bash
# Trigger the workflow manually
git add .
git commit -m "Test SEO deployment"
git push origin main
```

Or manually trigger from: https://github.com/oatswrldwide/study-buddy-ai/actions/workflows/deploy-seo.yml

---

## 📂 What Gets Deployed

The workflow copies these folders to `studybuddy-south-africa`:
- `pseo-output/` - Subject and grade-specific landing pages
- `pseo-output-conversion/` - Pain point and comparison pages  
- `seo-content/` - Additional SEO content

---

## 🔍 How It Works

1. **Trigger**: Push to main or manual workflow dispatch
2. **Checkout**: Downloads both repositories
3. **Copy**: Syncs SEO content from study-buddy-ai to studybuddy-south-africa
4. **Commit**: Auto-commits with timestamp
5. **Push**: Deploys to studybuddy-south-africa repository

---

## 📊 Monitoring

View deployment logs at:
https://github.com/oatswrldwide/study-buddy-ai/actions/workflows/deploy-seo.yml

Each deployment includes:
- ✅ Files copied
- ✅ Commit hash
- ✅ Timestamp

---

## 🛠️ Manual Deployment (if needed)

```bash
# Clone SEO repo
git clone https://github.com/oatswrldwide/studybuddy-south-africa.git

# Copy content
cp -r pseo-output/* studybuddy-south-africa/
cp -r pseo-output-conversion/* studybuddy-south-africa/

# Push changes
cd studybuddy-south-africa
git add .
git commit -m "Manual SEO content update"
git push origin main
```

---

## ✅ Verification

After setup, check:
1. ✅ GitHub Actions runs without errors
2. ✅ Content appears in `studybuddy-south-africa` repo
3. ✅ Commit history shows auto-sync messages
4. ✅ SEO pages deploy to GitHub Pages (if enabled)

---

## 🔐 Security Notes

- **GH_PAT** secret has write access to repositories
- Token should be rotated every 90 days
- Never commit the token to the repository
- Only admins can view/edit secrets

---

## Next Steps

1. ✅ Add `GH_PAT` secret (required)
2. ✅ Test workflow by pushing a change
3. ✅ Enable GitHub Pages on `studybuddy-south-africa` (optional)
4. ✅ Configure custom domain for SEO site (optional)

---

**Last Updated**: February 10, 2026
