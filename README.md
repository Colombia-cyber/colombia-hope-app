# Colombia Hope App

A civic engagement platform for Colombia.

## Features

- Chat
- News Feed
- Surveys & Polls
- Congressional Updates
- Analytics
- Real-time Legislation Tracking

## Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Firebase for authentication
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Colombia-cyber/colombia-hope-app.git
   cd colombia-hope-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Update `src/firebase.ts` with your Firebase configuration

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── assets/
│   ├── images/                    # Colombian flag, eagle, city, etc.
│   └── styles/                    # Global and custom CSS
├── components/                    # Reusable UI blocks
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── StatsBanner.tsx
│   ├── FeatureCards.tsx
│   ├── SearchBar.tsx
│   ├── LiveNewsFeed.tsx           # Colombian, US, Australian, World News
│   ├── TrendingTopics.tsx
│   ├── PollsWidget.tsx            # Gustavo Petro, Elections, Global Polls
│   ├── LegislationFeed.tsx        # Real-time Congress updates
│   ├── CongressLive.tsx           # Live feed from Colombian Congress
│   └── Footer.tsx
├── features/                      # Domain logic/state/context
│   ├── chat/
│   ├── news/
│   ├── legislation/
│   ├── congress/
│   ├── polls/
│   └── analytics/
├── pages/
│   ├── HomePage.tsx               # Main homepage, imports all above components
│   ├── ChatPage.tsx
│   ├── DebatePage.tsx
│   ├── SurveyPage.tsx
│   ├── NewsFeedPage.tsx
│   ├── AnalyticsPage.tsx
│   ├── LegislationPage.tsx
│   └── CongressPage.tsx
├── context/                       # Global app context (user, theme)
├── hooks/                         # Custom hooks
├── utils/                         # Utility functions
├── App.tsx                        # Main app container (routing/providers)
├── index.tsx                      # React entry point
├── index.css                      # Tailwind & global styles
└── firebase.ts                    # Firebase config
```

## Deployment

This app is configured for deployment on Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- Connect your GitHub repository to Vercel for automatic deployments

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.