const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function populateSampleData() {
    console.log('Starting to populate sample data...\n');

    try {
        // Add Niches
        console.log('Adding niches...');
        const nichesData = [
            {
                id: 'niche1',
                data: {
                    name: 'Advanced JavaScript',
                    description: 'Deep dives into modern JavaScript patterns and techniques',
                    tags: ['programming', 'web development']
                }
            },
            {
                id: 'niche2',
                data: {
                    name: 'Luthier Building Guitar Necks',
                    description: 'Craftsmanship and techniques for building guitar necks',
                    tags: ['woodworking', 'music']
                }
            },
            {
                id: 'niche3',
                data: {
                    name: 'Quantum Computing Basics',
                    description: 'Introduction to quantum computing principles',
                    tags: ['science', 'technology']
                }
            }
        ];

        for (const niche of nichesData) {
            await db.collection('niches').doc(niche.id).set(niche.data);
            console.log(`✓ Added niche: ${niche.data.name}`);
        }

        // Add Videos
        console.log('\nAdding videos...');
        const videosData = [
            {
                id: 'video1',
                data: {
                    title: 'Understanding Closures in JavaScript',
                    duration: 1200,
                    nicheId: 'niche1',
                    mockVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                }
            },
            {
                id: 'video2',
                data: {
                    title: 'Async/Await Patterns and Best Practices',
                    duration: 1500,
                    nicheId: 'niche1',
                    mockVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                }
            },
            {
                id: 'video3',
                data: {
                    title: 'Shaping the Perfect Guitar Neck',
                    duration: 1800,
                    nicheId: 'niche2',
                    mockVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                }
            },
            {
                id: 'video4',
                data: {
                    title: 'Fretboard Radius Techniques',
                    duration: 1350,
                    nicheId: 'niche2',
                    mockVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
                }
            },
            {
                id: 'video5',
                data: {
                    title: 'Introduction to Qubits',
                    duration: 1650,
                    nicheId: 'niche3',
                    mockVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
                }
            }
        ];

        for (const video of videosData) {
            await db.collection('videos').doc(video.id).set(video.data);
            console.log(`✓ Added video: ${video.data.title}`);
        }

        // Add Transcripts
        console.log('\nAdding transcripts...');
        const transcriptsData = [
            {
                id: 'transcript1',
                data: {
                    videoId: 'video1',
                    content: `Welcome to this deep dive into JavaScript closures. In this video, we'll explore one of the most powerful and sometimes confusing features of JavaScript.

A closure is a function that has access to variables in its outer scope, even after the outer function has returned. This creates a private scope that persists.

Key concepts we'll cover:
- Lexical scoping and how it works
- Creating private variables with closures
- Common use cases and patterns
- Performance considerations
- Real-world examples

Let's start with a simple example. When you define a function inside another function, the inner function has access to the outer function's variables. This is the foundation of closures.

Closures are commonly used for data privacy, creating factory functions, and implementing the module pattern. Understanding closures is essential for mastering JavaScript and writing clean, maintainable code.`
                }
            },
            {
                id: 'transcript2',
                data: {
                    videoId: 'video2',
                    content: `In this tutorial, we'll explore async/await patterns in modern JavaScript. Async/await makes asynchronous code look and behave more like synchronous code, making it easier to read and maintain.

Topics covered:
- Understanding Promises as the foundation
- Converting Promise chains to async/await
- Error handling with try/catch
- Parallel vs sequential execution
- Best practices and common pitfalls

The async keyword transforms a function to return a Promise automatically. The await keyword pauses execution until the Promise resolves, but doesn't block the entire program.

We'll look at real-world scenarios like API calls, file operations, and database queries. You'll learn when to use Promise.all() for parallel operations and how to handle errors gracefully.

By the end of this video, you'll be confident using async/await in your projects and understanding when it's the right tool for the job.`
                }
            },
            {
                id: 'transcript3',
                data: {
                    videoId: 'video3',
                    content: `Welcome to this comprehensive guide on shaping guitar necks. The neck is one of the most critical components of a guitar, affecting both playability and tone.

In this video, we'll cover:
- Selecting the right wood species
- Understanding neck profiles (C, V, U shapes)
- Tools and techniques for carving
- Achieving consistent thickness
- Sanding and finishing techniques

We'll start by examining different wood types. Maple is traditional for its stability and bright tone, while mahogany offers warmth. The grain pattern affects both aesthetics and structural integrity.

The carving process requires patience and precision. We'll use spokeshaves, rasps, and sandpaper to gradually shape the neck. Measuring frequently ensures consistency along the entire length.

The neck profile dramatically affects how the guitar feels in your hand. We'll explore different shapes and help you understand which works best for different playing styles.`
                }
            },
            {
                id: 'transcript4',
                data: {
                    videoId: 'video4',
                    content: `Today we're focusing on fretboard radius techniques. The radius is the curvature across the width of the fretboard, and it significantly impacts playability.

Key topics:
- Understanding radius measurements (7.25", 9.5", 12", compound)
- Tools: radius blocks, sanding beams
- Achieving uniform curvature
- Checking your work with radius gauges
- Modern vs vintage radius preferences

Vintage Fender guitars typically used a 7.25" radius, which feels rounder and is great for chord work. Modern guitars often use flatter radii like 12" or 16", which are better for string bending and faster playing.

Compound radius fretboards combine both worlds - rounder at the nut for comfortable chording, flatter at the higher frets for lead playing. We'll demonstrate how to create this gradual transition.

The sanding process requires consistent pressure and frequent checking. We'll show you how to use radius gauges to verify your work and make adjustments.`
                }
            },
            {
                id: 'transcript5',
                data: {
                    videoId: 'video5',
                    content: `Welcome to Introduction to Qubits - the fundamental unit of quantum computing. Unlike classical bits that are either 0 or 1, qubits can exist in superposition, being both simultaneously.

What we'll explore:
- Classical bits vs quantum bits
- Superposition and what it means
- Quantum entanglement basics
- Measurement and wave function collapse
- Why this matters for computing

A qubit can be implemented using various physical systems - electron spin, photon polarization, or superconducting circuits. The key is that they can exist in multiple states at once until measured.

This superposition property is what gives quantum computers their potential power. While a classical computer with 3 bits can be in one of 8 states at a time, 3 qubits can be in all 8 states simultaneously.

When we measure a qubit, the superposition collapses to either 0 or 1. This probabilistic nature is fundamental to quantum mechanics and requires new ways of thinking about computation.

Understanding qubits is the first step toward grasping quantum algorithms and the future of computing.`
                }
            }
        ];

        for (const transcript of transcriptsData) {
            await db.collection('transcripts').doc(transcript.id).set(transcript.data);
            console.log(`✓ Added transcript for video: ${transcript.data.videoId}`);
        }

        // Add Demo User
        console.log('\nAdding demo user...');
        await db.collection('users').doc('demo-user-123').set({
            email: 'demo@nichetube.com',
            selectedNiches: ['niche1', 'niche2'],
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('✓ Added demo user');

        console.log('\n✅ Sample data population complete!');
        console.log('\nSummary:');
        console.log('- 3 niches');
        console.log('- 5 videos');
        console.log('- 5 transcripts');
        console.log('- 1 demo user');

    } catch (error) {
        console.error('❌ Error populating data:', error);
    }

    process.exit(0);
}

populateSampleData();
