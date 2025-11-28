import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../config/theme';
import { apiService } from '../services/api';
import { Video, Transcript } from '../types';

interface VideoPlayerScreenProps {
    video: Video;
    onBack: () => void;
}

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ video, onBack }) => {
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTranscript();
    }, [video.videoId]);

    const loadTranscript = async () => {
        try {
            const data = await apiService.getTranscript(video.videoId);
            setTranscript(data);
        } catch (error) {
            console.error('Error loading transcript:', error);
        } finally {
            setLoading(false);
        }
    };

    const highlightText = (text: string, query: string): string[] => {
        if (!query) return [text];
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title} numberOfLines={2}>{video.title}</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Transcript Section */}
                <View style={styles.transcriptSection}>
                    <Text style={styles.sectionTitle}>Transcript</Text>
                    <Text style={styles.sectionSubtitle}>
                        Review the content before watching
                    </Text>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search transcript..."
                            placeholderTextColor={COLORS.textSecondary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                    {loading ? (
                        <Text style={styles.loadingText}>Loading transcript...</Text>
                    ) : transcript ? (
                        <View style={styles.transcriptContent}>
                            <Text style={styles.transcriptText}>
                                {searchQuery ? (
                                    highlightText(transcript.content, searchQuery).map((part: string, i: number) =>
                                        part.toLowerCase() === searchQuery.toLowerCase() ? (
                                            <Text key={i} style={styles.highlight}>{part}</Text>
                                        ) : (
                                            <Text key={i}>{part}</Text>
                                        )
                                    )
                                ) : (
                                    transcript.content
                                )}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.errorText}>Transcript not available</Text>
                    )}
                </View>

                {/* Video Player Placeholder */}
                <View style={styles.videoSection}>
                    <Text style={styles.sectionTitle}>Video Player</Text>
                    <View style={styles.videoPlaceholder}>
                        <Text style={styles.videoPlaceholderText}>
                            Video player will be implemented here
                        </Text>
                        <Text style={styles.videoUrl}>{video.mockVideoUrl}</Text>
                    </View>
                </View>
            </ScrollView>
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
    backButton: {
        marginBottom: SPACING.sm,
    },
    backButtonText: {
        ...TYPOGRAPHY.body,
        color: COLORS.accent,
        fontWeight: '600',
    },
    title: {
        ...TYPOGRAPHY.h2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: SPACING.lg,
    },
    transcriptSection: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        ...TYPOGRAPHY.h2,
        marginBottom: SPACING.xs,
    },
    sectionSubtitle: {
        ...TYPOGRAPHY.bodySecondary,
        marginBottom: SPACING.md,
    },
    searchContainer: {
        marginBottom: SPACING.md,
    },
    searchInput: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        ...TYPOGRAPHY.body,
        color: COLORS.text,
    },
    transcriptContent: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
    },
    transcriptText: {
        ...TYPOGRAPHY.body,
        lineHeight: 24,
    },
    highlight: {
        backgroundColor: COLORS.accent + '40',
        color: COLORS.accent,
        fontWeight: '600',
    },
    loadingText: {
        ...TYPOGRAPHY.body,
        textAlign: 'center',
        marginTop: SPACING.lg,
    },
    errorText: {
        ...TYPOGRAPHY.body,
        color: COLORS.error,
        textAlign: 'center',
        marginTop: SPACING.lg,
    },
    videoSection: {
        marginBottom: SPACING.xl,
    },
    videoPlaceholder: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.xl,
        alignItems: 'center',
        minHeight: 200,
        justifyContent: 'center',
    },
    videoPlaceholderText: {
        ...TYPOGRAPHY.body,
        marginBottom: SPACING.sm,
    },
    videoUrl: {
        ...TYPOGRAPHY.caption,
        color: COLORS.accent,
    },
});
