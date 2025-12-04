# Deployment Guide for ALS ReviewMate

This guide covers deploying ALS ReviewMate to various platforms.

## Table of Contents

1. [Web Deployment](#web-deployment)
   - [Vercel](#vercel)
   - [Netlify](#netlify)
2. [Mobile Deployment](#mobile-deployment)
   - [Android](#android)
   - [iOS](#ios-coming-soon)
3. [Environment Variables](#environment-variables)
4. [Production Checklist](#production-checklist)

## Web Deployment

### Vercel

**Prerequisites:**
- Vercel account
- GitHub repository

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Configure Environment Variables**
   Create `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "env": {
       "VITE_SUPABASE_URL": "@supabase-url",
       "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
     }
   }
   ```

4. **Add secrets to Vercel**
   ```bash
   vercel secrets add supabase-url "your-supabase-url"
   vercel secrets add supabase-anon-key "your-anon-key"
   ```

5. **Deploy**
   ```bash
   vercel --prod
   ```

6. **Set up Git Integration (Recommended)**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Import Project"
   - Connect your GitHub repo
   - Configure environment variables
   - Deploy automatically on every push

### Netlify

**Prerequisites:**
- Netlify account
- GitHub repository

**Steps:**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

5. **Set Environment Variables**
   - Go to Netlify dashboard
   - Site settings → Environment variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

6. **Connect to Git (Recommended)**
   - Go to [app.netlify.com](https://app.netlify.com/)
   - "Add new site" → "Import existing project"
   - Connect GitHub repo
   - Configure build settings
   - Deploy automatically on push

## Mobile Deployment

### Android

#### Prerequisites

- Android Studio installed
- Java Development Kit (JDK) 11+
- Android SDK

#### Build Steps

1. **Update Supabase Config**
   
   Move keys to environment or secure storage before building:
   ```typescript
   // src/lib/supabase.ts
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```

2. **Build Web App**
   ```bash
   npm run build
   ```

3. **Add Android Platform**
   ```bash
   npx cap add android
   ```

4. **Sync Capacitor**
   ```bash
   npx cap sync android
   ```

5. **Open Android Studio**
   ```bash
   npx cap open android
   ```

6. **Configure Signing (Production)**
   
   In Android Studio:
   - Build → Generate Signed Bundle/APK
   - Create new keystore (save securely!)
   - Fill in key details
   - Choose release build type

7. **Build APK**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK will be in `android/app/build/outputs/apk/release/`

8. **Test APK**
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```

#### Google Play Store Deployment

1. **Create Developer Account**
   - Go to [play.google.com/console](https://play.google.com/console)
   - Pay one-time $25 registration fee

2. **Create App**
   - Click "Create app"
   - Fill in app details
   - Upload screenshots
   - Set content rating
   - Complete privacy policy

3. **Upload APK/Bundle**
   - Go to Production → Releases
   - Create new release
   - Upload app bundle (.aab preferred over .apk)
   - Fill in release notes
   - Review and publish

### iOS (Coming Soon)

iOS deployment requires:
- macOS computer
- Xcode installed
- Apple Developer Account ($99/year)

Steps will be added in future updates.

## Environment Variables

### Development (.env.local)

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Production

**Never commit production keys to Git!**

Use platform-specific environment variable management:

- **Vercel**: Dashboard → Project → Settings → Environment Variables
- **Netlify**: Dashboard → Site → Site settings → Environment variables
- **Android**: Use build variants and local.properties (gitignored)

## Production Checklist

Before deploying to production:

- [ ] Update Supabase to use environment variables
- [ ] Enable RLS policies on all tables
- [ ] Configure Supabase email settings
- [ ] Set up custom domain
- [ ] Enable HTTPS
- [ ] Test authentication flow
- [ ] Test on multiple devices
- [ ] Check mobile responsiveness
- [ ] Verify PWA functionality
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Test offline functionality
- [ ] Verify database backups are enabled
- [ ] Set up rate limiting in Supabase
- [ ] Review security headers
- [ ] Test performance (Lighthouse score)
- [ ] Create privacy policy page
- [ ] Create terms of service page

## Post-Deployment

### Monitoring

Set up monitoring for:
- Error tracking (Sentry)
- Analytics (Google Analytics, Mixpanel)
- Uptime monitoring (UptimeRobot)
- Performance (Lighthouse CI)

### Backups

Supabase automatic backups:
- Go to Dashboard → Settings → Backups
- Enable automatic daily backups
- Test restore process

### Updates

1. Make changes in development
2. Test thoroughly
3. Push to Git
4. Auto-deploy via CI/CD
5. Monitor for errors
6. Rollback if needed

## Troubleshooting

**Build fails on Vercel/Netlify:**
- Check Node version matches local
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

**APK not installing:**
- Enable "Unknown sources" in Android settings
- Check minimum SDK version
- Verify signing configuration

**Supabase connection issues in production:**
- Verify environment variables are set
- Check CORS settings in Supabase
- Verify API keys are correct

## Support

For deployment issues:
- Open GitHub issue
- Check platform-specific documentation
- Review error logs carefully

---

**Good luck with your deployment! 🚀**