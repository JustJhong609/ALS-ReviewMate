# 📂 ALS ReviewMate - Complete File Structure

## Root Directory

```
ALS-ReviewMate/
│
├── 📄 README.md                    # Main project documentation
├── 📄 QUICKSTART.md                # 5-minute setup guide
├── 📄 SETUP.md                     # Detailed installation guide
├── 📄 DEPLOYMENT.md                # Deployment instructions
├── 📄 CONTRIBUTING.md              # Contribution guidelines
├── 📄 CHECKLIST.md                 # Launch checklist
├── 📄 PROJECT-SUMMARY.md           # Project overview
├── 📄 ARCHITECTURE.md              # System architecture docs
│
├── 📄 package.json                 # Dependencies and scripts
├── 📄 vite.config.ts              # Vite build configuration
├── 📄 tsconfig.json               # TypeScript configuration
├── 📄 tsconfig.node.json          # Node TypeScript config
├── 📄 capacitor.config.json       # Mobile app configuration
├── 📄 .gitignore                  # Git ignore rules
│
├── 📄 supabase-schema.sql         # Database schema and policies
├── 📄 sample-data.sql             # Sample quizzes and topics
│
├── 📄 index.html                  # Main HTML entry point
│
├── 📁 .vscode/                    # VSCode settings
│   └── extensions.json            # Recommended extensions
│
├── 📁 public/                     # Static assets
│   ├── manifest.json              # PWA manifest
│   └── service-worker.js          # Offline support
│
└── 📁 src/                        # Source code
    ├── 📄 main.tsx                # Application entry
    ├── 📄 App.tsx                 # Main app component
    ├── 📄 index.css               # Global styles
    │
    ├── 📁 lib/                    # Utilities
    │   └── supabase.ts           # Supabase config + types
    │
    ├── 📁 contexts/               # React contexts
    │   └── AuthContext.tsx        # Authentication state
    │
    └── 📁 pages/                  # Page components
        ├── Login.tsx              # Login page
        ├── Register.tsx           # Registration page
        │
        ├── 📁 learner/            # Learner pages
        │   ├── Dashboard.tsx      # Subject browser
        │   ├── SubjectView.tsx    # Topics & quizzes
        │   ├── QuizPage.tsx       # Quiz interface
        │   └── Progress.tsx       # Progress tracking
        │
        └── 📁 teacher/            # Teacher pages
            └── Dashboard.tsx      # Analytics dashboard
```

---

## 📄 File Descriptions

### Configuration Files

#### package.json
- **Purpose**: Defines project dependencies and scripts
- **Key Dependencies**:
  - `@ionic/react` - UI framework
  - `@supabase/supabase-js` - Backend client
  - `react-router-dom` - Routing
  - `@capacitor/core` - Mobile wrapper
