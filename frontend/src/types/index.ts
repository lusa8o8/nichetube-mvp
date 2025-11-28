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
    title: string;
    duration: number; // in seconds
    nicheId: string;
    mockVideoUrl: string;
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
