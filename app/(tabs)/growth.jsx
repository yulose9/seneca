import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii, SenecaBlue, EmpireGold } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';
import Svg, { Circle } from 'react-native-svg';

/**
 * Growth Screen - Certifications & Goals
 * Stoic/Liquid Glass Design
 */

const ProgressRing = ({ progress, size = 56, strokeWidth = 5, color = SenecaBlue.start }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Svg height={size} width={size} style={{ position: 'absolute' }}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={Colors.fill}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
            <Text style={[styles.ringText, { color }]}>{progress}%</Text>
        </View>
    );
};

export default function GrowthScreen() {
    const insets = useSafeAreaInsets();

    const certifications = [
        { id: 1, name: 'Google Cloud', role: 'Digital Leader', progress: 65, color: '#4285F4' },
        { id: 2, name: 'AWS', role: 'Solutions Architect', progress: 30, color: '#FF9900' },
        { id: 3, name: 'Azure', role: 'Fundamentals', progress: 85, color: '#0078D4' },
    ];

    const goals = [
        { id: 1, name: 'No Porn', streak: 14, emoji: '🚫' },
        { id: 2, name: 'Exercise', streak: 7, emoji: '💪' },
        { id: 3, name: 'Reading', streak: 21, emoji: '📚' },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.background, '#FFFFFF', Colors.background]}
                style={StyleSheet.absoluteFill}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
            />

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    { paddingTop: insets.top + Spacing.base, paddingBottom: 120 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Growth</Text>
                <Text style={styles.subtitle}>Certifications & life goals</Text>

                {/* Certifications */}
                <Text style={styles.sectionLabel}>CERTIFICATIONS</Text>
                {certifications.map((cert) => (
                    <GlassCard key={cert.id}>
                        <View style={styles.certRow}>
                            <View style={styles.certInfo}>
                                <Text style={styles.certName}>{cert.name}</Text>
                                <Text style={styles.certRole}>{cert.role}</Text>
                            </View>
                            <ProgressRing progress={cert.progress} color={cert.color} />
                        </View>
                    </GlassCard>
                ))}

                {/* Streak Goals */}
                <Text style={styles.sectionLabel}>STREAK GOALS</Text>
                <GlassCard>
                    {goals.map((goal, index) => (
                        <View key={goal.id} style={[
                            styles.goalRow,
                            index < goals.length - 1 && styles.goalBorder
                        ]}>
                            <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                            <View style={styles.goalInfo}>
                                <Text style={styles.goalName}>{goal.name}</Text>
                                <Text style={styles.goalStreak}>{goal.streak} day streak</Text>
                            </View>
                            <View style={styles.streakBadge}>
                                <Text style={styles.streakNumber}>🔥 {goal.streak}</Text>
                            </View>
                        </View>
                    ))}
                </GlassCard>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        paddingHorizontal: Spacing.lg,
    },
    title: {
        ...Typography.largeTitle,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    subtitle: {
        ...Typography.body,
        color: Colors.textMuted,
        marginBottom: Spacing.xl,
    },
    sectionLabel: {
        ...Typography.caption1,
        color: Colors.textMuted,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: Spacing.sm,
        marginTop: Spacing.md,
    },
    certRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    certInfo: {
        flex: 1,
    },
    certName: {
        ...Typography.headline,
        color: Colors.text,
    },
    certRole: {
        ...Typography.subheadline,
        color: Colors.textMuted,
        marginTop: 2,
    },
    ringText: {
        ...Typography.caption1,
        fontWeight: '700',
    },
    goalRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    goalBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.separator,
    },
    goalEmoji: {
        fontSize: 28,
        marginRight: Spacing.md,
    },
    goalInfo: {
        flex: 1,
    },
    goalName: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '600',
    },
    goalStreak: {
        ...Typography.footnote,
        color: Colors.textMuted,
    },
    streakBadge: {
        backgroundColor: EmpireGold.start + '20',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: Radii.sm,
    },
    streakNumber: {
        ...Typography.subheadline,
        color: EmpireGold.start,
        fontWeight: '600',
    },
});
