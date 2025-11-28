# NicheTube MVP - Quick Start Guide

## 🎯 What You Can Do Now

### 1. View the Frontend in Your Browser

The Expo development server is running! You can view the app in your browser:

**Option A: Web Browser (Easiest)**
1. Open your browser and go to: `http://localhost:8081`
2. Press `w` in the terminal where Expo is running
3. Or visit the Expo DevTools URL shown in the terminal

**Option B: Mobile Device**
1. Install "Expo Go" app on your phone (iOS or Android)
2. Scan the QR code shown in the terminal
3. The app will load on your phone

### 2. Test the Frontend

The app has 3 screens you can navigate through:

1. **Niche Selection Screen** (First screen)
   - Select 1-3 niches
   - Click "Continue" to proceed

2. **Feed Screen**
   - Browse videos from your selected niches
   - Add videos to watchlist
   - Click on a video to view details

3. **Video Player Screen**
   - View video transcript
   - Search within the transcript
   - Video player placeholder (to be implemented)

### 3. Check Firebase Configuration

To verify Firebase setup, run these commands in PowerShell:

```powershell
# Navigate to backend directory
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend

# Check Firebase CLI
firebase --version

# Login to Firebase (if not already logged in)
firebase login

# List your Firebase projects
firebase projects:list
```

### 4. Start Firebase Emulators (Local Testing)

To test the backend locally without deploying:

```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase emulators:start
```

This will start:
- **Firestore Emulator**: http://localhost:8080
- **Functions Emulator**: http://localhost:5001
- **Emulator UI**: http://localhost:4000

### 5. Seed Mock Data (Optional)

You can manually add test data through the Emulator UI at http://localhost:4000:

**Niches Collection:**
```json
{
  "name": "Advanced JavaScript",
  "description": "Deep dives into modern JavaScript",
  "tags": ["programming", "web"]
}
```

**Videos Collection:**
```json
{
  "title": "Understanding Closures",
  "duration": 1200,
  "nicheId": "<niche-id-here>",
  "mockVideoUrl": "https://example.com/video.mp4"
}
```

## 🔍 How to Visualize Everything

### Frontend (React Native/Expo)
- **URL**: http://localhost:8081
- **What you'll see**: The NicheTube app with dark theme UI
- **How to test**: Click through the screens, select niches, browse videos

### Firebase Emulator UI
- **URL**: http://localhost:4000 (after running `firebase emulators:start`)
- **What you'll see**: 
  - Firestore database viewer
  - Functions logs
  - Real-time data updates

### Check Running Services

```powershell
# See what's running on port 8081 (Expo)
netstat -ano | findstr :8081

# See what's running on port 5001 (Firebase Functions)
netstat -ano | findstr :5001
```

## 📝 Next Steps

1. **Connect to Real Firebase Project**:
   ```powershell
   cd backend
   firebase use --add
   ```

2. **Deploy Functions**:
   ```powershell
   firebase deploy --only functions
   ```

3. **Update Frontend API URL**:
   - Edit `frontend/src/services/api.ts`
   - Change `API_BASE_URL` to your deployed Functions URL

## 🎨 Current Features

✅ Modern dark theme UI
✅ Niche selection (1-3 niches)
✅ Video feed with mock data
✅ Searchable transcripts
✅ Watchlist functionality
✅ Responsive design
✅ TypeScript throughout

## 🚧 To Be Implemented

- Firebase Authentication
- Real video player
- Video upload/hosting
- Advanced search
- User profiles
- Analytics
