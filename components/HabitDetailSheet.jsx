import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Dimensions,
    ScrollView,
    Pressable,
    Animated,
    PanResponder,
    Platform,
    Easing
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, SenecaBlue } from '../constants/Colors';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Constants
const SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.92;
const SHEET_INITIAL_HEIGHT = SCREEN_HEIGHT * 0.85;
const DRAG_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 0.5;

// Data
const HABIT_INFO = {
    'Pray': {
        description: "Start your day with gratitude. Thank the Lord God for the gift of life, for the miracle of waking up to a new morning. Center your heart and surrender your worries before the world rushes in.",
        color: SenecaBlue.start,
        quote: "This is the day the Lord has made."
    },
    'Fix Bed': {
        description: "Order begins here. Restore order to your sanctuary—tidy up not just your bed (and Kuya's!), but your parents' bed too. A clean bedroom sets the standard for a disciplined, clutter-free mind.",
        color: '#8B5CF6',
        items: [
            { label: 'My Bed', icon: '🛏️' },
            { label: 'Parents Bed', icon: '✨' },
            { label: 'Tidy Room', icon: '🧹' }
        ]
    },
    'Coffee': {
        description: "Ignite your mind. Choose non-sugar caffeine (black coffee or tea) to jumpstart your system without the glucose crash. Pure focus, zero distractions.",
        color: '#D97706'
    },
    'Breakfast': {
        description: "Listen to your body. If you're fasting for weight loss, skip this with pride—it's a victory. If you need fuel, eat mindfully.",
        color: '#10B981',
        type: 'choice', // Special UI for choice
        choices: [
            { label: 'I Fasted ⚡', value: 'fasted', color: '#10B981' },
            { label: 'I Ate 🍳', value: 'ate', color: '#34D399' }
        ]
    },
    'Morning Brush': {
        description: "Master the basics. Brush with intent—this isn't just a chore, it's respect for yourself and everyone you meet. Dental hygiene is non-negotiable. Don't forget the oral wash.",
        color: '#06B6D4',
        routine: [
            { label: 'Morning', icon: '☀️' },
            { label: 'Lunch', icon: '🍽️' },
            { label: 'Sleep', icon: '🌙' }
        ]
    },
    'Shower': {
        description: "Do this ASAP. Wash away the sleep and lethargy immediately. Combine this with your skincare routine to step out fresh, sharp, and ready for war.",
        color: '#3B82F6',
        stack: [
            { label: 'Cleanse', icon: '🧼' },
            { label: 'Moisturize', icon: '💧' },
            { label: 'SPF', icon: '☀️' },
            { label: 'Vitamins', icon: '💊' }
        ]
    },
    // ... keep others standard or clear them if you want specific ones only, 
    // but for safety I'll keep the rest with generic or previous text
    'Reflect on your day': {
        description: "Who are you becoming? Journal your wins to celebrate, your losses to learn, and your morality to stay grounded. Build your character daily.",
        color: '#6366F1',
        action: 'journal',
        tags: ['Wins', 'Losses', 'Morality', 'Improvement']
    },
    'Read News': {
        description: "Filter the noise. Stick to high-signal sources. Knowledge is power, but only if it's true and relevant.",
        color: '#64748B',
        sources: [
            { label: 'Telegram', icon: '✈️' },
            { label: 'Google News', icon: '🌐' },
            { label: 'YouTube', icon: '▶️' }
        ]
    },
    'Read Book': {
        description: "Feed your mind. Read 5-10 pages daily. Don't just read—internalize.",
        color: '#A855F7',
        goals: ['5-10 Pages', 'Internalize'],
        topics: ['Stoicism', 'Wealth', 'Tech', 'AI']
    },
    'Learn Stuff': {
        description: "Expertise is built hour by hour. Dedicate 2-3 hours to your Workforce Development Plan. Master RHEL, Cloud, and Engineering.",
        color: '#EC4899',
        time: '2-3 HOURS',
        certifications: [
            { label: 'Terraform Assoc.', status: 'done', date: 'Mar 3, 2025', icon: '☁️' },
            { label: 'Red Hat CSA', status: 'progress', date: 'Oct 24, 2025', icon: '🎩' },
            { label: 'OpenShift Admin', status: 'locked', date: 'Sep 17, 2025', icon: '🚢' },
            { label: 'AWS DevOps Pro', status: 'locked', date: '2026 Q3', icon: '🏗️' },
            { label: 'GitHub Found.', status: 'locked', date: '2026 Q3', icon: '🐙' }
        ]
    },
    'Workout': {
        description: "Movement is medicine. Movement is mandatory. Use your tools to track your progress.",
        color: '#EF4444',
        apps: [
            { label: 'Strong', icon: '🏋️' },
            { label: 'Strava', icon: '🏃' },
            { label: 'Watch', icon: '⌚' }
        ]
    },
    'Eat Lunch': {
        description: "Midday checkpoint. If you're riding the fasting wave, keep surfing. If you need to break fast, prioritize protein and clean fuel. No slump allowed.",
        color: '#22C55E',
        type: 'choice',
        choices: [
            { label: 'Power Fast ⚡', value: 'fasted', color: '#22C55E' },
            { label: 'Clean Fuel 🥗', value: 'ate', color: '#10B981' }
        ]
    },
    'Toothbrush Lunch': {
        description: "Reset your palate. A mid-day brush prevents the afternoon decline and keeps your standards elite. Hygiene doesn't take a break.",
        color: '#14B8A6',
        routine: [
            { label: 'Morning', icon: '☀️' },
            { label: 'Lunch', icon: '🍽️' },
            { label: 'Sleep', icon: '🌙' }
        ]
    },
    'Clean': {
        description: "Entropy is the enemy. Reset your physical and digital workspace. Clear your desktop files, organize your shoes, sweep the dust. A clear space is a sharp mind.",
        color: '#0EA5E9',
        items: [
            { label: 'Digital Desktop', icon: '💻' },
            { label: 'Office Space', icon: '🪑' },
            { label: 'Shoes/Gear', icon: '👟' },
            { label: 'Dust/Sweep', icon: '🧹' }
        ]
    },
    'Brush Before Sleep': {
        description: "The final seal. Close the day with discipline. A clean mouth ensures a peaceful sleep and a dignified wake-up.",
        color: '#8B5CF6',
        routine: [
            { label: 'Morning', icon: '☀️' },
            { label: 'Lunch', icon: '🍽️' },
            { label: 'Sleep', icon: '🌙' }
        ]
    },
    'Skin Care Evening': {
        description: "Repair mode activated. Your skin heals while you dream. Don't skip this—this is an investment in your future face. Layer it right.",
        color: '#F472B6',
        stack: [
            { label: 'Double Cleanse', icon: '🧼' },
            { label: 'Toner', icon: '💧' },
            { label: 'Serum/Active', icon: '✨' },
            { label: 'Moisturizer', icon: '🧴' }
        ]
    },
    'Sleep': {
        description: "System Shutdown. Sleep is not a luxury, it is a biological necessity for elite performance. Lights out. Phone away.",
        color: '#6366F1',
        time: 'BEFORE 9:00 PM',
        tags: ['Recovery', 'Growth', 'Deep Rest']
    },
};

