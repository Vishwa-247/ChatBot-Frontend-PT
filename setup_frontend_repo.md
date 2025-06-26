# Frontend Repository Setup Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and click "New repository"
2. Repository name: `ai-chatbot-frontend`
3. Description: `React frontend for AI chatbot`
4. Make it Public or Private (your choice)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Prepare Frontend Code

1. **Navigate to the root directory** (where your frontend files are):
   ```bash
   cd "C:\Users\VISHWA TEJA THOUTI\OneDrive\Desktop\Chatbot Ver Phi-5\Agentic Chabot"
   ```

2. **Initialize git and connect to new repository**:
   ```bash
   git init
   git remote add origin https://github.com/YOUR_USERNAME/ai-chatbot-frontend.git
   ```

3. **Update API base URL** in your frontend code to point to your deployed backend:
   - Edit `src/services/apiClient.ts`
   - Change the base URL from `http://localhost:8000` to your backend URL
   - Example: `https://ai-chatbot-backend.onrender.com`

4. **Add and commit files**:
   ```bash
   git add .
   git commit -m "Initial frontend commit"
   git push -u origin main
   ```

## Step 3: Deploy Frontend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Static Site"
3. Connect your GitHub account
4. Select the `ai-chatbot-frontend` repository
5. Configure:
   - **Name**: `ai-chatbot-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

6. Click "Create Static Site"

## Step 4: Alternative: Deploy to Vercel (Recommended for React)

1. Go to [Vercel](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `ai-chatbot-frontend` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Click "Deploy"

## Step 5: Update API Configuration

After deployment, make sure your frontend is pointing to the correct backend URL:

1. **For Render deployment**: Update `src/services/apiClient.ts`
2. **For Vercel deployment**: You can use environment variables

## Step 6: Test Frontend Deployment

1. Visit your deployed frontend URL
2. Test chat functionality
3. Test file upload
4. Test all features

---

## ✅ Frontend Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] API base URL updated
- [ ] Render/Vercel service created
- [ ] Deployment successful
- [ ] Frontend loads correctly
- [ ] Chat functionality works
- [ ] File upload works
- [ ] All features tested

---

## 🔗 Final URLs

- **Backend**: `https://ai-chatbot-backend.onrender.com`
- **Frontend**: `https://ai-chatbot-frontend.onrender.com` (or Vercel URL)
- **API Docs**: `https://ai-chatbot-backend.onrender.com/docs`

## 🎉 Success!

Your AI chatbot is now fully deployed with:
- ✅ **Backend**: FastAPI + MongoDB + Cloudinary on Render
- ✅ **Frontend**: React on Render/Vercel
- ✅ **Database**: MongoDB Atlas
- ✅ **File Storage**: Cloudinary
- ✅ **Production Ready**: Scalable and reliable 
