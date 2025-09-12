# Colombia Hope App

This repository contains a Vite + React + TypeScript app configured to deploy automatically to GitHub Pages. No local npm is required — just push to main.

## Development (optional)
If you do have Node locally:

```bash
npm install
npm run dev
```

## Deployment
Deployment is automated via GitHub Actions. On every push to `main`, the app is built and deployed to GitHub Pages.

- App uses `HashRouter` so routes work on Pages.
- Vite `base` is set to `/colombia-hope-app/` for correct asset paths.

Your site will be available at:

https://colombia-cyber.github.io/colombia-hope-app/