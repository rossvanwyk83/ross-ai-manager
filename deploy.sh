#!/bin/bash

echo "🚀 Deploying AI Manager to Vercel..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this from the ai-manager-app directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build to check for errors
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "📱 Your AI Manager is now live!"
echo ""
echo "🔧 Don't forget to:"
echo "  1. Set environment variables in Vercel dashboard:"
echo "     - OPENCLAW_GATEWAY_URL=http://your-server-ip:18790"
echo "     - OPENCLAW_AUTH_TOKEN=your-token"
echo "  2. Ensure OpenClaw is running with --bind lan"
echo "  3. Open firewall port 18790"
echo ""
echo "🎉 Happy agent managing!"