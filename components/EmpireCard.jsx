import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import GlassCard from './GlassCard';
import { Colors, Typography, Spacing } from '../constants/Colors';

/**
 * Empire Card Component
 * Wealth Overview with visual progress
 * 
 * HIG Compliance:
 * - System green for positive financial metrics
 * - Proper number formatting
 * - Clear visual hierarchy
 */
export default function EmpireCard() {
    const netWorth = 55000;
    const target = 200000;
    const progress = (netWorth / target) * 100;

    return (
        <GlassCard style={styles.card}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>Empire</Text>
                    <Text style={styles.subtitle}>Wealth Peek</Text>
                </View>
            </View>

            {/* Net Worth Display */}
            <View style={styles.netWorthRow}>
                <View>
                    <Text style={styles.netWorthLabel}>Net Worth</Text>
                    <Text style={styles.netWorth}>₱{netWorth.toLocaleString()}</Text>
                </View>
                <View style={styles.formula}>
                    <Text style={styles.formulaText}>Assets − Loans</Text>
                </View>
            </View>

            {/* Progress Visualization */}
            <View style={styles.progressContainer}>
                <Svg height="8" width="100%" viewBox="0 0 300 8" preserveAspectRatio="none">
                    <Defs>
                        <SvgGradient id="wealthGradient" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0%" stopColor={Colors.success} />
                            <Stop offset="100%" stopColor="#10B981" />
                        </SvgGradient>
                    </Defs>
                    {/* Background */}
                    <Path
                        d="M4 4 L296 4"
                        stroke={Colors.quaternaryFill}
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                    />
                    {/* Progress (27.5% of 300 = ~83) */}
                    <Path
                        d={`M4 4 L${Math.max(8, progress * 2.92)} 4`}
                        stroke="url(#wealthGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                    />
                </Svg>
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
        marginBottom: Spacing.md,
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
    netWorthRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: Spacing.md,
    },
    netWorthLabel: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginBottom: 2,
    },
    netWorth: {
        ...Typography.title2,
        color: Colors.success,
        fontWeight: '700',
    },
    formula: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        backgroundColor: Colors.quaternaryFill,
        borderRadius: 6,
    },
    formulaText: {
        ...Typography.caption1,
        color: Colors.textMuted,
    },
    progressContainer: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
});
