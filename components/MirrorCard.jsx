import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from './GlassCard';
import { Colors, Typography, Spacing, Radii } from '../constants/Colors';

/**
 * Mirror Journal Card Component
 * 
 * HIG Compliance:
 * - Primary action button uses system blue
 * - Button height: 50pt (standard iOS)
 * - Corner radius: 12pt for buttons
 * - Proper shadow for depth
 */
export default function MirrorCard() {
    return (
        <GlassCard style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.title}>The Mirror</Text>
                <Text style={styles.divider}>•</Text>
                <Text style={styles.subtitle}>Journal</Text>
            </View>

            {/* Prompt */}
            <Text style={styles.prompt}>
                The day is ending. Have you reviewed it?
            </Text>

            {/* Primary Action Button - iOS HIG compliant */}
            <TouchableOpacity
                activeOpacity={0.85}
                style={styles.buttonContainer}
            >
                <LinearGradient
                    colors={[Colors.primary, '#5856D6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Reflect</Text>
                </LinearGradient>
            </TouchableOpacity>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: Spacing.md,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    title: {
        ...Typography.headline,
        color: Colors.text,
    },
    divider: {
        ...Typography.headline,
        color: Colors.textMuted,
        marginHorizontal: Spacing.sm,
    },
    subtitle: {
        ...Typography.callout,
        color: Colors.textMuted,
    },
    prompt: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginBottom: Spacing.base,
        lineHeight: 24,
    },
    buttonContainer: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    button: {
        height: 50, // iOS standard button height
        borderRadius: Radii.md, // 12pt
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        ...Typography.headline,
        color: Colors.primaryForeground,
    },
});
