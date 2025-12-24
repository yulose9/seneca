import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Platform, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Typography, Spacing, Radii, Gradients, SenecaBlue, WealthTeal } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';
import Svg, { Circle } from 'react-native-svg';
import { useProtocol } from '../../context/ProtocolContext';

/**
 * Home Screen - "The Cockpit"
 * Dashboard of Sneak Peeks with Stoic/Liquid Glass Design
 */

// Progress Ring using Seneca Blue
const ProgressRing = ({ progress, size = 48, strokeWidth = 4 }) => {
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
                    stroke={SenecaBlue.start}
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

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // Profile image state (temporary, no persistence)
    const [profileImage, setProfileImage] = useState(null);

    // Pick and crop profile image
    const pickProfileImage = async () => {
        // Request permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                'Permission Required',
                'Permission to access the photo library is required to change your profile picture.'
            );
            return;
        }

        // Launch image picker with cropping enabled
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,  // Enables crop UI
            aspect: [1, 1],       // Square crop for avatar
            quality: 0.8,         // Good quality, smaller file
        });

        // If user didn't cancel, set the image
        if (!result.canceled && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
        }
    };

    // Dynamic greeting
    const hour = new Date().getHours();
    const getTimeOfDay = () => {
        if (hour < 12) return 'Morning';
        if (hour < 17) return 'Afternoon';
        return 'Evening';
    };

    // Use shared protocol context for real-time sync
    const { completedCount, totalCount, progress, getCurrentStatus, allPhasesComplete } = useProtocol();

    // Mock data for wealth (will be context later)
    const netWorth = 55000;
    const isPositive = netWorth >= 0;

    return (
        <View style={styles.container}>
            {/* Stoic Paper Background */}
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={[Colors.background, '#FFFFFF', Colors.background]}
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
            </View>

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingTop: insets.top + Spacing.base,
                        paddingBottom: 120
                    }
                ]}
                showsVerticalScrollIndicator={false}
            >

                {/* Profile Header */}
                <View style={styles.header}>
                    {/* Tappable Avatar - Opens Image Picker */}
                    <TouchableOpacity
                        style={styles.avatar}
                        onPress={pickProfileImage}
                        activeOpacity={0.8}
                    >
                        {profileImage ? (
                            // Show selected photo
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.avatarImage}
                            />
                        ) : (
                            // Show initials fallback
                            <LinearGradient
                                colors={Gradients.senecaBlue}
                                style={styles.avatarGradient}
                            >
                                <Text style={styles.avatarText}>JN</Text>
                            </LinearGradient>
                        )}
                    </TouchableOpacity>
                    <View style={styles.headerText}>
                        <Text style={styles.name}>John Nazarene</Text>
                        <Text style={styles.mission}>Building discipline. Mastering the cloud.{'\n'}2026 Mission.</Text>
                    </View>
                </View>

                {/* Card 1: Focus - Seneca Blue */}
                <GlassCard onPress={() => router.push('/growth')}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardTitle}>Focus</Text>
                            <Text style={styles.cardSubtitle}>Growth Peek</Text>
                        </View>
                        <TouchableOpacity style={styles.seeAllBtn} onPress={() => router.push('/growth')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.focusRow}>
                        <View style={styles.certIcon}>
                            <Text style={styles.certEmoji}>☁️</Text>
                        </View>
                        <View style={styles.certInfo}>
                            <Text style={styles.certName}>Google Cloud</Text>
                            <Text style={styles.certRole}>Digital Leader</Text>
                        </View>
                        <ProgressRing progress={65} />
                    </View>
                </GlassCard>

                {/* Card 2: Discipline - Protocol Status */}
                <GlassCard onPress={() => router.push('/protocol')}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardTitle}>Discipline</Text>
                            <Text style={styles.cardSubtitle}>Protocol Peek</Text>
                        </View>
                        <TouchableOpacity style={styles.seeAllBtn} onPress={() => router.push('/protocol')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Dynamic content based on protocol state */}
                    {allPhasesComplete ? (
                        // All Complete State - Celebration!
                        <View style={styles.protocolCompleteContainer}>
                            <View style={styles.protocolCompleteRow}>
                                <Text style={styles.protocolCompleteEmoji}>🏆</Text>
                                <View style={styles.protocolCompleteTextContainer}>
                                    <Text style={styles.protocolCompleteTitle}>Day Complete!</Text>
                                    <Text style={styles.protocolCompleteSubtitle}>All 17 habits conquered</Text>
                                </View>
                            </View>
                            {/* Full progress bar */}
                            <View style={styles.progressTrack}>
                                <LinearGradient
                                    colors={['#10B981', '#34D399']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.progressFill, { width: '100%' }]}
                                />
                            </View>
                        </View>
                    ) : (
                        // In Progress State - Show current phase
                        <>
                            <View style={styles.protocolStatusRow}>
                                <View style={styles.protocolPhaseInfo}>
                                    <Text style={styles.protocolPhaseName}>{getCurrentStatus().phase}</Text>
                                    <Text style={styles.protocolPhaseProgress}>
                                        {completedCount} of {totalCount} tasks
                                    </Text>
                                </View>
                                <View style={styles.protocolCountBadge}>
                                    <Text style={styles.protocolCountText}>{completedCount}/{totalCount}</Text>
                                </View>
                            </View>
                            {/* Progress bar */}
                            <View style={styles.progressTrack}>
                                <LinearGradient
                                    colors={Gradients.senecaBlue}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[styles.progressFill, { width: `${progress}%` }]}
                                />
                            </View>
                        </>
                    )}
                </GlassCard>

                {/* Card 3: Empire - Wealth Teal */}
                <GlassCard onPress={() => router.push('/wealth')}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardTitle}>Empire</Text>
                            <Text style={styles.cardSubtitle}>Wealth Peek</Text>
                        </View>
                    </View>
                    <View style={styles.wealthRow}>
                        <Text style={styles.netWorthLabel}>Net Worth: </Text>
                        <Text style={[styles.netWorthValue, { color: isPositive ? WealthTeal.start : Colors.destructive }]}>
                            ₱{netWorth.toLocaleString()}
                        </Text>
                        <View style={styles.formulaTag}>
                            <Text style={styles.formulaText}>Assets - Loans</Text>
                        </View>
                    </View>
                    {/* Wealth Teal Gradient Bar */}
                    <View style={styles.progressTrack}>
                        <LinearGradient
                            colors={Gradients.wealthTeal}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.progressFill, { width: '27%' }]}
                        />
                    </View>
                </GlassCard>

                {/* Card 4: Mirror - Seneca Blue Button */}
                <GlassCard onPress={() => router.push('/journal')}>
                    <View style={styles.mirrorHeader}>
                        <Text style={styles.cardTitle}>The Mirror</Text>
                        <Text style={styles.mirrorDivider}> | </Text>
                        <Text style={styles.cardSubtitle}>Journal Peek</Text>
                    </View>
                    <Text style={styles.promptText}>
                        The day is ending. Have you reviewed it?
                    </Text>
                    {/* Liquid Button with Gradient + Shadow */}
                    <TouchableOpacity style={styles.reflectBtnContainer} onPress={() => router.push('/journal')}>
                        <LinearGradient
                            colors={Gradients.senecaBlue}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.reflectBtn}
                        >
                            <Text style={styles.reflectText}>Reflect</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
    scrollContent: {
        paddingHorizontal: Spacing.lg,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    avatar: {
        marginRight: Spacing.md,
    },
    avatarGradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
    },
    avatarImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    headerText: {
        flex: 1,
    },
    name: {
        ...Typography.title3,
        color: Colors.text,
    },
    mission: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginTop: 2,
    },
    // Card Common
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    cardTitle: {
        ...Typography.headline,
        color: Colors.text,
    },
    cardSubtitle: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginTop: 2,
    },
    seeAllBtn: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: Colors.fill,
        borderRadius: Radii.md,
    },
    seeAllText: {
        ...Typography.footnote,
        color: Colors.textSecondary,
        fontWeight: '500',
    },
    // Focus Card
    focusRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    certIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.secondaryFill,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    certEmoji: {
        fontSize: 24,
    },
    certInfo: {
        flex: 1,
    },
    certName: {
        ...Typography.callout,
        color: Colors.text,
        fontWeight: '600',
    },
    certRole: {
        ...Typography.footnote,
        color: Colors.textMuted,
    },
    ringText: {
        ...Typography.caption2,
        color: SenecaBlue.start,
        fontWeight: '700',
    },
    // Discipline Card
    statusText: {
        ...Typography.subheadline,
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    statusHighlight: {
        fontWeight: '700',
        color: SenecaBlue.start,
    },
    progressTrack: {
        height: 8,
        backgroundColor: Colors.fill,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    // Empire Card
    wealthRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
        flexWrap: 'wrap',
    },
    netWorthLabel: {
        ...Typography.subheadline,
        color: Colors.text,
    },
    netWorthValue: {
        ...Typography.subheadline,
        fontWeight: '700',
    },
    formulaTag: {
        marginLeft: 'auto',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        backgroundColor: Colors.fill,
        borderRadius: 6,
    },
    formulaText: {
        ...Typography.caption2,
        color: Colors.textMuted,
    },
    // Mirror Card
    mirrorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    mirrorDivider: {
        ...Typography.headline,
        color: Colors.textMuted,
    },
    promptText: {
        ...Typography.subheadline,
        color: Colors.textSecondary,
        marginBottom: Spacing.base,
    },
    reflectBtnContainer: {
        // Colored shadow for "Liquid" element
        ...Platform.select({
            ios: {
                shadowColor: SenecaBlue.start,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    reflectBtn: {
        paddingVertical: Spacing.md,
        borderRadius: Radii.md,
        alignItems: 'center',
    },
    reflectText: {
        ...Typography.headline,
        color: '#FFF',
    },
    // Protocol Peek Styles
    protocolStatusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    protocolPhaseInfo: {
        flex: 1,
    },
    protocolPhaseName: {
        ...Typography.headline,
        color: Colors.text,
    },
    protocolPhaseProgress: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginTop: 2,
    },
    protocolCountBadge: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        backgroundColor: SenecaBlue.start + '15',
        borderRadius: Radii.sm,
    },
    protocolCountText: {
        ...Typography.headline,
        color: SenecaBlue.start,
        fontWeight: '700',
    },
    // Protocol Complete State
    protocolCompleteContainer: {
        marginTop: Spacing.xs,
    },
    protocolCompleteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    protocolCompleteEmoji: {
        fontSize: 32,
        marginRight: Spacing.md,
    },
    protocolCompleteTextContainer: {
        flex: 1,
    },
    protocolCompleteTitle: {
        ...Typography.headline,
        color: '#10B981',
        fontWeight: '700',
    },
    protocolCompleteSubtitle: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginTop: 2,
    },
});
