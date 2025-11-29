// User types
export interface User {
    userId: string;
    email: string;
    selectedNiches: string[];
    createdAt: Date;
}

// Niche types
export interface Niche {
    nicheId: string;
    name: string;
    description: string;
    tags: string[];
}

// Video types
export interface Video {
    videoId: string;
    youtubeId?: string; // YouTube video ID
    title: string;
    description?: string;
    thumbnailUrl?: string; // YouTube thumbnail URL
    duration: number; // in seconds
    nicheId: string;
    channelName?: string; // YouTube channel name
    viewCount?: number; // YouTube view count
    publishedAt?: string; // YouTube publish date
    url?: string; // Full YouTube URL
    mockVideoUrl?: string; // Fallback for old data
}

// Transcript types
export interface Transcript {
    transcriptId: string;
    videoId: string;
    content: string;
}

// Watchlist types
export interface Watchlist {
    watchlistId: string;
    userId: string;
    videoIds: string[];
    createdAt: Date;
}
