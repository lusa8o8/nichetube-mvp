import { Niche, Video, Transcript } from '../types';

// Use relative path in production (Vercel), full URL in dev (Emulator)
const API_BASE_URL = __DEV__
    ? 'http://127.0.0.1:5002/nichetube-mvp/us-central1/api'
    : '/api';

export const apiService = {
    // Get available niches
    async getNiches(): Promise<Niche[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/niches`);
            if (!response.ok) throw new Error('Failed to fetch niches');
            return await response.json();
        } catch (error) {
            console.error('Error fetching niches:', error);
            // Return mock data for now
            return [
                {
                    nicheId: '1',
                    name: 'Advanced JavaScript',
                    description: 'Deep dives into modern JavaScript patterns and techniques',
                    tags: ['programming', 'web development'],
                },
                {
                    nicheId: '2',
                    name: 'Luthier Building Guitar Necks',
                    description: 'Craftsmanship and techniques for building guitar necks',
                    tags: ['woodworking', 'music'],
                },
                {
                    nicheId: '3',
                    name: 'Quantum Computing Basics',
                    description: 'Introduction to quantum computing principles',
                    tags: ['science', 'technology'],
                },
            ];
        }
    },

    // Get video feed based on user's niches
    async getVideoFeed(userId: string): Promise<Video[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/videos/feed`, {
                headers: {
                    'Authorization': `Bearer ${userId}`, // Simplified for MVP
                },
            });
            if (!response.ok) throw new Error('Failed to fetch video feed');
            return await response.json();
        } catch (error) {
            console.error('Error fetching video feed:', error);
            // Return mock data
            return [
                {
                    videoId: 'v1',
                    title: 'Understanding Closures in JavaScript',
                    duration: 1200,
                    nicheId: '1',
                    mockVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                },
                {
                    videoId: 'v2',
                    title: 'Shaping the Perfect Guitar Neck',
                    duration: 1800,
                    nicheId: '2',
                    mockVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                },
            ];
        }
    },

    // Get transcript for a video
    async getTranscript(videoId: string): Promise<Transcript> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/videos/${videoId}/transcript`);
            if (!response.ok) throw new Error('Failed to fetch transcript');
            return await response.json();
        } catch (error) {
            console.error('Error fetching transcript:', error);
            // Return mock data
            return {
                transcriptId: 't1',
                videoId,
                content: `This is a sample transcript for video ${videoId}. In this video, we explore the fundamental concepts and dive deep into the subject matter. The content is designed to be informative and engaging, providing you with valuable insights.\n\nKey points covered:\n- Introduction to the topic\n- Core concepts and principles\n- Practical applications\n- Advanced techniques\n- Summary and conclusions\n\nThis transcript allows you to quickly scan the content before watching the video, ensuring it matches your learning goals.`,
            };
        }
    },

    // Create or update watchlist
    async updateWatchlist(userId: string, videoIds: string[]): Promise<string> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/watchlists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userId}`,
                },
                body: JSON.stringify({ videoIds }),
            });
            if (!response.ok) throw new Error('Failed to update watchlist');
            const data = await response.json();
            return data.watchlistId;
        } catch (error) {
            console.error('Error updating watchlist:', error);
            return 'mock-watchlist-id';
        }
    },
};
