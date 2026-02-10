# Deploy SEO Content to studybuddy.works - Quick Guide

The SEO content is ready to deploy! Follow these simple steps:

## Option 1: Run the Automated Script (Recommended)

```bash
./quick-deploy-seo.sh
```

## Option 2: Manual Deployment (5 minutes)

### Step 1: Clone the SEO Repository

```bash
cd /tmp
git clone git@github.com:oatswrldwide/studybuddy-south-africa.git
cd studybuddy-south-africa
```

### Step 2: Copy SEO Content

```bash
cp -r /workspaces/study-buddy-ai/pseo-output/* ./ 
cp -r /workspaces/study-buddy-ai/pseo-output-conversion/* ./
```

### Step 3: Add Custom Domain

```bash
echo "studybuddy.works" > CNAME
```

### Step 4: Commit and Push

```bash
git add .
git commit -m "Deploy SEO content to studybuddy.works"
git push origin main
```

## Option 3: Enable GitHub Actions Auto-Deployment

1. Create a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo`, `workflow`
   - Copy the token

2. Add token to repository secrets:
   - Go to: https://github.com/oatswrldwide/study-buddy-ai/settings/secrets/actions
   - Click "New repository secret"
   - Name: `GH_PAT`
   - Value: (paste your token)

3. The workflow will auto-deploy on every push to main!

## Enable GitHub Pages on studybuddy-south-africa

1. Go to: https://github.com/oatswrldwide/studybuddy-south-africa/settings/pages
2. Source: Deploy from a branch
3. Branch: `main` / `root`
4. Custom domain: `studybuddy.works`
5. Enforce HTTPS: ✅

## DNS Configuration

Make sure your domain points to GitHub Pages:

```
studybuddy.works  A  185.199.108.153
studybuddy.works  A  185.199.109.153
studybuddy.works  A  185.199.110.153
studybuddy.works  A  185.199.111.153
```

Or use CNAME:
```
studybuddy.works  CNAME  oatswrldwide.github.io
```

## Verify Deployment

- ✅ Files committed: https://github.com/oatswrldwide/studybuddy-south-africa
- ✅ Pages enabled: https://github.com/oatswrldwide/studybuddy-south-africa/settings/pages
- ✅ Domain configured: studybuddy.works → oatswrldwide.github.io
- ✅ Site live: https://studybuddy.works

---

**Ready to deploy?** Run `./quick-deploy-seo.sh` now!
