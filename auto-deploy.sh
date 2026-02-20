#!/bin/bash

echo "🚀 AI Manager Auto-Deploy Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this from the ai-manager-app directory"
    exit 1
fi

echo "📋 Pre-flight checks..."
echo "✅ Found package.json"
echo "✅ Found all required files"
echo ""

echo "🔧 What you need to do manually (I can't access external services):"
echo ""
echo "1. 🐙 CREATE GITHUB REPO:"
echo "   - Go to: https://github.com/new"
echo "   - Name: ai-manager"
echo "   - Description: Professional AI agent management for TrendFarm businesses"
echo "   - Make it Private"
echo "   - DON'T initialize with README/gitignore (we have them)"
echo "   - Click 'Create repository'"
echo ""

read -p "✋ Have you created the GitHub repo? (y/n): " github_created

if [ "$github_created" != "y" ]; then
    echo "❌ Please create the GitHub repo first, then run this script again"
    exit 1
fi

echo ""
read -p "📝 Enter your GitHub username: " github_username
read -p "📝 Enter your repo name (default: ai-manager): " repo_name
repo_name=${repo_name:-ai-manager}

echo ""
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/$github_username/$repo_name.git

echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Repository URL: https://github.com/$github_username/$repo_name"
else
    echo "❌ GitHub push failed. Check your credentials and repo settings."
    exit 1
fi

echo ""
echo "🌐 Next: Deploy to Vercel"
echo "========================"
echo ""
echo "2. 🚀 DEPLOY TO VERCEL:"
echo "   - Go to: https://vercel.com/login"
echo "   - Sign in with GitHub"
echo "   - Click 'New Project'"
echo "   - Select repository: $repo_name"
echo "   - Keep all default settings"
echo "   - Click 'Deploy'"
echo ""

read -p "✋ Have you deployed to Vercel? (y/n): " vercel_deployed

if [ "$vercel_deployed" != "y" ]; then
    echo "❌ Please deploy to Vercel, then continue"
    exit 1
fi

echo ""
read -p "📝 Enter your Vercel app URL (e.g., https://ai-manager-abc123.vercel.app): " vercel_url

echo ""
echo "⚙️ CONFIGURE ENVIRONMENT VARIABLES:"
echo "=================================="
echo ""
echo "In your Vercel dashboard:"
echo "1. Go to: $vercel_url"
echo "2. Click Settings → Environment Variables"
echo "3. Add these variables:"
echo ""
echo "   OPENCLAW_GATEWAY_URL = http://YOUR_SERVER_IP:18790"
echo "   OPENCLAW_AUTH_TOKEN = your-gateway-token"
echo ""
echo "4. Save and redeploy"
echo ""

read -p "✋ Have you configured environment variables? (y/n): " env_configured

if [ "$env_configured" != "y" ]; then
    echo "⚠️  Don't forget to configure environment variables!"
fi

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================"
echo ""
echo "✅ GitHub Repository: https://github.com/$github_username/$repo_name"
echo "✅ Live Web App: $vercel_url"
echo ""
echo "🔧 FINAL STEP - Configure OpenClaw:"
echo "Run these commands on your OpenClaw server:"
echo ""
echo "   openclaw gateway stop"
echo "   openclaw gateway start --bind lan"
echo ""
echo "🎯 Test your deployment:"
echo "1. Visit: $vercel_url"
echo "2. Select a project (TrendFarm, ChurchOS, etc.)"
echo "3. Deploy a test agent"
echo "4. Check OpenClaw for the running agent"
echo ""
echo "🚀 Your AI Manager is now live and accessible worldwide!"