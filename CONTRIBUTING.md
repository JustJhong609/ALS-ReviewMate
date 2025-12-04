# Contributing to ALS ReviewMate

First off, thank you for considering contributing to ALS ReviewMate! It's people like you that make ALS ReviewMate such a great tool for ALS learners.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. Please be respectful and constructive.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Note your environment** (browser, OS, device)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the proposed enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other apps**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure your code follows the existing style
4. Make sure your code lints without errors
5. Write a clear commit message

## Development Setup

See [SETUP.md](SETUP.md) for detailed instructions.

Quick start:
```bash
git clone https://github.com/JustJhong609/ALS-ReviewMate.git
cd ALS-ReviewMate
npm install
npm run dev
```

## Code Style

- Use TypeScript for all new files
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### TypeScript Guidelines

```typescript
// Good
interface UserProfile {
  id: string;
  fullName: string;
  email: string;
}

const getUser = async (id: string): Promise<UserProfile> => {
  // implementation
};

// Avoid
const getUser = async (id) => {
  // implementation
};
```

### React Component Guidelines

```typescript
// Good - Functional component with clear props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Use Ionic components when possible
import { IonButton } from '@ionic/react';
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, etc.)
├── lib/               # Utilities and configurations
├── pages/             # Page components
│   ├── learner/       # Learner-specific pages
│   └── teacher/       # Teacher-specific pages
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## Database Changes

If you need to modify the database:

1. Update `supabase-schema.sql`
2. Update TypeScript types in `src/lib/supabase.ts`
3. Test migrations locally
4. Document changes in PR description

## Testing

Before submitting a PR:

1. Test login/registration flows
2. Test as both learner and teacher
3. Test on mobile viewport (responsive)
4. Check console for errors
5. Verify database queries work

## Commit Messages

Use clear and meaningful commit messages:

```
Good:
- "Add quiz timer feature"
- "Fix progress calculation bug"
- "Update teacher dashboard analytics"

Avoid:
- "fix stuff"
- "updates"
- "wip"
```

## Areas We Need Help

- [ ] Content creation (quizzes and study materials)
- [ ] UI/UX improvements
- [ ] Mobile app testing
- [ ] Documentation
- [ ] Translations (Filipino/Tagalog)
- [ ] Accessibility improvements
- [ ] Performance optimization

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thank you for contributing! 🎉