# Populate Firestore with Sample Data

## Quick Setup

### 1. Get Service Account Key

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project (nichetube-mvp)
3. Click the gear icon ⚙️ → **Project settings**
4. Go to **Service accounts** tab
5. Click **Generate new private key**
6. Save the JSON file as `serviceAccountKey.json` in the `backend` folder

### 2. Run the Script

```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
node populate-data.js
```

## What This Script Does

Automatically adds to your Firestore database:

**3 Niches:**
- Advanced JavaScript
- Luthier Building Guitar Necks
- Quantum Computing Basics

**5 Videos:**
- Understanding Closures in JavaScript
- Async/Await Patterns and Best Practices
- Shaping the Perfect Guitar Neck
- Fretboard Radius Techniques
- Introduction to Qubits

**5 Transcripts:**
- Full searchable transcripts for each video

**1 Demo User:**
- Email: demo@nichetube.com
- Selected niches: JavaScript and Guitar Building

## After Running

1. Check Firebase Console to see your data
2. Update frontend API URL in `frontend/src/services/api.ts`
3. Restart Expo server
4. Test the app with real data!

## Troubleshooting

**Error: "Cannot find module 'firebase-admin'"**
```powershell
cd backend
npm install firebase-admin
```

**Error: "Service account key not found"**
- Make sure `serviceAccountKey.json` is in the `backend` folder
- Check the filename is exactly `serviceAccountKey.json`
