# NicheTube MVP

A focused, distraction-free video platform for niche content consumption.

## Project Structure

```
nichetube-mvp/
├── frontend/          # React Native (Expo) app
├── backend/           # Firebase Functions and Firestore
└── architecture_blueprint.md
```

## Tech Stack

- **Frontend**: React Native with Expo (TypeScript)
- **Backend**: Firebase Functions (Node.js)
- **Database**: Firestore
- **Authentication**: Firebase Auth

## Prerequisites

✅ Node.js v24.11.1
✅ npm v11.6.2
✅ Firebase CLI v14.26.0
✅ Expo v54.0.16

## Getting Started

### Frontend (Expo App)

```bash
cd frontend
npm start
```

This will start the Expo development server. You can then:
- Press `w` to open in web browser
- Scan QR code with Expo Go app on your phone
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)

### Backend (Firebase Functions)

```bash
cd backend/functions
npm run serve
```

This will start the Firebase emulator for local development.

## Next Steps

1. **Set up Firebase Project**: Create a Firebase project in the Firebase Console
2. **Configure Firebase**: Run `firebase login` and `firebase use --add` in the backend directory
3. **Implement Data Models**: Create Firestore collections (Users, Niches, Videos, Transcripts, Watchlists)
4. **Build API Endpoints**: Implement the API endpoints defined in the architecture blueprint
5. **Create UI Components**: Build the frontend screens (Login, Niche Selection, Feed, Video Player)

## Development Notes

- The backend currently has a "Hello World" function as a starting point
- Firestore rules are set to deny all access by default (update for your use case)
- The frontend is a blank TypeScript template ready for customization

## Architecture

See `architecture_blueprint.md` for detailed architecture, data models, and API specifications.
