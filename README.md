# 🎓 ALS ReviewMate

> A Learning Progress and Reviewer App for Alternative Learning System (ALS) Learners

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![Ionic](https://img.shields.io/badge/Ionic-8.0-3880ff.svg)](https://ionicframework.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.0-3ecf8e.svg)](https://supabase.com/)

## 📖 Overview

ALS ReviewMate is an interactive web and mobile application designed to help Alternative Learning System (ALS) learners prepare for the Test of Equivalency and Secondary (TES). The app provides modular reviewers, quizzes, and progress tracking, allowing ALS teachers to monitor student performance and identify learning gaps to guide instruction effectively.

## ✨ Features

### 🧑‍🎓 For Learners
- **Interactive Review Modules**: Categorized by subject (English, Math, Science, Filipino, Araling Panlipunan)
- **Practice Quizzes**: Multiple choice, true/false questions with instant feedback
- **Immediate Feedback**: Get explanations for correct and incorrect answers
- **Progress Tracking**: Visual reports on scores, mastery levels, and weak topics
- **Subject-based Learning**: Focus on specific areas that need improvement
- **Offline Support**: PWA capabilities for learning without constant internet

### 👩‍🏫 For Teachers
- **Teacher Dashboard**: Overview of student scores and progress
- **Analytics**: Identify which students need attention and in which subjects
- **Individual Reports**: See each student's strengths and weaknesses
- **Subject Performance**: Track class-wide performance across all subjects
- **Focus Areas**: Automatically identify students struggling in specific subjects

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Ionic React + TypeScript |
| **Backend** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Styling** | Ionic Components + CSS |
| **Build Tool** | Vite |
| **Mobile** | Capacitor |
| **Deployment** | Vercel/Netlify (Web) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JustJhong609/ALS-ReviewMate.git
   cd ALS-ReviewMate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   **Troubleshooting npm install:**
   - If you get errors, try: `npm install --legacy-peer-deps`
   - Or use: `npm install --force`
   - Make sure you have Node.js 18+ installed: `node --version`
   - Clear cache if needed: `npm cache clean --force`

3. **Set up Supabase Database**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script to create all tables and policies

4. **Configure Environment**
   - The Supabase URL and key are already configured in `src/lib/supabase.ts`
   - For production, move these to environment variables

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Create an account (learner or teacher)
   - Start exploring!

## 📱 Building for Mobile

### Android

1. **Build the web app**
   ```bash
   npm run build
   ```

2. **Add Android platform**
   ```bash
   npx cap add android
   ```

3. **Sync with Capacitor**
   ```bash
   npx cap sync
   ```

4. **Open in Android Studio**
   ```bash
   npx cap open android
   ```

5. **Build and run** from Android Studio

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles**: User information (learners and teachers)
- **subjects**: Subject categories (English, Math, Science, etc.)
- **topics**: Study materials within each subject
- **quizzes**: Quiz metadata and configuration
- **questions**: Individual quiz questions with answers
- **quiz_attempts**: Student quiz submissions and scores
- **progress**: Student mastery levels per subject

See `supabase-schema.sql` for the complete schema with Row Level Security policies.

## 🎯 User Roles

### Learner
- Register as a learner
- Browse subjects and study materials
- Take quizzes and get instant feedback
- Track progress across all subjects
- View weak areas and focus on improvement

### Teacher
- Register as a teacher
- View dashboard with student analytics
- Identify students who need attention
- See subject-level performance metrics
- Track class-wide averages and trends

## 📊 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |
| Learner Dashboard | `/dashboard` | Subject selection for learners |
| Subject View | `/subject/:id` | Topics and quizzes for a subject |
| Quiz | `/quiz/:id` | Interactive quiz with feedback |
| Progress | `/progress` | Student progress tracking |
| Teacher Dashboard | `/dashboard` | Analytics and student monitoring |

## 🔐 Security

- **Row Level Security (RLS)**: All database tables use Supabase RLS policies
- **Authentication**: Supabase Auth with email/password
- **Authorization**: Role-based access (learner vs teacher)
- **Data Privacy**: Students can only see their own data
- **Teacher Access**: Teachers can view all student data for monitoring

## 🌐 Offline Support

The app is built as a Progressive Web App (PWA) with:
- Service worker for offline caching
- Installable on mobile devices
- Offline-first architecture for core features
- Sync capabilities when connection is restored

## 📈 Future Enhancements

- [ ] Content Management System for teachers to add quizzes
- [ ] Video lessons and multimedia content
- [ ] Discussion forums for peer learning
- [ ] Leaderboards and achievements
- [ ] Export progress reports as PDF
- [ ] SMS notifications for low-data environments
- [ ] Multi-language support (English, Filipino)
- [ ] Advanced analytics with charts
- [ ] Parent/guardian dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **JustJhong609** - *Initial work* - [GitHub](https://github.com/JustJhong609)

## 🙏 Acknowledgments

- Alternative Learning System (ALS) Program
- Department of Education
- All ALS learners and teachers
- Supabase and Ionic Framework communities

## 📧 Contact

For questions, suggestions, or support, please open an issue on GitHub.

---

**Made with ❤️ for ALS Learners**
