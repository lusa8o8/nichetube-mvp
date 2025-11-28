# Firebase Setup Guide

## Step 1: Login to Firebase

```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase login
```

This will open your browser to authenticate with Google.

## Step 2: Create or Select a Firebase Project

### Option A: Create New Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "nichetube-mvp"
4. Disable Google Analytics (optional for MVP)
5. Click "Create project"

### Option B: Use Existing Project
```powershell
firebase projects:list
firebase use <project-id>
```

## Step 3: Initialize Firebase in Your Project

```powershell
# If you haven't already, link your project
firebase use --add

# Select your project from the list
# Give it an alias like "default" or "dev"
```

## Step 4: Enable Required Services

In the Firebase Console (https://console.firebase.google.com/):

1. **Firestore Database**
   - Go to "Firestore Database"
   - Click "Create database"
   - Start in "Test mode" (for development)
   - Choose a location (e.g., us-central)

2. **Functions**
   - Go to "Functions"
   - Click "Get started"
   - Upgrade to Blaze plan (pay-as-you-go, has free tier)

3. **Authentication** (Optional for now)
   - Go to "Authentication"
   - Click "Get started"
   - Enable "Email/Password" provider

## Step 5: Deploy Firestore Rules and Indexes

```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase deploy --only firestore
```

## Step 6: Deploy Functions

```powershell
firebase deploy --only functions
```

This will deploy all your API endpoints:
- `getNiches`
- `getVideoFeed`
- `getTranscript`
- `updateWatchlist`
- `createUser`

## Step 7: Get Your Function URLs

After deployment, you'll see URLs like:
```
✔  functions[getNiches(us-central1)]: https://us-central1-nichetube-mvp.cloudfunctions.net/getNiches
✔  functions[getVideoFeed(us-central1)]: https://us-central1-nichetube-mvp.cloudfunctions.net/getVideoFeed
```

## Step 8: Update Frontend API Configuration

Edit `frontend/src/services/api.ts`:

```typescript
const API_BASE_URL = 'https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net';
```

Replace `YOUR-PROJECT-ID` with your actual Firebase project ID.

## Step 9: Add Sample Data to Firestore

### Using Firebase Console:
1. Go to Firestore Database
2. Click "Start collection"
3. Add collections and documents as shown below

### Using Firebase Emulator (Local Testing):
```powershell
firebase emulators:start
```

Then visit http://localhost:4000 to add data through the UI.

## Sample Data Structure

### Niches Collection
```
Collection: niches

Document ID: niche1
{
  name: "Advanced JavaScript",
  description: "Deep dives into modern JavaScript patterns",
  tags: ["programming", "web development"]
}

Document ID: niche2
{
  name: "Luthier Building Guitar Necks",
  description: "Craftsmanship techniques for guitar necks",
  tags: ["woodworking", "music"]
}

Document ID: niche3
{
  name: "Quantum Computing Basics",
  description: "Introduction to quantum computing",
  tags: ["science", "technology"]
}
```

### Videos Collection
```
Collection: videos

Document ID: video1
{
  title: "Understanding Closures in JavaScript",
  duration: 1200,
  nicheId: "niche1",
  mockVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
}

Document ID: video2
{
  title: "Shaping the Perfect Guitar Neck",
  duration: 1800,
  nicheId: "niche2",
  mockVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
}
```

### Transcripts Collection
```
Collection: transcripts

Document ID: transcript1
{
  videoId: "video1",
  content: "In this video, we'll explore JavaScript closures. A closure is a function that has access to variables in its outer scope, even after the outer function has returned. This is a powerful feature that enables data privacy and functional programming patterns..."
}

Document ID: transcript2
{
  videoId: "video2",
  content: "Welcome to this tutorial on shaping guitar necks. We'll start by selecting the right wood, then move on to the carving process. The neck profile is crucial for playability..."
}
```

### Users Collection
```
Collection: users

Document ID: demo-user-123
{
  email: "demo@nichetube.com",
  selectedNiches: ["niche1", "niche2"],
  createdAt: <timestamp>
}
```

## Step 10: Test Your Setup

### Test with Emulators (Local)
```powershell
# Terminal 1: Start Firebase emulators
cd backend
firebase emulators:start

# Terminal 2: Start frontend (already running)
cd frontend
npm start
```

### Test with Production
1. Make sure functions are deployed
2. Update API_BASE_URL in frontend
3. Restart Expo server
4. Test the app

## Verification Commands

```powershell
# Check Firebase CLI version
firebase --version

# List your projects
firebase projects:list

# Check current project
firebase use

# View function logs
firebase functions:log

# View Firestore data
# (Use Firebase Console web interface)
```

## Troubleshooting

### "Firebase CLI not found"
```powershell
npm install -g firebase-tools
```

### "Not authorized"
```powershell
firebase logout
firebase login
```

### "Functions deployment failed"
```powershell
cd backend/functions
npm install
cd ..
firebase deploy --only functions
```

### "CORS errors in frontend"
Add CORS handling to your functions:
```javascript
const cors = require('cors')({origin: true});

exports.getNiches = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    // Your function code here
  });
});
```

## Cost Estimate (MVP Scale - 1000 users)

**Free Tier Includes**:
- Firestore: 50K reads, 20K writes, 20K deletes per day
- Functions: 2M invocations, 400K GB-seconds per month
- Hosting: 10 GB storage, 360 MB/day transfer

**Expected Monthly Cost**: $0 - $5 (well within free tier for MVP)

## Next Steps After Setup

1. ✅ Firebase project created
2. ✅ Firestore enabled
3. ✅ Functions deployed
4. ✅ Sample data added
5. ✅ Frontend connected
6. 🔜 Add authentication
7. 🔜 Implement video hosting
8. 🔜 Add analytics