// Generate last N dates
const getPastDates = (days) => {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
};

const StreakCalendar = ({ habit, color, history = {}, onToggle }) => {
    // Generate dates for the grid (last 21 days for 3 rows of 7, or 28 for 4 rows)
    // 3 rows x 7 cols = 21 days
    const dates = useMemo(() => getPastDates(21), []);

    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    // Split dates into weeks
    const weeks = useMemo(() => {
        const result = [];
        for (let i = 0; i < dates.length; i += 7) {
            result.push(dates.slice(i, i + 7));
        }
        return result;
    }, [dates]);

    const cellSize = (SCREEN_WIDTH - 80) / 7;

    const handlePress = (date) => {
        Haptics.selectionAsync();
        onToggle(date);
    };

    return (
        <View style={styles.calendarContainer}>
            {/* Headers are static days, but real dates shift. 
                Ideally we show actual day names for the dates displayed.
                However, for "Github Streak" style, typically it's just a grid.
                The labels Mo-Su only make sense if the grid aligns with current week day.
                For simplicity with fixed 7-col grid, let's keep it simple or align it.
                GitHub aligns by week. 
                Let's just show standard Mon-Sun header and ensure our dates lineup?
                Actually, simpler: Just show the grid of last 21 days.
            */}
            <View style={styles.dayLabelsRow}>
                {days.map((day) => <Text key={day} style={[styles.dayLabel, { width: cellSize }]}>{day}</Text>)}
            </View>
            <View style={styles.grid}>
                {weeks.map((week, wkIdx) => (
                    <View key={wkIdx} style={styles.weekRow}>
                        {week.map((date, dIdx) => {
                            const isDone = !!history[date];
                            return (
                                <TouchableOpacity
                                    key={date}
                                    activeOpacity={0.7}
                                    onPress={() => handlePress(date)}
                                >
                                    <View
                                        style={[styles.cell, {
                                            width: cellSize - 6, height: cellSize - 6,
                                            backgroundColor: isDone ? color : '#1A1A1A',
                                            borderWidth: isDone ? 0 : 1,
                                            borderColor: '#2C2C2E'
                                        }]}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>
            <Text style={styles.historyHint}>Tap grid to track past history</Text>
        </View>
    );
};

export default function HabitDetailSheet({
    visible,
    onClose,
    habit,
    onToggleHistory,
    getHistory
}) {
    const router = useRouter();
    const [renderModal, setRenderModal] = useState(false);

    const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setRenderModal(true);
            sheetTranslateY.setValue(SCREEN_HEIGHT);
            backdropOpacity.setValue(0);

            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(sheetTranslateY, {
                    toValue: SCREEN_HEIGHT - SHEET_INITIAL_HEIGHT,
                    useNativeDriver: true,
                    damping: 20,
                    mass: 0.8,
                    stiffness: 100,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(sheetTranslateY, {
                    toValue: SCREEN_HEIGHT,
                    duration: 250,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: true,
                })
            ]).start(() => setRenderModal(false));
        }
    }, [visible]);

    const handleDismiss = () => {
        if (onClose) onClose();
    };

    // Main action button (Complete / Done)
    const handleActionButton = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        if (habit && onToggleHistory) {
            const today = new Date().toISOString().split('T')[0];
            onToggleHistory(habit.phaseId, habit.id, today);

            // Optionally close sheet after action?
            // User said "same as click check", check doesn't close sheet usually.
            // But "Done" implies dismissing.
            // Let's keep it open to show the result.
        }

        // Wait? The user prompt said: "clicking on the done button on the sheet is same as click hte check"
        // It didn't explicitly say "Close". Usually a bottom sheet "Done" button closes it.
        // But if it's acting as the primary action "Complete Task", then maybe we should rename it to "Toggle Complete" and add a separate small "X" or just drag to close.
        // However, standard UI: Big colored button usually closes OR commits primary action.
        // Let's perform the action and keep sheet open so they see the update?
        // Or close it?
        // If I close it, they can't see the grid update. 
        // Let's perform action and close after a short delay? No, better explicit.
        // I will just perform action. If they want to close, they drag down.
        // Or I rename button to "Complete" / "Completed".

        // Let's assume the button IS the interaction for today.
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
            onPanResponderGrant: () => sheetTranslateY.extractOffset(),
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy < 0) {
                    // Resistance
                }
                sheetTranslateY.setValue(gestureState.dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                sheetTranslateY.flattenOffset();
                const { dy, vy } = gestureState;
                if (dy > DRAG_THRESHOLD || vy > VELOCITY_THRESHOLD) {
                    handleDismiss();
                } else {
                    Animated.spring(sheetTranslateY, {
                        toValue: SCREEN_HEIGHT - SHEET_INITIAL_HEIGHT,
                        useNativeDriver: true,
                        damping: 20,
                        mass: 0.8,
                        stiffness: 120,
                    }).start();
                }
            }
        })
    ).current;

    if (!renderModal || !habit) return null;

    const habitInfo = HABIT_INFO[habit.title] || {
        description: "Build this habit consistently.",
        color: SenecaBlue.start
    };

    // Determine current status
    // Note: 'habit.done' passed from parent might be stale if we don't re-render parent on context update.
    // Parent passes 'selectedHabit' which is a snapshop.
    // We should rely on 'getHistory' for live data if possible, or context.
    // But 'getHistory' returns history map.
    // We can infer today's status from history.
    const history = getHistory ? getHistory(habit.phaseId, habit.id) : {};
    const today = new Date().toISOString().split('T')[0];
    const isTodayDone = !!history[today];

    return (
        <Modal
            transparent={true}
            visible={renderModal}
            onRequestClose={handleDismiss}
        >
            <View style={styles.container}>
                <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={handleDismiss}>
                        <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
                    </Pressable>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.sheet,
                        { transform: [{ translateY: sheetTranslateY }] }
                    ]}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.handleContainer}>
                        <View style={styles.handle} />
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{habit.title}</Text>
                        {habitInfo.quote && (
                            <Text style={styles.quote}>{habitInfo.quote}</Text>
                        )}
                        <Text style={styles.description}>{habitInfo.description}</Text>

                        {/* Rendering Extra Info */}
                        {habitInfo.items && (
                            <View style={styles.pillsContainer}>
                                {habitInfo.items.map((item, i) => (
                                    <View key={i} style={styles.pill}>
                                        <Text style={styles.pillIcon}>{item.icon}</Text>
                                        <Text style={styles.pillText}>{item.label}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {habitInfo.routine && (
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionLabel}>DAILY ROUTINE</Text>
                                <View style={styles.timeline}>
                                    {habitInfo.routine.map((step, i) => (
                                        <View key={i} style={styles.timelineStep}>
                                            <View style={[styles.stepCircle, { backgroundColor: habitInfo.color + '20' }]}>
                                                <Text style={styles.stepIcon}>{step.icon}</Text>
                                            </View>
                                            <Text style={styles.stepLabel}>{step.label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {habitInfo.stack && (
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionLabel}>ESSENTIALS STACK</Text>
                                <View style={styles.stackGrid}>
                                    {habitInfo.stack.map((item, i) => (
                                        <View key={i} style={styles.stackItem}>
                                            <Text style={styles.stackIcon}>{item.icon}</Text>
                                            <Text style={styles.stackLabel}>{item.label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {/* ARENA RENDERERS */}
                        {habitInfo.time && (
                            <View style={styles.timeWrapper}>
                                <View style={styles.timeBadge}>
                                    <Text style={styles.timeText}>⏱️ {habitInfo.time}</Text>
                                </View>
                            </View>
                        )}

                        {habitInfo.goals && (
                            <View style={styles.pillsContainer}>
                                {habitInfo.goals.map((g, i) => (
                                    <View key={i} style={[styles.pill, { backgroundColor: '#FEF3C7' }]}>
                                        <Text style={[styles.pillText, { color: '#B45309' }]}>🎯 {g}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {(habitInfo.tags || habitInfo.topics || habitInfo.areas) && (
                            <View style={styles.pillsContainer}>
                                {(habitInfo.tags || habitInfo.topics || habitInfo.areas).map((tag, i) => (
                                    <View key={i} style={[styles.pill, { backgroundColor: habitInfo.color + '15' }]}>
                                        <Text style={[styles.pillText, { color: habitInfo.color }]}>#{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {(habitInfo.sources || habitInfo.apps) && (
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionLabel}>TOOLS & SOURCES</Text>
                                <View style={styles.stackGrid}>
                                    {(habitInfo.sources || habitInfo.apps).map((item, i) => (
                                        <View key={i} style={styles.stackItem}>
                                            <Text style={styles.stackIcon}>{item.icon}</Text>
                                            <Text style={styles.stackLabel}>{item.label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {habitInfo.certifications && (
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionLabel}>CERTIFICATION ROADMAP</Text>
                                <View style={styles.certList}>
                                    {habitInfo.certifications.map((cert, i) => (
                                        <View key={i} style={[styles.certRow, i !== habitInfo.certifications.length - 1 && styles.certRowBorder]}>
                                            <View style={[styles.certStatus,
                                            cert.status === 'done' ? { backgroundColor: '#D1FAE5' } :
                                                cert.status === 'progress' ? { backgroundColor: '#FEF3C7' } :
                                                    { backgroundColor: '#F3F4F6' }
                                            ]}>
                                                <Text style={{ fontSize: 14 }}>
                                                    {cert.status === 'done' ? '✅' : cert.status === 'progress' ? '⏳' : '🔒'}
                                                </Text>
                                            </View>
                                            <View style={styles.certContent}>
                                                <Text style={styles.certLabel}>{cert.label}</Text>
                                                <Text style={styles.certDate}>{cert.date}</Text>
                                            </View>
                                            <Text style={{ fontSize: 20 }}>{cert.icon}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}

                        {habitInfo.action === 'journal' && (
                            <TouchableOpacity
                                style={[styles.actionButton, { borderColor: habitInfo.color }]}
                                onPress={() => {
                                    handleDismiss();
                                    router.push('/(tabs)/journal');
                                }}
                            >
                                <Text style={[styles.actionButtonText, { color: habitInfo.color }]}>Go to Journal 📖</Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.divider} />

                        <StreakCalendar
                            habit={habit}
                            color={habitInfo.color}
                            history={history}
                            onToggle={(date) => onToggleHistory(habit.phaseId, habit.id, date)}
                        />

                        <View style={styles.footer}>
                            {!isTodayDone && habitInfo.type === 'choice' ? (
                                <View style={styles.choiceContainer}>
                                    {habitInfo.choices.map((choice, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.choiceButton, { backgroundColor: choice.color + '15', borderColor: choice.color, borderWidth: 1 }]}
                                            onPress={handleActionButton}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={[styles.choiceText, { color: choice.color }]}>{choice.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        { backgroundColor: isTodayDone ? habitInfo.color : '#F2F2F7' }
                                    ]}
                                    onPress={handleActionButton}
                                >
                                    <Text style={[
                                        styles.buttonText,
                                        { color: isTodayDone ? '#FFFFFF' : '#000000' }
                                    ]}>
                                        {isTodayDone ? (Platform.OS === 'ios' ? 'Completed ✓' : 'Completed') : 'Complete Task'}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
    sheet: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: SCREEN_HEIGHT,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
        paddingBottom: 40,
    },
    handleContainer: { alignItems: 'center', paddingVertical: 12, width: '100%' },
    handle: { width: 40, height: 5, borderRadius: 3, backgroundColor: '#E5E5EA' },
    contentContainer: { paddingHorizontal: 32, paddingTop: 10 },
    title: { fontSize: 34, fontWeight: '700', color: '#000000', marginBottom: 12, fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif' },
    description: { fontSize: 17, lineHeight: 24, color: '#3C3C4399', marginBottom: 24 },
    divider: { height: 1, backgroundColor: '#E5E5EA', marginBottom: 24 },
    calendarContainer: { alignItems: 'center', marginBottom: 32 },
    dayLabelsRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 12 },
    dayLabel: { fontSize: 15, fontWeight: '600', color: '#8E8E93', textAlign: 'center' },
    grid: { width: '100%' },
    weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    cell: { borderRadius: 6 },
    historyHint: { fontSize: 13, color: '#8E8E93', marginTop: 8 },
    footer: { marginTop: 20 },
    button: { width: '100%', height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
    buttonText: { fontSize: 17, fontWeight: '600' },
    quote: {
        fontSize: 15,
        fontStyle: 'italic',
        color: '#6366F1',
        marginBottom: 8,
        marginTop: -4,
        fontWeight: '500'
    },
    choiceContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    choiceButton: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    choiceText: {
        fontSize: 17,
        fontWeight: '600',
    },
    // New Styles
    pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
    pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F7', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    pillIcon: { marginRight: 6, fontSize: 14 },
    pillText: { fontSize: 14, fontWeight: '600', color: '#000' },

    infoSection: { marginBottom: 24, width: '100%' },
    sectionLabel: { fontSize: 11, fontWeight: '700', color: '#8E8E93', letterSpacing: 1, marginBottom: 12, textTransform: 'uppercase' },

    timeline: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
    timelineStep: { alignItems: 'center' },
    stepCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
    stepIcon: { fontSize: 20 },
    stepLabel: { fontSize: 12, fontWeight: '500', color: '#3C3C43' },

    stackGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    stackItem: { width: '47%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F7', padding: 12, borderRadius: 12 },
    stackIcon: { fontSize: 20, marginRight: 8 },
    stackLabel: { fontSize: 13, fontWeight: '600', color: '#000' },

    // Arena Styles
    timeWrapper: { flexDirection: 'row', marginBottom: 16 },
    timeBadge: { backgroundColor: '#FCE7F3', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
    timeText: { color: '#BE185D', fontWeight: '700', fontSize: 13 },

    // Certs
    certList: { backgroundColor: '#F9FAFB', borderRadius: 16, padding: 4 },
    certRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
    certRowBorder: { borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    certStatus: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    certContent: { flex: 1 },
    certLabel: { fontSize: 15, fontWeight: '600', color: '#111827' },
    certDate: { fontSize: 12, color: '#6B7280', marginTop: 2 },

    actionButton: { width: '100%', paddingVertical: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center', marginBottom: 24, borderStyle: 'dashed' },
    actionButtonText: { fontSize: 16, fontWeight: '600' }
});
