# Colombia Hope App

A comprehensive civic engagement platform for Colombia featuring news feeds, congressional updates, polls, and community interaction.

## Features

- **Live News Feed** - Colombian, US, Australian, and World News
- **Congress Live** - Real-time feed from Colombian Congress
- **Legislation Feed** - Real-time Congress updates
- **Polls Widget** - Gustavo Petro, Elections, Global Polls
- **Trending Topics** - Current civic discussions
- **Chat & Debate** - Community engagement
- **Analytics** - Civic engagement insights
- **Survey System** - Public opinion collection

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Build Tool**: Vite
- **Authentication**: Firebase Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18 or higher
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

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
colombia-hope-app/
├── src/
│   ├── assets/
│   │   ├── images/                    # Colombian flag, eagle, city, etc.
│   │   └── styles/                    # Global and custom CSS
│   ├── components/                    # Reusable UI blocks
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── StatsBanner.tsx
│   │   ├── FeatureCards.tsx
│   │   ├── SearchBar.tsx
│   │   ├── LiveNewsFeed.tsx           # Colombian, US, Australian, World News
│   │   ├── TrendingTopics.tsx
│   │   ├── PollsWidget.tsx            # Gustavo Petro, Elections, Global Polls
│   │   ├── LegislationFeed.tsx        # Real-time Congress updates
│   │   ├── CongressLive.tsx           # Live feed from Colombian Congress
│   │   └── Footer.tsx
│   ├── features/                      # Domain logic/state/context
│   │   ├── chat/
│   │   ├── news/
│   │   ├── legislation/
│   │   ├── congress/
│   │   ├── polls/
│   │   └── analytics/
│   ├── pages/
│   │   ├── HomePage.tsx               # Main homepage, imports all above components
│   │   ├── ChatPage.tsx
│   │   ├── DebatePage.tsx
│   │   ├── SurveyPage.tsx
│   │   ├── NewsFeedPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── LegislationPage.tsx
│   │   └── CongressPage.tsx
│   ├── context/                       # Global app context (user, theme)
│   ├── hooks/                         # Custom hooks
│   ├── utils/                         # Utility functions
│   ├── App.tsx                        # Main app container (routing/providers)
│   ├── index.tsx                      # React entry point
│   ├── index.css                      # Tailwind & global styles
│   └── firebase.ts                    # Firebase config
├── public/
│   └── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── .github/
    └── workflows/
        └── deploy.yml                 # Vercel deployment workflow
```

## Deployment

The app is configured for automatic deployment to Vercel through GitHub Actions.

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service.

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables for Firebase

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Colombia Cyber - [GitHub](https://github.com/Colombia-cyber)

Project Link: [https://github.com/Colombia-cyber/colombia-hope-app](https://github.com/Colombia-cyber/colombia-hope-app)