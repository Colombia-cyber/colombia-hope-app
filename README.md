# Colombia Hope App

A civic engagement platform for Colombia that connects citizens with their democracy through technology.

## Features

- **Chat Ciudadano**: Connect with other citizens and participate in constructive debates
- **Live News Feed**: Stay informed with verified political and social news
- **Legislative Tracking**: Track the progress of laws and proposals in Congress
- **Live Congress**: Watch live sessions of the Colombian Congress
- **Polls & Surveys**: Participate in surveys and share your opinion on key issues
- **Analytics**: Explore detailed analysis of political trends and public opinion

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Routing**: React Router DOM
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

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view the app in the browser.

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
colombia-hope-app/
├── src/
│   ├── assets/                    # Static assets
│   │   ├── images/               # Image files
│   │   └── styles/               # Global CSS files
│   ├── components/               # Reusable UI components
│   ├── features/                 # Feature-specific components
│   │   ├── chat/
│   │   ├── news/
│   │   ├── legislation/
│   │   ├── congress/
│   │   ├── polls/
│   │   └── analytics/
│   ├── pages/                    # Page components
│   ├── context/                  # React context providers
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Utility functions
│   ├── App.tsx                   # Main app component
│   ├── index.tsx                 # App entry point
│   └── firebase.ts               # Firebase configuration
├── public/                       # Public assets
├── .github/workflows/            # GitHub Actions
└── ...config files
```

## Deployment

The app is configured to deploy automatically to Vercel on pushes to the main branch. 

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Colombia Hope App Team - [contact@colombia-hope.com](mailto:contact@colombia-hope.com)

Project Link: [https://github.com/Colombia-cyber/colombia-hope-app](https://github.com/Colombia-cyber/colombia-hope-app)