#!/bin/bash

# AI Manager - API-Based Automation
# This would require GitHub and Vercel API tokens

echo "🤖 Advanced API Automation (requires tokens)"
echo "============================================="

# Check for required tokens
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Missing GITHUB_TOKEN environment variable"
    echo "   Get one at: https://github.com/settings/tokens"
    echo "   Needs 'repo' and 'user' scopes"
    exit 1
fi

if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ Missing VERCEL_TOKEN environment variable"  
    echo "   Get one at: https://vercel.com/account/tokens"
    exit 1
fi

echo "🐙 Creating GitHub repository..."

# Create GitHub repo using API
REPO_DATA='{
  "name": "ai-manager",
  "description": "Professional AI agent management for TrendFarm businesses",
  "private": true,
  "auto_init": false
}'

REPO_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -X POST \
  -d "$REPO_DATA" \
  https://api.github.com/user/repos)

# Extract repo URL
REPO_URL=$(echo $REPO_RESPONSE | grep -o '"clone_url":"[^"]*' | cut -d'"' -f4)

if [ -z "$REPO_URL" ]; then
    echo "❌ Failed to create GitHub repository"
    echo "Response: $REPO_RESPONSE"
    exit 1
fi

echo "✅ Created repository: $REPO_URL"

# Add remote and push
git remote remove origin 2>/dev/null || true
git remote add origin $REPO_URL
git push -u origin main

echo "✅ Pushed to GitHub successfully!"

echo "🚀 Deploying to Vercel..."

# Deploy to Vercel using API
VERCEL_DEPLOY_DATA='{
  "name": "ai-manager",
  "source": "github",
  "gitSource": {
    "type": "github",
    "repo": "'$(echo $REPO_URL | sed 's/.*github.com\///g' | sed 's/.git$//')'",
    "ref": "main"
  }
}'

VERCEL_RESPONSE=$(curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "$VERCEL_DEPLOY_DATA" \
  https://api.vercel.com/v13/deployments)

# Extract deployment URL
DEPLOY_URL=$(echo $VERCEL_RESPONSE | grep -o '"url":"[^"]*' | cut -d'"' -f4)

if [ -z "$DEPLOY_URL" ]; then
    echo "❌ Failed to deploy to Vercel"
    echo "Response: $VERCEL_RESPONSE"
    exit 1
fi

echo "✅ Deployed to Vercel: https://$DEPLOY_URL"

echo ""
echo "🎉 FULLY AUTOMATED DEPLOYMENT COMPLETE!"
echo "======================================"
echo "✅ GitHub Repo: $REPO_URL"
echo "✅ Live App: https://$DEPLOY_URL"
echo ""
echo "⚠️ Still need to:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Update OpenClaw binding: openclaw gateway start --bind lan"
echo ""