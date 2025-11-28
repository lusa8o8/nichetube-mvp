# PowerShell Commands Reference

## Navigation Commands

### Go to Project Root
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp
```

### Go to Frontend Directory
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\frontend
```

### Go to Backend Directory
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
```

## Frontend Commands

### Start Expo Development Server
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\frontend
npm start
```

### Open in Web Browser (while Expo is running)
Press `w` in the terminal, or:
```powershell
Start-Process "http://localhost:8081"
```

### Check if Frontend is Running
```powershell
netstat -ano | findstr :8081
```

## Backend Commands

### Check Firebase CLI Version
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase --version
```

### Login to Firebase
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase login
```

### List Firebase Projects
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase projects:list
```

### Select Firebase Project
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase use --add
```

### Start Firebase Emulators (Local Testing)
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase emulators:start
```

### Deploy Firebase Functions
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase deploy --only functions
```

### Deploy Firestore Rules
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase deploy --only firestore
```

### Install Backend Dependencies
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend\functions
npm install
```

## Checking Running Services

### Check What's Running on Port 8081 (Expo)
```powershell
netstat -ano | findstr :8081
```

### Check What's Running on Port 5001 (Firebase Functions)
```powershell
netstat -ano | findstr :5001
```

### Check What's Running on Port 4000 (Firebase Emulator UI)
```powershell
netstat -ano | findstr :4000
```

## Opening URLs in Browser

### Open Expo Web App
```powershell
Start-Process "http://localhost:8081"
```

### Open Firebase Emulator UI (after starting emulators)
```powershell
Start-Process "http://localhost:4000"
```

### Open Firestore Emulator
```powershell
Start-Process "http://localhost:8080"
```

## Useful PowerShell Tips

### Run Multiple Commands in Sequence
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend; firebase --version
```

### List Files in Current Directory
```powershell
ls
# or
dir
```

### View File Contents
```powershell
Get-Content README.md
# or
cat README.md
```

### Clear Terminal
```powershell
cls
# or
clear
```

## Common Errors and Fixes

### Error: "firebase: command not found"
**Fix**: Install Firebase CLI globally
```powershell
npm install -g firebase-tools
```

### Error: "Permission denied"
**Fix**: Run PowerShell as Administrator
- Right-click PowerShell
- Select "Run as Administrator"

### Error: "Port already in use"
**Fix**: Find and kill the process
```powershell
# Find process on port 8081
netstat -ano | findstr :8081

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

## Quick Start Workflow

### 1. Start Frontend (Terminal 1)
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\frontend
npm start
# Press 'w' to open in browser
```

### 2. Start Backend Emulators (Terminal 2)
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend
firebase emulators:start
```

### 3. Open Emulator UI (Terminal 3)
```powershell
Start-Process "http://localhost:4000"
```

## Environment Variables

### Set Environment Variable (Current Session)
```powershell
$env:API_URL = "http://localhost:5001"
```

### View Environment Variable
```powershell
echo $env:API_URL
```

## Git Commands (if using version control)

### Initialize Git Repository
```powershell
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp
git init
```

### Check Git Status
```powershell
git status
```

### Add All Files
```powershell
git add .
```

### Commit Changes
```powershell
git commit -m "Initial commit"
```

## Troubleshooting

### Check Node.js Version
```powershell
node -v
```

### Check npm Version
```powershell
npm -v
```

### Check Git Version
```powershell
git --version
```

### Restart Expo Server
Press `Ctrl+C` in the terminal running Expo, then:
```powershell
npm start
```

### Clear npm Cache
```powershell
npm cache clean --force
```

### Reinstall Dependencies
```powershell
# Frontend
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\frontend
Remove-Item -Recurse -Force node_modules
npm install

# Backend
cd C:\Users\Lusa\.gemini\antigravity\scratch\nichetube-mvp\backend\functions
Remove-Item -Recurse -Force node_modules
npm install
```
