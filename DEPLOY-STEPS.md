# 🚀 AI Manager - 3 Minute Deployment

## Step 1: GitHub (2 minutes)
1. Go to: https://github.com/new
2. Repository name: `ai-manager`
3. Description: `AI agent management for TrendFarm businesses`
4. Make it **Private**
5. **Don't** check any initialization boxes
6. Click "Create repository"
7. Copy the repository URL (e.g., https://github.com/yourusername/ai-manager.git)

## Step 2: Run My Automated Script (30 seconds)
```bash
cd /data/.openclaw/workspace/ai-manager-app
./auto-deploy.sh
```
When prompted, enter:
- Your GitHub username
- Repository name: `ai-manager` 
- Say "yes" when it asks if you created the repo

## Step 3: Vercel Deploy (1 minute)  
1. Go to: https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your `ai-manager` repository
5. Click "Deploy" (use all default settings)
6. Wait for deployment (30 seconds)
7. Copy your live URL (e.g., https://ai-manager-xyz123.vercel.app)

## Step 4: Configure Environment (30 seconds)
In Vercel dashboard:
1. Go to your app → Settings → Environment Variables
2. Add:
   - `OPENCLAW_GATEWAY_URL` = `http://YOUR_SERVER_IP:18790`
   - `OPENCLAW_AUTH_TOKEN` = `your-token`
3. Click "Save"
4. Redeploy (automatic)

## Step 5: OpenClaw Config (30 seconds)
```bash
openclaw gateway stop
openclaw gateway start --bind lan
```

## ✅ DONE!
Visit your live AI Manager at your Vercel URL!

**Total Time: ~3 minutes of clicking + 1 minute of commands**