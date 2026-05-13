# Budgetts

Budgetts is a personal expense tracking web app built with React, TypeScript, Vite, and Firebase.

## Overview

This app allows users to sign in with Google, set a monthly budget, log expenses, edit and delete entries, and review spending trends by day, week, and month.

## Key Features

- Firebase authentication with Google Sign-In
- Budget settings and expenses stored in Firestore
- Dashboard with period filters and category summaries
- Expense creation, editing, and deletion
- Modular architecture using contexts, services, and repositories
- PWA support with manifest and install-ready configuration

## Technologies

- React 19
- TypeScript 6
- Vite
- Firebase
- Tailwind CSS
- ESLint and Prettier

## Installation

```bash
npm install
```

### Local development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment variables

Create a `.env` file in the project root with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> If you use Firebase Hosting or GitHub Actions, add these same values as repository secrets or environment variables.

## Available scripts

```bash
npm run dev         # Start the development server
npm run build       # Build the project for production
npm run preview     # Preview the production build
npm run lint        # Run ESLint on the codebase
npm run lint:fix    # Fix ESLint issues when possible
npm run format      # Check formatting with Prettier
npm run format:fix  # Apply Prettier formatting to project files
npm run fix         # Run format:fix and lint:fix
npm run deploy      # Build and deploy to Firebase Hosting
```

## Project structure

- `src/core`: general configuration, router, auth services, and app logic
- `src/home`: main dashboard, spending overview, and metrics
- `src/expenses`: expense module, components, and services
- `src/reports`: reports page and data visualization
- `src/settings`: user settings and budget preferences
- `src/shared`: reusable components, utilities, and constants
- `src/budgets`: budget-related logic and persistence

## Best practices

- Keep business logic in services and repositories
- Use providers and contexts for shared state
- Separate routes by feature module for easier scaling
- Run `npm run lint` and `npm run format` before merging

## Deployment

```bash
npm run deploy
```

This command builds the app and deploys it to Firebase Hosting.

## Notes

- Make sure Firebase is configured correctly before using the app in production.
- If you change Firebase settings, update the environment variables accordingly.

---

Built to simplify personal expense management with a clean, scalable architecture.
