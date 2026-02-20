# AI Manager - Ross's Business AI Agent Dashboard

A professional web application to manage AI agents across your business projects: TrendFarm, ChurchOS, ShieldMyShop, and SystemsFarm.

## 🚀 Features

- **Project-Based Agent Management**: Switch between different business contexts
- **Real-time Agent Deployment**: Deploy AI agents with custom tasks
- **Professional Dashboard**: Clean, responsive interface
- **OpenClaw Integration**: Connects to your OpenClaw instance
- **Vercel Ready**: Optimized for Vercel deployment

## 🏗️ Architecture

```
Web App (Vercel) → OpenClaw Gateway (Your Server) → AI Agents (Claude)
```

## 📋 Prerequisites

1. **OpenClaw** running on your server
2. **Node.js 18+** for local development
3. **Vercel account** for deployment

## 🛠️ Local Development

1. **Clone and Install**:
   ```bash
   cd ai-manager-app
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your OpenClaw settings
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open**: http://localhost:3000

## 🌐 Deploy to Vercel

### Quick Deploy (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial AI Manager setup"
   git remote add origin https://github.com/yourusername/ai-manager
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Configure Environment Variables** in Vercel:
   ```
   OPENCLAW_GATEWAY_URL = http://your-server-ip:18790
   OPENCLAW_AUTH_TOKEN = your-gateway-token
   ```

4. **Deploy**: Vercel automatically deploys on push

### Manual Deploy

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

## 🔧 OpenClaw Configuration

### Enable Public Access (for Vercel integration)

1. **Update OpenClaw Config** to allow external connections:
   ```bash
   # On your server
   openclaw gateway stop
   openclaw gateway start --bind lan
   ```

2. **Firewall**: Open port 18790 for your Vercel deployments

3. **Security**: Consider using authentication tokens

### Environment Variables

Set these in your Vercel dashboard:

- `OPENCLAW_GATEWAY_URL`: Your server's public IP + port 18790
- `OPENCLAW_AUTH_TOKEN`: Gateway authentication token
- `OPENCLAW_API_KEY`: Additional API key if required

## 📱 Usage

1. **Access Dashboard**: Visit your Vercel URL
2. **Select Project**: Click on TrendFarm, ChurchOS, ShieldMyShop, or SystemsFarm
3. **Choose Agent**: Select from available project agents
4. **Define Task**: Describe what you want the agent to do
5. **Deploy**: Click "Deploy Agent" to start the AI agent
6. **Monitor**: Check OpenClaw for agent status and results

## 🔒 Security Considerations

1. **Environment Variables**: Never commit secrets to git
2. **OpenClaw Access**: Consider VPN or IP restrictions
3. **Authentication**: Add user authentication for production use
4. **HTTPS**: Vercel provides HTTPS automatically

## 🎯 Project Structure

```
ai-manager-app/
├── app/
│   ├── api/
│   │   ├── projects/route.ts    # Get project data
│   │   └── deploy/route.ts      # Deploy agents
│   ├── globals.css              # Styles
│   ├── layout.tsx               # App layout
│   └── page.tsx                 # Main dashboard
├── package.json                 # Dependencies
├── next.config.js              # Next.js config
└── tailwind.config.js          # Styling config
```

## 🔄 Development Workflow

1. **Local Testing**: Test changes with `npm run dev`
2. **Git Push**: Push to GitHub triggers auto-deploy
3. **Environment Sync**: Keep Vercel env vars updated
4. **OpenClaw Integration**: Test API connections

## 🚨 Troubleshooting

### Can't Connect to OpenClaw
- Check `OPENCLAW_GATEWAY_URL` in Vercel
- Verify OpenClaw is running with `--bind lan`
- Test direct connection: `curl http://your-ip:18790`

### Deployment Fails
- Check Vercel build logs
- Verify all dependencies in package.json
- Test build locally: `npm run build`

### Agents Not Deploying
- Check OpenClaw agent system is working
- Verify API routes are connecting
- Check Vercel function logs

## 🎉 Success!

Once deployed, you'll have:
- ✅ Professional web dashboard accessible from anywhere
- ✅ Project-based AI agent management
- ✅ Real-time deployment to your OpenClaw instance
- ✅ Zero recurring costs (uses your existing Claude plan)

**Access your dashboard**: `https://your-app-name.vercel.app`

## 📞 Support

If you need help with deployment or OpenClaw integration, check:
1. Vercel deployment logs
2. OpenClaw gateway status
3. Network connectivity between Vercel and your server# Build fixed - UI components added
# Force deployment - Fri Feb 20 13:08:59 UTC 2026
