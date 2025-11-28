import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../config/theme';
import { Niche } from '../types';

interface NicheCardProps {
    niche: Niche;
    isSelected: boolean;
    onToggle: () => void;
}

export const NicheCard: React.FC<NicheCardProps> = ({ niche, isSelected, onToggle }) => {
    return (
        <TouchableOpacity
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={onToggle}
            activeOpacity={0.7}
        >
            <View style={styles.cardContent}>
                <Text style={styles.title}>{niche.name}</Text>
                <Text style={styles.description}>{niche.description}</Text>
                <View style={styles.tagsContainer}>
                    {niche.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
            {isSelected && (
                <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surfaceLight,
    },
    cardContent: {
        flex: 1,
    },
    title: {
        ...TYPOGRAPHY.h3,
        marginBottom: SPACING.xs,
    },
    description: {
        ...TYPOGRAPHY.bodySecondary,
        marginBottom: SPACING.sm,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.xs,
    },
    tag: {
        backgroundColor: COLORS.primary + '30',
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: BORDER_RADIUS.sm,
    },
    tagText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.accent,
    },
    checkmark: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
        width: 24,
        height: 24,
        borderRadius: BORDER_RADIUS.full,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
