# Colombia Hope App - React/TypeScript Application

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

Colombia Hope is a React/TypeScript web application built with Vite, using Tailwind CSS for styling. It's a civic engagement platform for Colombia with features for chat, debates, surveys, and news.

## Quick Start - Development Setup

**CRITICAL**: Run these commands in order. DO NOT skip any step.

1. **Install dependencies** (takes ~6 seconds):
   ```bash
   npm install
   ```
   
2. **Start development server** (starts in ~216ms):
   ```bash
   npm run dev
   ```
   - Serves at: `http://localhost:5173/colombia-hope-app/`
   - Hot reload enabled
   - NEVER CANCEL - development server runs continuously

3. **Build for production** (takes ~2 seconds):
   ```bash
   npm run build
   ```
   - Output: `dist/` directory
   - NEVER CANCEL - Set timeout to 30+ seconds for safety

4. **Preview production build**:
   ```bash
   npm run preview
   ```
   - Serves at: `http://localhost:4173/colombia-hope-app/`

## Validation Requirements

**ALWAYS perform these validation steps after making changes:**

### TypeScript Validation
```bash
npx tsc --noEmit
```
- Must complete with exit code 0
- Takes ~5 seconds
- Set timeout to 60+ seconds

### Manual UI Testing
**CRITICAL**: After any UI changes, ALWAYS test these scenarios:

1. **Basic Navigation Test**:
   - Load home page at `http://localhost:5173/colombia-hope-app/`
   - Click "Chat" - should show "Chat functionality coming soon"
   - Click "Debate" - should show "Debate functionality coming soon" 
   - Click "Survey" - should show "Survey functionality coming soon"
   - Click "News" - should show news page
   - Click "Home" - should return to welcome page
   - Verify active navigation state updates correctly

2. **Page Load Test**:
   - Verify page loads without console errors
   - Confirm Spanish text displays: "Bienvenidos a Colombia Hope"
   - Confirm subtitle: "Comparte, debate, y construye comunidad con esperanza"

3. **Responsive Design Test**:
   - Test navigation responsiveness
   - Verify Tailwind CSS styles apply correctly

### Build Validation
```bash
npm run build && npm run preview
```
- Build must complete successfully
- Preview server must start without errors
- Manually test one navigation scenario in preview mode

## Timing Expectations

- **npm install**: ~6 seconds
- **npm run dev**: Starts in ~216ms, runs continuously  
- **npm run build**: ~2 seconds
- **npm run preview**: Starts immediately after build
- **TypeScript check**: ~5 seconds

**NEVER CANCEL any of these commands.** Set timeouts to 60+ seconds minimum.

## Known Issues

- **Security vulnerabilities**: 2 moderate severity issues in esbuild dependency
  - `npm audit` will show warnings
  - DO NOT run `npm audit fix --force` as it introduces breaking changes
  - These are development-only dependencies and don't affect production

## Technology Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.8
- **Styling**: Tailwind CSS 3.4.12 with PostCSS
- **Routing**: React Router DOM 6.26.1 (Hash Router)
- **Authentication**: Firebase (configured but not actively used)

## Project Structure

```
src/
├── components/
│   ├── AuthStatus.jsx    # Firebase auth (not in use)
│   ├── Hero.tsx          # Homepage hero component
│   └── Navbar.tsx        # Main navigation
├── pages/
│   ├── ChatPage.tsx      # Chat functionality (placeholder)
│   ├── DebatePage.tsx    # Debate functionality (placeholder)
│   ├── NewsFeed.tsx      # News page
│   └── SurveyPage.tsx    # Survey functionality (placeholder)
├── App.tsx               # Main app with routing
├── main.tsx              # React entry point
├── index.css             # Tailwind imports + custom styles
└── firebase.js           # Firebase config (placeholder values)
```

## Important Configuration Files

- `vite.config.ts`: Vite configuration with React plugin and base path
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `package.json`: Dependencies and scripts
- `.github/workflows/deploy.yml`: GitHub Pages deployment

## Development Guidelines

### When Making Changes:
1. **ALWAYS** start development server first: `npm run dev`
2. **ALWAYS** test TypeScript compilation: `npx tsc --noEmit`
3. **ALWAYS** perform manual UI validation scenarios
4. **ALWAYS** test build process before committing: `npm run build`

### Adding New Features:
- Follow existing component patterns in `src/components/` and `src/pages/`
- Use Tailwind CSS classes for styling
- Maintain TypeScript strict mode compliance
- Add new routes to `src/App.tsx` following existing pattern

### Styling:
- Use Tailwind CSS utilities
- Custom styles in `src/index.css` (minimal custom CSS)
- Glass effect utility available: `.glass` class

### Firebase Integration:
- Firebase config exists in `src/firebase.js` but uses placeholder values
- AuthStatus component available but not integrated
- If implementing auth, update firebase config with real values

## CI/CD Information

- **Deployment**: Automatic to GitHub Pages via `.github/workflows/deploy.yml`
- **Trigger**: Pushes to `main` branch
- **Build**: Uses Node.js 20, runs `npm install` then `npm run build`
- **Output**: Deploys `dist/` folder to GitHub Pages

## URLs and Access

- **Development**: `http://localhost:5173/colombia-hope-app/`
- **Preview**: `http://localhost:4173/colombia-hope-app/`
- **Production**: Deployed via GitHub Pages (check repository settings)

## Common Commands Reference

```bash
# Install dependencies
npm install

# Start development (continuous)
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Check TypeScript
npx tsc --noEmit

# View available scripts
npm run
```

## Troubleshooting

- **Build fails**: Check TypeScript errors with `npx tsc --noEmit`
- **Styles not loading**: Verify Tailwind imports in `src/index.css`
- **Routing issues**: Check React Router configuration in `src/App.tsx`
- **Dev server won't start**: Ensure port 5173 is available
- **Firebase errors**: Firebase config uses placeholder values, expect console warnings

**Remember**: ALWAYS validate changes through manual testing. This application requires UI interaction testing to ensure proper functionality.