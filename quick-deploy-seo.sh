#!/bin/bash
# Quick Deploy Script for studybuddy.works
# Run this from your local machine with write access

echo "🚀 Deploying SEO content to studybuddy.works..."
echo ""

# Navigate to a temporary directory
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Clone the SEO repository
echo "1️⃣  Cloning studybuddy-south-africa..."
git clone git@github.com:oatswrldwide/studybuddy-south-africa.git
cd studybuddy-south-africa

# Download the prepared content
echo "2️⃣  Downloading SEO content..."
gh api repos/oatswrldwide/study-buddy-ai/tarball/main --jq .tarball_url | xargs curl -L | tar xz --strip-components=1

# Copy only SEO directories
echo "3️⃣  Copying SEO files..."
cp -r pseo-output/* ./ 2>/dev/null || true
cp -r pseo-output-conversion/* ./ 2>/dev/null || true

# Create CNAME
echo "4️⃣  Setting up custom domain..."
echo "studybuddy.works" > CNAME

# Commit and push
echo "5️⃣  Committing changes..."
git add .
git commit -m "Deploy SEO content to studybuddy.works [$(date +'%Y-%m-%d %H:%M:%S')]" || echo "No changes to commit"
git push origin main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your SEO site will be live at: https://studybuddy.works"
echo ""

# Cleanup
cd /
rm -rf "$TEMP_DIR"
