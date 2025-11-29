const admin = require('firebase-admin');
const YouTubeService = require('./functions/services/youtube');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Get YouTube API key from command line argument
const youtubeApiKey = process.argv[2];

if (!youtubeApiKey) {
    console.error('❌ Error: YouTube API key is required');
    console.log('Usage: node populate-youtube-videos.js YOUR_YOUTUBE_API_KEY');
    process.exit(1);
}

const youtubeService = new YouTubeService(youtubeApiKey);

// Define niches and their search keywords
const nicheConfigs = [
    {
        nicheId: 'niche1',
        name: 'Advanced JavaScript',
        keywords: 'advanced javascript tutorial closures async await',
        maxResults: 10
    },
    {
        nicheId: 'niche2',
        name: 'Luthier Building Guitar Necks',
        keywords: 'guitar neck building luthier tutorial',
        maxResults: 10
    },
    {
        nicheId: 'niche3',
        name: 'Quantum Computing Basics',
        keywords: 'quantum computing explained tutorial basics',
        maxResults: 10
    }
];

async function populateYouTubeVideos() {
    console.log('🎬 Starting to populate videos from YouTube...\n');

    try {
        for (const config of nicheConfigs) {
            console.log(`\n📺 Fetching videos for: ${config.name}`);
            console.log(`   Search query: "${config.keywords}"`);

            // Fetch videos from YouTube
            const videos = await youtubeService.searchVideos(config.keywords, config.maxResults);

            console.log(`   Found ${videos.length} videos`);

            // Save to Firestore
            const batch = db.batch();

            for (const video of videos) {
                const videoRef = db.collection('videos').doc();
                const videoData = {
                    ...video,
                    nicheId: config.nicheId,
                    videoId: videoRef.id,
                    createdAt: admin.firestore.FieldValue.serverTimestamp()
                };

                batch.set(videoRef, videoData);
                console.log(`   ✓ ${video.title.substring(0, 50)}...`);
            }

            await batch.commit();
            console.log(`   ✅ Saved ${videos.length} videos to Firestore`);

            // Small delay to avoid hitting rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('\n\n🎉 Successfully populated all videos from YouTube!');
        console.log('\n📊 Summary:');

        const videosSnapshot = await db.collection('videos').get();
        console.log(`   Total videos in database: ${videosSnapshot.size}`);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error populating videos:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        process.exit(1);
    }
}

populateYouTubeVideos();
