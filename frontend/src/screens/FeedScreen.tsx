import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../config/theme';
import { VideoCard } from '../components/VideoCard';
import { apiService } from '../services/api';
import { Video } from '../types';

interface FeedScreenProps {
    userId: string;
    onVideoPress: (video: Video) => void;
}

export const FeedScreen: React.FC<FeedScreenProps> = ({ userId, onVideoPress }) => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFeed();
    }, []);

    const loadFeed = async () => {
        try {
            const data = await apiService.getVideoFeed(userId);
            setVideos(data);
        } catch (error) {
            console.error('Error loading feed:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToWatchlist = async (videoId: string) => {
        const newWatchlist = [...watchlist, videoId];
        setWatchlist(newWatchlist);
        await apiService.updateWatchlist(userId, newWatchlist);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Feed</Text>
                <Text style={styles.subtitle}>
                    Focused content from your selected niches
                </Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading videos...</Text>
                ) : videos.length === 0 ? (
                    <Text style={styles.emptyText}>No videos available</Text>
                ) : (
                    videos.map(video => (
                        <VideoCard
                            key={video.videoId}
                            video={video}
                            onPress={() => onVideoPress(video)}
                            onAddToWatchlist={() => addToWatchlist(video.videoId)}
                        />
                    ))
                )}
            </ScrollView>

            {watchlist.length > 0 && (
                <View style={styles.watchlistBanner}>
                    <Text style={styles.watchlistText}>
                        {watchlist.length} video{watchlist.length > 1 ? 's' : ''} in watchlist
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.surface,
    },
    title: {
        ...TYPOGRAPHY.h1,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        ...TYPOGRAPHY.bodySecondary,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: SPACING.lg,
    },
    loadingText: {
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        marginTop: SPACING.xl,
    },
    emptyText: {
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        marginTop: SPACING.xl,
        color: COLORS.textSecondary,
    },
    watchlistBanner: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        alignItems: 'center',
    },
    watchlistText: {
        ...TYPOGRAPHY.body,
        fontWeight: '600',
    },
});
