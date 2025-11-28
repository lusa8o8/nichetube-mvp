const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Get all available niches
app.get("/api/niches", async (req, res) => {
  try {
    const nichesSnapshot = await db.collection("niches").get();
    const niches = nichesSnapshot.docs.map(doc => ({
      nicheId: doc.id,
      ...doc.data()
    }));

    res.json(niches);
  } catch (error) {
    console.error("Error getting niches:", error);
    res.status(500).json({ error: "Failed to fetch niches" });
  }
});

// Get video feed based on user's selected niches
app.get("/api/videos/feed", async (req, res) => {
  try {
    // Get userId from authorization header (simplified for MVP)
    const userId = req.headers.authorization?.replace('Bearer ', '');

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Get user's selected niches
    const userDoc = await db.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const userData = userDoc.data();
    const selectedNiches = userData.selectedNiches || [];

    // Get videos from selected niches
    const videosSnapshot = await db.collection("videos")
      .where("nicheId", "in", selectedNiches.length > 0 ? selectedNiches : [""])
      .get();

    const videos = videosSnapshot.docs.map(doc => ({
      videoId: doc.id,
      ...doc.data()
    }));

    res.json(videos);
  } catch (error) {
    console.error("Error getting video feed:", error);
    res.status(500).json({ error: "Failed to fetch video feed" });
  }
});

// Get transcript for a specific video
app.get("/api/videos/:videoId/transcript", async (req, res) => {
  try {
    const { videoId } = req.params;

    const transcriptSnapshot = await db.collection("transcripts")
      .where("videoId", "==", videoId)
      .limit(1)
      .get();

    if (transcriptSnapshot.empty) {
      res.status(404).json({ error: "Transcript not found" });
      return;
    }

    const transcript = {
      transcriptId: transcriptSnapshot.docs[0].id,
      ...transcriptSnapshot.docs[0].data()
    };

    res.json(transcript);
  } catch (error) {
    console.error("Error getting transcript:", error);
    res.status(500).json({ error: "Failed to fetch transcript" });
  }
});

// Create or update watchlist
app.post("/api/watchlists", async (req, res) => {
  try {
    const userId = req.headers.authorization?.replace('Bearer ', '');
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { videoIds } = req.body;

    // Check if watchlist exists for user
    const watchlistSnapshot = await db.collection("watchlists")
      .where("userId", "==", userId)
      .limit(1)
      .get();

    let watchlistId;
    if (watchlistSnapshot.empty) {
      // Create new watchlist
      const newWatchlist = await db.collection("watchlists").add({
        userId,
        videoIds,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      watchlistId = newWatchlist.id;
    } else {
      // Update existing watchlist
      watchlistId = watchlistSnapshot.docs[0].id;
      await db.collection("watchlists").doc(watchlistId).update({
        videoIds
      });
    }

    res.json({ watchlistId });
  } catch (error) {
    console.error("Error updating watchlist:", error);
    res.status(500).json({ error: "Failed to update watchlist" });
  }
});

// Create user with selected niches
app.post("/api/users", async (req, res) => {
  try {
    const { email, selectedNiches } = req.body;

    const userRef = await db.collection("users").add({
      email,
      selectedNiches,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ userId: userRef.id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

exports.api = functions.https.onRequest(app);
