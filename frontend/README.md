# Frontend - PatientVoice React Application

This folder contains the complete React frontend application for the PatientVoice Healthcare Feedback System.

## Technology Stack

- **React** 18.2.0 - UI library
- **Vite** 7.1.12 - Build tool and dev server
- **React Router DOM** 6.20.0 - Client-side routing
- **Tailwind CSS** 3.3.6 - Utility-first styling
- **Lucide React** 0.294.0 - Icon library
- **Recharts** - Data visualization
- **Supabase Client** - Backend integration

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (Button, Input, etc.)
│   │   ├── AppIcon.jsx
│   │   ├── AppImage.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages/            # Page components
│   │   ├── login/        # Login page with auth
│   │   ├── feedback-dashboard/    # Main dashboard
│   │   ├── feedback-management/   # Feedback management
│   │   ├── feedback-analytics/    # Analytics & reports
│   │   ├── patient-feedback-form/ # Patient submission form
│   │   ├── reports/      # Report generation
│   │   └── NotFound.jsx  # 404 page
│   ├── services/         # API service layer
│   │   ├── authService.js       # Authentication
│   │   ├── feedbackService.js   # Feedback CRUD
│   │   └── departmentService.js # Department management
│   ├── lib/              # Third-party integrations
│   │   └── supabase.js   # Supabase client config
│   ├── utils/            # Utility functions
│   │   └── cn.js         # className helper
│   ├── styles/           # Global styles
│   │   ├── index.css
│   │   └── tailwind.css  # Custom Tailwind config
│   ├── App.jsx           # Root component
│   ├── Routes.jsx        # Route definitions
│   └── index.jsx         # Entry point
├── index.html            # HTML template
├── vite.config.mjs       # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── jsconfig.json         # JavaScript configuration

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase project configured (see ../backend/README.md)

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment:**
   - Copy `../backend/.env.example` to project root as `.env`
   - Add your Supabase credentials

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Navigate to http://localhost:3000
   - Application will auto-reload on changes

## Available Scripts

### Development
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Key Features

### 🎨 UI/UX Features
- **Animated Backgrounds**: Gradient backgrounds with floating particles
- **Dark Mode**: Toggle for light/dark themes (Login page)
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Glassmorphism**: Modern frosted-glass effects
- **Smooth Animations**: Fade-in, slide, bounce effects
- **Gradient Text**: Eye-catching titles and headers

### 🔐 Authentication
- Email/password login via Supabase Auth
- Session management with localStorage
- Password reset functionality
- Protected routes (coming soon)
- Mock authentication fallback (when Supabase not configured)

### 📊 Dashboard Features
- Real-time feedback statistics
- KPI cards with trend indicators
- Satisfaction charts (line/bar)
- Sentiment analysis visualization
- Department comparison charts
- Recent feedback alerts
- Live mode toggle for real-time updates

### 📝 Feedback Management
- List/grid view toggle
- Advanced filtering (status, department, date, sentiment)
- Bulk actions (assign, respond, escalate)
- Detailed feedback view
- Response management
- Tag categorization
- File attachments support

### 📈 Analytics
- Satisfaction trend analysis
- Department performance comparison
- Sentiment breakdown (positive/neutral/negative)
- Staff performance metrics
- Time-series visualizations
- Export to PDF/Excel

### 📋 Reports
- Custom report builder
- Pre-built templates
- Schedule automated reports
- Report archive
- Email distribution
- Multiple export formats

### 📱 Patient Form
- Multi-step wizard
- Progress indicator
- Rating scales (1-5 stars)
- Text feedback sections
- Anonymous submission option
- Sentiment preview
- Submission confirmation

## Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | FeedbackDashboard | Main dashboard |
| `/login` | LoginPage | Authentication |
| `/feedback-dashboard` | FeedbackDashboard | Dashboard view |
| `/feedback-management` | FeedbackManagement | Manage feedback |
| `/feedback-analytics` | FeedbackAnalytics | Analytics & insights |
| `/reports` | Reports | Report generation |
| `/patient-feedback-form` | PatientFeedbackForm | Patient submission |
| `*` | NotFound | 404 page |

## Component Library

### Base UI Components (`components/ui/`)

**Button**
```jsx
<Button variant="primary" size="md" iconName="Save">
  Save Changes
</Button>
```

