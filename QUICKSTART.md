# Quick Start Guide - ALS ReviewMate

## 🚀 Get Started in 5 Minutes!

### Step 1: Install Dependencies (2 min)

```bash
npm install
```

**If you get errors, try one of these:**
```bash
npm install --legacy-peer-deps
# OR
npm install --force
```

**Check Node.js version (need 18+):**
```bash
node --version
```

### Step 2: Set Up Database (2 min)

1. Open [supabase.com](https://supabase.com) and create account
2. Create new project
3. Go to SQL Editor
4. Copy entire content from `supabase-schema.sql`
5. Paste and run in SQL Editor

### Step 3: Run the App (1 min)

```bash
npm run dev
```

Open `http://localhost:3000` and you're ready! 🎉

## First Login

### Create a Teacher Account
- Email: `teacher@test.com`
- Password: `test123`
- Role: Teacher

### Create a Learner Account
- Email: `learner@test.com`
- Password: `test123`
- Role: Learner

## What's Next?

- **Teachers**: View the dashboard to see student analytics
- **Learners**: Browse subjects and take quizzes
- **Add Content**: Manually add quizzes via Supabase Table Editor

## Need Help?

- Full setup: Read [SETUP.md](SETUP.md)
- Deployment: Read [DEPLOYMENT.md](DEPLOYMENT.md)
- Contributing: Read [CONTRIBUTING.md](CONTRIBUTING.md)

## Project Structure

```
ALS-ReviewMate/
├── src/
│   ├── pages/
│   │   ├── learner/          # Student interface
│   │   ├── teacher/          # Teacher dashboard
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx   # Authentication logic
│   ├── lib/
│   │   └── supabase.ts       # Database config
│   └── App.tsx
├── supabase-schema.sql       # Database schema
└── package.json
```

## Features Overview

✅ **Authentication** - Login/Register for teachers and learners  
✅ **Subject Browser** - 5 ALS subjects (English, Math, Science, Filipino, Araling Panlipunan)  
✅ **Quiz System** - Multiple choice with instant feedback  
✅ **Progress Tracking** - See your mastery level per subject  
✅ **Teacher Dashboard** - Monitor student performance  
✅ **Analytics** - Identify struggling students and weak subjects  
✅ **PWA Support** - Works offline, installable on mobile  

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Mobile
npx cap sync         # Sync with Capacitor
npx cap open android # Open in Android Studio
```

## Troubleshooting

**Can't connect to Supabase?**
- Check URL and key in `src/lib/supabase.ts`
- Verify project isn't paused

**No subjects showing?**
- Make sure you ran `supabase-schema.sql`
- Check Table Editor in Supabase

**Port 3000 in use?**
- Change port in `vite.config.ts`

---

**Ready to learn? Let's go! 📚✨**