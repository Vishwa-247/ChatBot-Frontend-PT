# Frontend Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your backend deployed on Render

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**:
   - Go to GitHub.com
   - Click "New repository"
   - Name it something like "agentic-chatbot-frontend"
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/agentic-chatbot-frontend.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add the following variable:
     - **Name**: `VITE_API_BASE_URL`
     - **Value**: `https://YOUR_RENDER_APP_NAME.onrender.com/api`
     - **Environment**: Production, Preview, Development

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

## Step 3: Update Backend CORS (if needed)

Make sure your Render backend allows requests from your Vercel domain. In your backend's CORS configuration, add your Vercel domain:

```python
# In your backend CORS settings
origins = [
    "http://localhost:3000",  # Local development
    "https://your-app.vercel.app",  # Your Vercel domain
    "https://*.vercel.app"  # All Vercel domains
]
```

## Step 4: Test Your Deployment

1. Visit your Vercel URL
2. Test the chat functionality
3. Verify it connects to your Render backend

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Your Render backend API URL | `https://my-app.onrender.com/api` |

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend allows requests from your Vercel domain
2. **API Connection**: Verify the `VITE_API_BASE_URL` is correct
3. **Build Errors**: Check that all dependencies are in `package.json`

### Debug Steps:

1. Check Vercel build logs for errors
2. Verify environment variables are set correctly
3. Test API endpoints directly
4. Check browser console for errors

## Next Steps

After successful deployment:
1. Set up a custom domain (optional)
2. Configure automatic deployments from GitHub
3. Set up monitoring and analytics 
