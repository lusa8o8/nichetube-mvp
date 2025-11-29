const axios = require('axios');

class YouTubeService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.googleapis.com/youtube/v3';
    }

    /**
     * Search for videos by topic/keywords
     * @param {string} query - Search query (e.g., "advanced javascript closures")
     * @param {number} maxResults - Number of results (default: 10)
     * @returns {Promise<Array>} Array of video objects
     */
    async searchVideos(query, maxResults = 10) {
        try {
            const response = await axios.get(`${this.baseUrl}/search`, {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    maxResults,
                    key: this.apiKey,
                    videoDefinition: 'high',
                    order: 'relevance'
                }
            });

            const videoIds = response.data.items.map(item => item.id.videoId).join(',');

            // Get detailed video information
            const detailsResponse = await axios.get(`${this.baseUrl}/videos`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoIds,
                    key: this.apiKey
                }
            });

            return detailsResponse.data.items.map(video => this.formatVideo(video));
        } catch (error) {
            console.error('YouTube API Error:', error.response?.data || error.message);
            throw new Error('Failed to fetch videos from YouTube');
        }
    }

    /**
     * Get videos for a specific niche
     * @param {string} nicheKeywords - Keywords for the niche
     * @param {number} maxResults - Number of results
     * @returns {Promise<Array>} Array of formatted video objects
     */
    async getVideosForNiche(nicheKeywords, maxResults = 10) {
        return this.searchVideos(nicheKeywords, maxResults);
    }

    /**
     * Format YouTube video data to our schema
     * @param {Object} video - Raw YouTube video object
     * @returns {Object} Formatted video object
     */
    formatVideo(video) {
        const duration = this.parseDuration(video.contentDetails.duration);

        return {
            youtubeId: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnailUrl: video.snippet.thumbnails.high.url,
            channelName: video.snippet.channelTitle,
            duration: duration,
            viewCount: parseInt(video.statistics.viewCount || 0),
            publishedAt: video.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
    }

    /**
     * Parse ISO 8601 duration to seconds
     * @param {string} duration - ISO 8601 duration (e.g., "PT15M33S")
     * @returns {number} Duration in seconds
     */
    parseDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

        const hours = (match[1] || '').replace('H', '') || 0;
        const minutes = (match[2] || '').replace('M', '') || 0;
        const seconds = (match[3] || '').replace('S', '') || 0;

        return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    }

    /**
     * Format duration in seconds to MM:SS or HH:MM:SS
     * @param {number} seconds - Duration in seconds
     * @returns {string} Formatted duration
     */
    static formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

module.exports = YouTubeService;
