import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from './GlassCard';
import { Colors, Typography, Spacing, Radii } from '../constants/Colors';

/**
 * Discipline Card Component
 * 
 * HIG Compliance:
 * - Progress bar height matches iOS standards (4-6pt)
 * - System blue for progress indication
 * - Proper typography hierarchy
 */
export default function DisciplineCard() {
    const completed = 3;
    const total = 5;
    const progress = (completed / total) * 100;

    return (
        <GlassCard style={styles.card}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>Discipline</Text>
                    <Text style={styles.subtitle}>Protocol Peek</Text>
                </View>
                <View style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                </View>
            </View>

            {/* Status */}
            <Text style={styles.statusText}>
                Morning Ignition: <Text style={styles.statusHighlight}>{completed}/{total}</Text> Complete
            </Text>

            {/* Progress Bar - iOS style */}
            <View style={styles.progressContainer}>
                <LinearGradient
                    colors={[Colors.primary, '#5856D6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${progress}%` }]}
                />
            </View>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: Spacing.md,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    title: {
        ...Typography.headline,
        color: Colors.text,
    },
    subtitle: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginTop: 2,
    },
    seeAllButton: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.tertiaryFill,
        borderRadius: Radii.md,
    },
    seeAllText: {
        ...Typography.footnote,
        fontWeight: '500',
        color: Colors.textSecondary,
    },
    statusText: {
        ...Typography.subheadline,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    statusHighlight: {
        fontWeight: '600',
        color: Colors.primary,
    },
    progressContainer: {
        height: 6, // iOS standard progress bar height
        backgroundColor: Colors.quaternaryFill,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
    },
});
