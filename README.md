# Colombia Hope App

A modern React + TypeScript + Tailwind CSS + Vite application for building community through dialogue and engagement.

## 🏗️ Project Structure

This project follows modern React best practices with a clean, scalable architecture:

```
src/
├── assets/              # Static assets
│   ├── images/         # Image files
│   ├── icons/          # Icon assets
│   └── fonts/          # Font files
├── components/         # Reusable UI components
│   ├── ui/            # Basic UI components (Button, Card, etc.)
│   ├── forms/         # Form-related components
│   └── layout/        # Layout components (Navbar, Hero, etc.)
├── features/          # Feature-based organization
│   ├── auth/          # Authentication features
│   ├── chat/          # Chat functionality
│   ├── debate/        # Debate features
│   ├── survey/        # Survey functionality
│   └── news/          # News features
├── pages/             # Page components
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── lib/               # External library configurations
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Firebase** - Authentication (placeholder configuration)

## 📁 Architecture Decisions

### Feature-Based Organization
Each feature (auth, chat, debate, etc.) has its own directory containing:
- Components specific to that feature
- Page components
- Types and utilities related to the feature
- Index files for clean exports

### Component Structure
- **UI Components**: Basic, reusable components (Button, Card, Input)
- **Layout Components**: Components for page layout (Navbar, Hero)
- **Form Components**: Form-specific reusable components
- **Feature Components**: Components specific to business features

### Path Aliases
Configured path aliases for cleaner imports:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/features/*` → `src/features/*`
- `@/hooks/*` → `src/hooks/*`
- And more...

### TypeScript Integration
- Comprehensive type definitions in `src/types/`
- Proper typing for all components and functions
- Firebase integration with proper types

### Custom Hooks
- `useAuth` - Authentication state management
- `useLocalStorage` - Local storage utilities

### Context Providers
- `AuthProvider` - Global authentication state

## 🎨 Styling

The project uses Tailwind CSS with:
- Responsive design patterns
- Glass effect utility class for modern UI
- Consistent spacing and typography
- Proper color schemes

## 🔧 Configuration

- **Vite**: Configured with path aliases and React plugin
- **TypeScript**: Strict mode with path mapping
- **Tailwind**: Configured for all source files
- **PostCSS**: Integrated with Tailwind and Autoprefixer

## 📝 Development Guidelines

1. **Components**: Create reusable components in the appropriate category
2. **Features**: Organize related functionality in feature directories
3. **Types**: Define TypeScript types in the types directory
4. **Imports**: Use path aliases for cleaner import statements
5. **Styling**: Use Tailwind classes for consistent styling

## 🚀 Deployment

The app is configured for GitHub Pages deployment with the base path `/colombia-hope-app/`.

Build and deployment is handled through GitHub Actions (see `.github/workflows/deploy.yml`).