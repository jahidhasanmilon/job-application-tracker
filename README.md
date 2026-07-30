# Job Trail — Job Application Tracker

A full-stack job application tracker built with React, TypeScript, Firebase, and Tailwind CSS. Track every application, get automatic follow-up reminders, back up your data anytime, and switch between light and dark mode.

## Features

- Google sign-in (Firebase Authentication) — your data is private to your account
- Full CRUD — add, edit, delete job applications
- Dashboard — total applications, interviews, offers, response rate, status breakdown chart
- Follow-up reminders — applications with a due follow-up date are highlighted
- Search and filter by company, role, or status
- Dark / light mode toggle (saved across sessions)
- One-click JSON backup export and import — your data is never locked in
- Real-time sync via Firestore — works across devices instantly

## Tech Stack

React 19 - TypeScript - Vite - Tailwind CSS v4 - Firebase (Auth + Firestore) - Recharts - Lucide Icons

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create a Firebase project (free)
1. Go to https://console.firebase.google.com -> Add project
2. Once created, click Add app -> Web app, give it a nickname, and copy the firebaseConfig object
3. Paste it into src/firebase.ts, replacing the placeholder values

### 3. Enable Authentication
- In the Firebase console: Build -> Authentication -> Get started
- Enable the Google sign-in provider

### 4. Enable Firestore Database
- Build -> Firestore Database -> Create database (start in production mode, pick a region close to you)
- Go to the Rules tab and paste the contents of firestore.rules from this project, then Publish
  - This ensures each user can only ever read or write their own applications.

### 5. Run locally
```bash
npm run dev
```

### 6. Build for production
```bash
npm run build
```
The output goes to dist/ — deploy it to Vercel, Netlify, or Firebase Hosting.

## Data safety / backup

- All data lives in Firestore, which is replicated across Google's infrastructure — you won't lose data to a crashed laptop or browser cache clear.
- Use the Export button in the header anytime to download a full JSON backup of your applications.
- Use Import to restore from a backup file, or to migrate data between accounts.
- For extra safety at scale, add a scheduled Firebase Cloud Function that exports Firestore to Cloud Storage daily (not included in this starter).

## Project structure
```
src/
  components/    UI components (Header, Dashboard, ApplicationForm, ApplicationTable, StatusBadge, LoginScreen)
  hooks/         useAuth, useApplications (Firestore CRUD + backup), useTheme
  types.ts       JobApplication type + status list/colors
  firebase.ts    Firebase config + initialization
firestore.rules  Security rules — copy into the Firebase console
```

## Next steps / ideas to extend

- Email reminders via a scheduled Cloud Function (SendGrid or Firebase Extensions)
- Kanban board view (drag applications between status columns)
- CSV export alongside JSON
- Multi-user / shared tracking for job-hunting groups
