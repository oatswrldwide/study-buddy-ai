#!/bin/bash
# Manual SEO Content Deployment Script
# Deploys SEO content from study-buddy-ai to studybuddy-south-africa

set -e

echo "🚀 Starting SEO deployment to studybuddy.works..."

# Clone the SEO repository
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

echo "📦 Cloning studybuddy-south-africa repository..."
git clone https://github.com/oatswrldwide/studybuddy-south-africa.git
cd studybuddy-south-africa

# Copy SEO content
echo "📄 Copying SEO content..."
cp -r /workspaces/study-buddy-ai/pseo-output/* . 2>/dev/null || true
cp -r /workspaces/study-buddy-ai/pseo-output-conversion/* . 2>/dev/null || true
cp -r /workspaces/study-buddy-ai/seo-content/* . 2>/dev/null || true

# Create CNAME file
echo "🌐 Setting up custom domain..."
echo "studybuddy.works" > CNAME

# Update README
cat > README.md << 'EOF'
# StudyBuddy South Africa - SEO Landing Pages

**Live Site**: https://studybuddy.works

This repository contains programmatic SEO (pSEO) content for StudyBuddy AI.

## Content Structure

- **Subject Pages**: Mathematics, Physical Sciences, Life Sciences by grade
- **Pain Point Pages**: Targeted landing pages for specific student problems
- **Comparison Pages**: AI tutor vs traditional tutoring

## Deployment

- Content is automatically synced from the main study-buddy-ai repository
- Deployed to GitHub Pages at studybuddy.works
- Updates happen on every push to main branch

## Manual Testing

Visit: https://studybuddy.works

Last updated: $(date)
EOF

# Commit and push
echo "💾 Committing changes..."
git config user.name "StudyBuddy Deploy Bot"
git config user.email "deploy@studybuddy.works"
git add .

if git diff --staged --quiet; then
  echo "✅ No changes to deploy"
else
  git commit -m "Deploy SEO content to studybuddy.works [$(date +'%Y-%m-%d %H:%M:%S')]"
  
  echo "⬆️  Pushing to GitHub..."
  git push origin main
  
  echo ""
  echo "✅ SUCCESS! SEO content deployed to studybuddy-south-africa"
  echo "🌐 Your site will be available at: https://studybuddy.works"
  echo "📊 Check deployment status: https://github.com/oatswrldwide/studybuddy-south-africa/deployments"
fi

# Cleanup
cd /
rm -rf "$TEMP_DIR"

echo ""
echo "✨ Deployment complete!"
