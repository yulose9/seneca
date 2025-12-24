import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import GlassCard from './GlassCard';
import { Colors, Typography, Spacing, Radii } from '../constants/Colors';
import Svg, { Circle } from 'react-native-svg';

/**
 * Progress Ring Component
 * Based on iOS Activity Rings design language
 * 
 * HIG: Use rounded line caps, consistent stroke width
 */
const ProgressRing = ({ progress, size = 52, strokeWidth = 5 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Svg height={size} width={size} style={{ position: 'absolute' }}>
                {/* Background track */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={Colors.quaternaryFill}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress arc - using system blue */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={Colors.primary}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
            <Text style={styles.ringText}>{progress}%</Text>
        </View>
    );
};

/**
 * Focus Card Component
 * 
 * HIG Compliance:
 * - Headline typography for title
 * - Footnote for secondary text
 * - Proper spacing using 8pt grid
 * - System colors for interactive elements
 */
export default function FocusCard() {
    return (
        <GlassCard style={styles.card}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>Focus</Text>
                    <Text style={styles.subtitle}>Growth Peek</Text>
                </View>
                <View style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>See All</Text>
                </View>
            </View>

            {/* Content Row */}
            <View style={styles.contentRow}>
                {/* Badge */}
                <View style={styles.badge}>
                    <Image
                        source={{ uri: 'https://www.gstatic.com/devrel-devsite/prod/v84e6f6a61298bbae5bb110154b9e1ca2914e7e18cf32f5c3f1be9e20b2b58e61/cloud/images/favicons/onecloud/apple-icon.png' }}
                        style={styles.badgeImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.info}>
                    <Text style={styles.certName}>Google Cloud</Text>
                    <Text style={styles.certRole}>Digital Leader</Text>
                </View>

                <ProgressRing progress={65} />
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
        marginBottom: Spacing.base,
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
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.secondaryBackground,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2.5,
        borderColor: Colors.success,
        marginRight: Spacing.md,
    },
    badgeImage: {
        width: 28,
        height: 28,
    },
    info: {
        flex: 1,
    },
    certName: {
        ...Typography.callout,
        fontWeight: '600',
        color: Colors.text,
    },
    certRole: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginTop: 2,
    },
    ringText: {
        ...Typography.caption1,
        fontWeight: '700',
        color: Colors.text,
    },
});
