import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../config/theme';
import { NicheCard } from '../components/NicheCard';
import { apiService } from '../services/api';
import { Niche } from '../types';

interface NicheSelectionScreenProps {
    onComplete: (selectedNiches: string[]) => void;
}

export const NicheSelectionScreen: React.FC<NicheSelectionScreenProps> = ({ onComplete }) => {
    const [niches, setNiches] = useState<Niche[]>([]);
    const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNiches();
    }, []);

    const loadNiches = async () => {
        try {
            const data = await apiService.getNiches();
            setNiches(data);
        } catch (error) {
            console.error('Error loading niches:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleNiche = (nicheId: string) => {
        setSelectedNiches(prev => {
            if (prev.includes(nicheId)) {
                return prev.filter(id => id !== nicheId);
            } else if (prev.length < 3) {
                return [...prev, nicheId];
            }
            return prev;
        });
    };

    const canContinue = selectedNiches.length >= 1 && selectedNiches.length <= 3;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Choose Your Niches</Text>
                <Text style={styles.subtitle}>
                    Select 1-3 niches to focus your content feed
                </Text>
                <Text style={styles.counter}>
                    {selectedNiches.length}/3 selected
                </Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading niches...</Text>
                ) : (
                    niches.map(niche => (
                        <NicheCard
                            key={niche.nicheId}
                            niche={niche}
                            isSelected={selectedNiches.includes(niche.nicheId)}
                            onToggle={() => toggleNiche(niche.nicheId)}
                        />
                    ))
                )}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
                    onPress={() => canContinue && onComplete(selectedNiches)}
                    disabled={!canContinue}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: SPACING.sm,
    },
    counter: {
        ...TYPOGRAPHY.body,
        color: COLORS.accent,
        fontWeight: '600',
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
    footer: {
        padding: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.surface,
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: COLORS.surfaceLight,
        opacity: 0.5,
    },
    continueButtonText: {
        ...TYPOGRAPHY.h3,
        color: COLORS.text,
    },
});
