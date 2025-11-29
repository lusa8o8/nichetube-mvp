import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../config/theme';
import { Video } from '../types';

interface VideoCardProps {
    video: Video;
    onPress: () => void;
    onAddToWatchlist?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onPress, onAddToWatchlist }) => {
    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.thumbnail}>
                {video.thumbnailUrl && (
                    <Image
                        source={{ uri: video.thumbnailUrl }}
                        style={styles.thumbnailImage}
                        resizeMode="cover"
                    />
                )}
                <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{video.title}</Text>
                {video.channelName && (
                    <Text style={styles.channelName} numberOfLines={1}>
                        {video.channelName} • {video.viewCount ? `${(video.viewCount / 1000).toFixed(1)}k views` : ''}
                    </Text>
                )}
                {onAddToWatchlist && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            onAddToWatchlist();
                        }}
                    >
                        <Text style={styles.addButtonText}>+ Add to Watchlist</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: SPACING.md,
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: 200,
        backgroundColor: COLORS.surfaceLight,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: SPACING.sm,
        position: 'relative',
    },
    thumbnailImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    durationBadge: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    durationText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    content: {
        padding: SPACING.md,
    },
    title: {
        ...TYPOGRAPHY.h3,
        marginBottom: SPACING.xs,
    },
    channelName: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        marginBottom: SPACING.sm,
    },
    addButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        alignSelf: 'flex-start',
    },
    addButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.text,
        fontWeight: '600',
    },
});
