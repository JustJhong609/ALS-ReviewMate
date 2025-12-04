# Setup Guide for ALS ReviewMate

## Prerequisites Installation

### 1. Install Node.js and npm

**Windows/Mac:**
- Download from [nodejs.org](https://nodejs.org/)
- Install LTS version (18.x or higher)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Create Supabase Account

1. Go to [supabase.com](https://supabase.com/)
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project

## Database Setup

### Step 1: Access SQL Editor

1. Open your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"

### Step 2: Run Schema Script

1. Open the `supabase-schema.sql` file in your project
2. Copy all its contents
3. Paste into the SQL Editor
4. Click "Run" button
5. Wait for success message

### Step 3: Verify Tables

1. Go to "Table Editor" in Supabase
2. You should see these tables:
   - profiles
   - subjects
   - topics
   - quizzes
   - questions
   - quiz_attempts
   - progress

## Project Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/JustJhong609/ALS-ReviewMate.git
cd ALS-ReviewMate
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Ionic React framework
- Supabase client
- React Router
- TypeScript
- Vite build tool
- And other dependencies

### Step 3: Configure Supabase

The Supabase configuration is in `src/lib/supabase.ts`:

```typescript
const supabaseUrl = 'https://tyewbfzjxroqnyuzqvdb.supabase.co';
const supabaseAnonKey = 'your-anon-key-here';
```

**For production:**
1. Create `.env` file in root:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

2. Update `src/lib/supabase.ts`:
   ```typescript
   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
   ```

### Step 4: Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## First-Time Usage

### Creating Test Accounts

**Learner Account (Self-Registration):**
1. Go to `http://localhost:3000/register`
2. Fill in:
   - Full Name: Test Student
   - Email: student@test.com
   - Password: test123
3. Click Register (automatically created as Learner)
4. Login with credentials

**Teacher Account (Manual Creation):**
Teachers cannot self-register for security. To create a teacher account:

1. Have the teacher register as normal (they'll be created as learner)
2. Go to Supabase Dashboard → SQL Editor
3. Find their user ID:
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'teacher@example.com';
   ```
4. Upgrade them to teacher:
   ```sql
   UPDATE public.profiles SET role = 'teacher' WHERE id = 'USER_ID_HERE';
   ```
5. They can now logout and login again with teacher access

**Or use the provided SQL script:**
```bash
# See add-teacher.sql for detailed instructions
```
3. Click Register
4. Login with credentials

### Adding Sample Quiz Data

You can manually add quizzes through Supabase:

1. Go to Table Editor → quizzes
2. Insert new row:
   - subject_id: (select from subjects table)
   - title: "Sample Math Quiz"
   - description: "Basic arithmetic"
   - difficulty: "easy"
   - passing_score: 60

3. Go to questions table
4. Insert questions for your quiz
5. Add options as JSON array: `["Option A", "Option B", "Option C", "Option D"]`

## Building for Production

### Web Deployment (Vercel)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   npm run build
   vercel --prod
   ```

### Web Deployment (Netlify)

1. Build the app:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Android App

1. Build web app:
   ```bash
   npm run build
   ```

2. Add Android platform:
   ```bash
   npx cap add android
   ```

3. Sync files:
   ```bash
   npx cap sync
   ```

4. Open in Android Studio:
   ```bash
   npx cap open android
   ```

5. In Android Studio:
   - Wait for Gradle sync
   - Click Build → Build Bundle/APK
   - Generate Signed APK

## Troubleshooting

### Common Issues

**Issue: npm install fails**
- Solution: Clear npm cache: `npm cache clean --force`
- Try: `npm install --legacy-peer-deps`

**Issue: Supabase connection error**
- Check URL and key are correct
- Verify project is not paused in Supabase dashboard
- Check internet connection

**Issue: Cannot login after registration**
- Check Supabase email settings
- Disable email confirmation in Supabase Auth settings for testing

**Issue: Quiz doesn't load**
- Verify data exists in subjects, quizzes, and questions tables
- Check browser console for errors
- Verify RLS policies are applied

**Issue: Port 3000 already in use**
- Change port in `vite.config.ts`:
  ```typescript
  server: {
    port: 3001
  }
  ```

### Getting Help

- Check [GitHub Issues](https://github.com/JustJhong609/ALS-ReviewMate/issues)
- Review [Supabase Documentation](https://supabase.com/docs)
- Visit [Ionic React Docs](https://ionicframework.com/docs/react)

## Next Steps

1. Add quiz content for all subjects
2. Invite teachers to create quizzes
3. Test with real learners
4. Gather feedback and iterate
5. Deploy to production

---

**Need more help?** Open an issue on GitHub!