# 🚀 Vercel Deployment Guide

## 📋 Prerequisites

1. **GitHub Account** - Your code must be on GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **MongoDB Atlas** - Your database should be accessible from Vercel
4. **Google OAuth** - Configure for production domain

## 🔧 Step-by-Step Deployment

### **Step 1: Push to GitHub**

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### **Step 2: Configure Google OAuth for Production**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add these **Authorized redirect URIs**:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   https://your-app-name.vercel.app/api/auth/callback/google
   ```

### **Step 3: Deploy on Vercel**

1. **Connect GitHub to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables:**
   In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

   ```
   NEXTAUTH_URL=https://your-app-name.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGODB_URI=your-mongodb-connection-string
   ```

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### **Step 4: Update Environment Variables**

After deployment, update your `.env.local` with the production URL:

```env
NEXTAUTH_URL=https://your-app-name.vercel.app
```

## 🔒 Security Considerations

### **Environment Variables**
- ✅ **DO** use Vercel's environment variable system
- ❌ **DON'T** commit `.env.local` to GitHub
- ✅ **DO** use strong, unique secrets for production

### **Database Access**
- ✅ **DO** ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- ✅ **DO** use strong database passwords
- ❌ **DON'T** expose database credentials in code

### **OAuth Configuration**
- ✅ **DO** update Google OAuth redirect URIs for production domain
- ✅ **DO** test authentication flow after deployment

## 🐛 Troubleshooting

### **Common Issues:**

1. **Build Errors:**
   - Check Vercel build logs
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript configuration

2. **Authentication Issues:**
   - Verify Google OAuth redirect URIs
   - Check environment variables in Vercel
   - Ensure `NEXTAUTH_URL` matches your domain

3. **Database Connection:**
   - Verify MongoDB Atlas network access
   - Check connection string format
   - Ensure database user has correct permissions

4. **Environment Variables:**
   - Redeploy after adding environment variables
   - Check variable names match exactly
   - Verify no extra spaces or quotes

## 📊 Monitoring

### **Vercel Analytics:**
- Monitor performance in Vercel dashboard
- Check function execution times
- Review error logs

### **Application Monitoring:**
- Set up error tracking (Sentry, etc.)
- Monitor database performance
- Track user authentication success rates

## 🔄 Continuous Deployment

Once set up, Vercel will automatically:
- ✅ Deploy on every GitHub push
- ✅ Run build checks
- ✅ Provide preview deployments for PRs
- ✅ Handle environment variable updates

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Review environment variable configuration
3. Verify Google OAuth settings
4. Test database connectivity

---

**🎉 Your app should now be live at: `https://your-app-name.vercel.app`** 