- **Scripts**:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run preview` - Preview production build

#### vite.config.ts
- **Purpose**: Vite build tool configuration
- **Settings**: Port 3000, React plugin, host enabled

#### tsconfig.json
- **Purpose**: TypeScript compiler settings
- **Settings**: Strict mode, ES2020 target, JSX transform

#### capacitor.config.json
- **Purpose**: Mobile app configuration
- **Settings**: App ID, name, web directory

---

### Documentation Files

#### README.md
- **Purpose**: Main project documentation
- **Contents**: Overview, features, tech stack, setup instructions
- **Audience**: All users, contributors, developers

#### QUICKSTART.md
- **Purpose**: Get started in 5 minutes
- **Contents**: Minimal setup steps, first login guide
- **Audience**: New users wanting quick start

#### SETUP.md
- **Purpose**: Comprehensive setup guide
- **Contents**: Prerequisites, detailed installation, troubleshooting
- **Audience**: Developers setting up locally

#### DEPLOYMENT.md
- **Purpose**: Production deployment guide
- **Contents**: Vercel, Netlify, Android deployment steps
- **Audience**: DevOps, deployment team

#### CONTRIBUTING.md
- **Purpose**: Contribution guidelines
- **Contents**: Code style, PR process, development setup
- **Audience**: Open source contributors

#### CHECKLIST.md
- **Purpose**: Pre-launch and maintenance checklist
- **Contents**: Testing, deployment, content tasks
- **Audience**: Project manager, QA team

#### PROJECT-SUMMARY.md
- **Purpose**: High-level project overview
- **Contents**: Completed features, tech stack, status
- **Audience**: Stakeholders, new team members

#### ARCHITECTURE.md
- **Purpose**: System architecture documentation
- **Contents**: Data flow, database schema, component hierarchy
- **Audience**: Technical team, architects

---

### Database Files

#### supabase-schema.sql
- **Purpose**: Complete database schema
- **Contents**:
  - 7 table definitions
  - Row Level Security policies
  - Indexes for performance
  - Auto-trigger for user profiles
  - Sample subjects data
- **Usage**: Run once in Supabase SQL Editor

#### sample-data.sql
- **Purpose**: Sample quiz content
- **Contents**:
  - 4 sample quizzes (English, Math, Science, Filipino)
  - 20+ sample questions
  - Sample topics
- **Usage**: Run after schema to populate initial data

---

### Source Code Files

#### src/main.tsx
- **Purpose**: Application entry point
- **Responsibilities**:
  - Renders root React component
  - Sets up React StrictMode

#### src/App.tsx
- **Purpose**: Main application component
- **Responsibilities**:
  - Wraps app with AuthProvider
  - Defines all routes
  - Handles role-based routing
  - Shows loading state

#### src/index.css
- **Purpose**: Global styles
- **Contents**:
  - Ionic CSS imports
  - Custom CSS variables
  - Utility classes
  - Component base styles

---

### Library Files

#### src/lib/supabase.ts
- **Purpose**: Supabase configuration and types
- **Contents**:
  - Supabase client initialization
  - TypeScript interfaces for all tables:
    - `User` - User profile
    - `Subject` - Academic subject
    - `Topic` - Study material
    - `Quiz` - Quiz metadata
    - `Question` - Quiz question
    - `QuizAttempt` - Student submission
    - `Progress` - Mastery tracking
- **Usage**: Import in components needing database access

---

### Context Files

#### src/contexts/AuthContext.tsx
- **Purpose**: Authentication state management
- **Provides**:
  - `user` - Current user profile
  - `supabaseUser` - Supabase auth user
  - `loading` - Loading state
  - `signUp()` - Registration function
  - `signIn()` - Login function
  - `signOut()` - Logout function
- **Usage**: Wrap app, use `useAuth()` hook in components

---

### Page Components

#### src/pages/Login.tsx
- **Purpose**: User login page
- **Features**:
  - Email/password form
  - Error handling
  - Link to registration
  - Redirects to dashboard on success

#### src/pages/Register.tsx
- **Purpose**: User registration page
- **Features**:
  - Full name, email, password fields
  - Role selection (learner/teacher)
  - Email verification message
  - Link to login

#### src/pages/learner/Dashboard.tsx
- **Purpose**: Learner main dashboard
- **Features**:
  - Display all 5 subjects
  - Subject cards with icons
  - Navigation to subject view
  - Progress button
  - Logout button

#### src/pages/learner/SubjectView.tsx
- **Purpose**: Subject detail page
- **Features**:
  - Display topics for study
  - List available quizzes
  - Difficulty badges
  - Navigation to quiz

#### src/pages/learner/QuizPage.tsx
- **Purpose**: Interactive quiz interface
- **Features**:
  - Question display
  - Multiple choice options
  - True/false questions
  - Instant feedback
  - Explanation display
  - Progress bar
  - Score calculation
  - Completion screen
  - Save to database

#### src/pages/learner/Progress.tsx
- **Purpose**: Student progress tracking
- **Features**:
  - Subject mastery levels
  - Progress bars
  - Recent quiz attempts
  - Average scores
  - Weak subject identification
  - Study tips

#### src/pages/teacher/Dashboard.tsx
- **Purpose**: Teacher analytics dashboard
- **Features**:
  - Three-tab interface (Overview/Students/Subjects)
  - Total students count
  - Total quizzes count
  - Class average
  - Students needing attention
  - Individual student performance
  - Subject-wide analytics
  - Weak subject identification

---

### Static Files

#### public/manifest.json
- **Purpose**: PWA manifest
- **Contents**:
  - App name and short name
  - Theme colors
  - Icons array
  - Display mode (standalone)
  - Start URL

#### public/service-worker.js
- **Purpose**: Offline functionality
- **Features**:
  - Cache static assets
  - Serve cached content offline
  - Update cache on new version

---

## 🎯 Key Files by Function

### Authentication
- `src/contexts/AuthContext.tsx`
- `src/pages/Login.tsx`
- `src/pages/Register.tsx`
- `src/lib/supabase.ts`

### Database
- `supabase-schema.sql`
- `sample-data.sql`
- `src/lib/supabase.ts`

### Learner Features
- `src/pages/learner/Dashboard.tsx`
- `src/pages/learner/SubjectView.tsx`
- `src/pages/learner/QuizPage.tsx`
- `src/pages/learner/Progress.tsx`

### Teacher Features
- `src/pages/teacher/Dashboard.tsx`

### Configuration
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `capacitor.config.json`

### Documentation
- All `.md` files in root

### Styling
- `src/index.css`
- Ionic components (built-in)

---

## 📊 File Statistics

- **Total Files**: ~30
- **TypeScript Files**: 11
- **Documentation Files**: 8
- **Configuration Files**: 6
- **SQL Files**: 2
- **CSS Files**: 1

---

## 🔍 Finding What You Need

**Want to...**
- Modify login? → `src/pages/Login.tsx`
- Add quiz question? → Use Supabase Table Editor or `sample-data.sql`
- Change colors? → `src/index.css` (CSS variables)
- Update database? → `supabase-schema.sql`
- Deploy app? → `DEPLOYMENT.md`
- Understand architecture? → `ARCHITECTURE.md`
- Quick setup? → `QUICKSTART.md`
- Fix bugs? → Check component in `src/pages/`
- Add features? → `CONTRIBUTING.md`

---

**Last Updated:** December 4, 2025