**Input**
```jsx
<Input 
  label="Email" 
  type="email" 
  value={email}
  onChange={handleChange}
  error={errors.email}
/>
```

**Select**
```jsx
<Select 
  label="Department"
  options={departments}
  value={selected}
  onChange={handleSelect}
/>
```

**Header**
```jsx
<Header /> // Navigation bar with user menu
```

### Utility Functions

**className helper:**
```javascript
import { cn } from '@/utils/cn';

<div className={cn('base-class', condition && 'conditional-class')} />
```

## Styling

### Tailwind Configuration
- **Colors**: Clinical blues, teals, healthcare-themed palette
- **Fonts**: Inter (primary), JetBrains Mono (code)
- **Animations**: Custom fade-in, slide, bounce, shake effects
- **Shadows**: Clinical-themed shadow system

### Custom Classes
```css
.healthcare-surface  // Surface with border and shadow
.clinical-transition // Smooth transitions
.focus-clinical      // Custom focus states
.card-clinical       // Card styling
.pulse-ambient       // Subtle pulse animation
```

## API Integration

### Services Layer
All API calls go through service files in `src/services/`:

**Authentication:**
```javascript
import { authService } from '@/services/authService';

const { user, profile } = await authService.signIn(email, password);
await authService.signOut();
```

**Feedback:**
```javascript
import { feedbackService } from '@/services/feedbackService';

const feedback = await feedbackService.getFeedback(filters);
await feedbackService.submitFeedback(data);
await feedbackService.updateFeedback(id, updates);
```

**Departments:**
```javascript
import { departmentService } from '@/services/departmentService';

const departments = await departmentService.getDepartments();
```

## State Management

Currently using React's built-in state management:
- `useState` for local component state
- `useEffect` for side effects
- Props drilling for shared state

**Future enhancement:** Consider Redux or Zustand for complex state.

## Performance Optimizations

- ✅ Code splitting with React.lazy (coming soon)
- ✅ Image optimization
- ✅ Vite's fast HMR (Hot Module Replacement)
- ✅ Tree-shaking for smaller bundles
- ✅ Lazy loading for charts
- ✅ Memoization for expensive computations (coming soon)

## Browser Support

- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Build for Production
```bash
npm run build
```

Output in `dist/` folder ready for deployment.

### Recommended Hosting
- **Vercel** (recommended) - Zero config deployment
- **Netlify** - Great for static sites
- **AWS S3 + CloudFront** - Enterprise solution
- **Firebase Hosting** - Google integration

### Environment Variables for Production
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-key
VITE_APP_ENV=production
```

## Troubleshooting

### Dev Server Won't Start
- Check port 3000 is not in use
- Delete `node_modules` and `package-lock.json`, reinstall
- Check Node.js version (18+)

### Supabase Connection Issues
- Verify `.env` file in root directory (not in frontend/)
- Check Supabase credentials are correct
- Restart dev server after changing `.env`

### Build Errors
- Run `npm run lint` to check for errors
- Clear Vite cache: delete `.vite` folder
- Check all imports are correct

### Styling Issues
- Ensure Tailwind is processing correctly
- Check `tailwind.config.js` content paths
- Purge CSS: `npx tailwindcss --purge`

## Contributing

1. Create feature branch from `main`
2. Make changes
3. Test thoroughly
4. Create pull request

## Best Practices

1. ✅ Use functional components with hooks
2. ✅ Keep components small and focused
3. ✅ Use TypeScript for better type safety (migration planned)
4. ✅ Write meaningful commit messages
5. ✅ Test on multiple browsers/devices
6. ✅ Follow accessibility guidelines (WCAG 2.1)
7. ✅ Use semantic HTML
8. ✅ Optimize images before committing

## Security

- ✅ Never commit `.env` files
- ✅ Sanitize user inputs
- ✅ Use Supabase RLS for data protection
- ✅ Implement CSRF protection
- ✅ Keep dependencies updated
- ✅ Use HTTPS in production

## Future Enhancements

- [ ] TypeScript migration
- [ ] Unit tests (Jest + React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] State management (Redux/Zustand)
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Multi-language support (i18n)
- [ ] Advanced data caching
- [ ] WebSocket integration for real-time
- [ ] Accessibility audit

---

**Current Status:** ✅ Fully functional with Supabase integration

For backend setup, see `../backend/README.md`
