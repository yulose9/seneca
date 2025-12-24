import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager, Dimensions } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useRef, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Radii, Gradients, SenecaBlue } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';
import HabitDetailSheet from '../../components/HabitDetailSheet';
import { useProtocol } from '../../context/ProtocolContext';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Protocol Screen - Daily Protocols
 * 
 * Flow:
 * 1. Complete all tasks in a section
 * 2. Click "I am Ready" button
 * 3. Section collapses, next section expands
 */

// Simple iOS-style Circular Checkbox
const IOSCheckbox = ({ done, onToggle }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        Animated.sequence([
            Animated.spring(scaleAnim, { toValue: 0.85, useNativeDriver: true, friction: 4 }),
            Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 4 }),
        ]).start();

        onToggle();
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
            <Animated.View style={[
                styles.iosCheckbox,
                {
                    transform: [{ scale: scaleAnim }],
                    backgroundColor: done ? SenecaBlue.start : 'transparent',
                    borderColor: done ? SenecaBlue.start : Colors.separator,
                }
            ]}>
                {done && <Text style={styles.iosCheckmark}>✓</Text>}
            </Animated.View>
        </TouchableOpacity>
    );
};

// Task Row - tap row to open detail sheet, tap checkbox to toggle
const TaskRow = ({ task, onToggle, onPress, isLast }) => {
    return (
        <TouchableOpacity
            style={[styles.taskRow, !isLast && styles.taskRowBorder]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <IOSCheckbox done={task.done} onToggle={onToggle} />
            <Text style={styles.taskEmoji}>{task.emoji}</Text>
            <Text style={[
                styles.taskLabel,
                task.done && styles.taskLabelDone
            ]}>
                {task.title}
            </Text>
            {/* Chevron to indicate tappable */}
            <Text style={styles.taskChevron}>›</Text>
        </TouchableOpacity>
    );
};

// Disclosure Group - controlled by parent for expand state
const DisclosureGroup = ({
    phaseId,
    phase,
    tasks,
    isExpanded,
    isUnlocked,
    onToggleTask,
    onToggleExpand,
    onCompletePhase,
    onTaskPress,
    progress,
}) => {
    const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

    // Dynamic complete check - based on actual task state
    const allTasksDone = tasks.every(t => t.done);
    const isPhaseComplete = allTasksDone;

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: isExpanded ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [isExpanded]);

    const rotation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const handleHeaderPress = () => {
        Haptics.selectionAsync();
        onToggleExpand(phaseId);
    };

    const handleCompletePress = () => {
        if (allTasksDone) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            onCompletePhase(phaseId);
        }
    };

    return (
        <View style={styles.disclosureGroup}>
            {/* Header Row */}
            <TouchableOpacity
                onPress={handleHeaderPress}
                activeOpacity={0.6}
                style={styles.disclosureHeader}
            >
                {/* Chevron */}
                <Animated.Text style={[
                    styles.disclosureChevron,
                    !isUnlocked && styles.disclosureChevronLocked,
                    { transform: [{ rotate: rotation }] }
                ]}>
                    ›
                </Animated.Text>

                {/* Lock icon */}
                {!isUnlocked && <Text style={styles.lockIcon}>🔒</Text>}

                {/* Title & Subtitle */}
                <View style={styles.disclosureTitleContainer}>
                    <Text style={[
                        styles.disclosureTitle,
                        !isUnlocked && styles.disclosureTitleLocked
                    ]}>
                        {phase.title}
                    </Text>
                    <Text style={[
                        styles.disclosureSubtitle,
                        isPhaseComplete && styles.disclosureSubtitleComplete
                    ]}>
                        {isPhaseComplete
                            ? '✓ Complete'
                            : isUnlocked
                                ? phase.subtitle
                                : 'Locked'
                        }
                    </Text>
                </View>

                {/* Progress Counter */}
                <View style={[
                    styles.progressPill,
                    isPhaseComplete && styles.progressPillComplete
                ]}>
                    <Text style={[
                        styles.progressPillText,
                        isPhaseComplete && styles.progressPillTextComplete
                    ]}>
                        {progress.completed}/{progress.total}
                    </Text>
                </View>
            </TouchableOpacity>

            {/* Expanded Content */}
            {isExpanded && (
                <View style={styles.disclosureContent}>
                    {/* Task List */}
                    <View style={styles.taskList}>
                        {tasks.map((task, index) => (
                            <TaskRow
                                key={task.id}
                                task={task}
                                onToggle={() => onToggleTask(phaseId, task.id)}
                                onPress={() => onTaskPress(phaseId, task)}
                                isLast={index === tasks.length - 1}
                            />
                        ))}
                    </View>

                    {/* Complete Button - Only show when unlocked */}
                    {isUnlocked && (
                        <TouchableOpacity
                            style={[
                                styles.primaryButton,
                                !allTasksDone && styles.primaryButtonDisabled
                            ]}
                            onPress={handleCompletePress}
                            disabled={!allTasksDone}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={allTasksDone ? Gradients.senecaBlue : [Colors.fill, Colors.fill]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.primaryButtonGradient}
                            >
                                <Text style={[
                                    styles.primaryButtonText,
                                    !allTasksDone && styles.primaryButtonTextDisabled
                                ]}>
                                    {allTasksDone ? phase.buttonText : `Complete all ${progress.total} tasks`}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

export default function ProtocolScreen() {
    const insets = useSafeAreaInsets();
    const {
        phases,
        activePhase,
        phaseOrder,
        allPhasesComplete,
        toggleTask,
        completePhase,
        phaseTasks,
        isPhaseComplete,
        isPhaseUnlocked,
        getPhaseProgress,
        toggleTaskHistory, // Import new functions
        getTaskHistory,
    } = useProtocol();

    // Track which phase is currently expanded
    const [expandedPhase, setExpandedPhase] = useState('morningIgnition');

    // Celebration state
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        if (allPhasesComplete) {
            const timer = setTimeout(() => setShowCelebration(true), 500);
            return () => clearTimeout(timer);
        } else {
            setShowCelebration(false);
        }
    }, [allPhasesComplete]);


    // Sheet state for habit details
    const [sheetVisible, setSheetVisible] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    // Open habit detail sheet - Now accepts phaseId
    const handleTaskPress = (phaseId, task) => {
        Haptics.selectionAsync();
        // Enrich task with phaseId so the sheet knows where it belongs
        setSelectedHabit({ ...task, phaseId });
        setSheetVisible(true);
    };

    // Close habit detail sheet
    const handleCloseSheet = () => {
        setSheetVisible(false);
        // Don't clear selectedHabit yet
    };

    // Toggle expand/collapse for a phase
    const handleToggleExpand = (phaseId) => {
        LayoutAnimation.configureNext({
            duration: 300,
            create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.easeInEaseOut },
            delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
        });

        setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    };

    const handleCompletePhase = (phaseId) => {
        const currentIndex = phaseOrder.indexOf(phaseId);
        const nextPhase = phaseOrder[currentIndex + 1];

        LayoutAnimation.configureNext({
            duration: 300,
            create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.easeInEaseOut },
            delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
        });

        // Call the context's completePhase (to unlock next phase)
        completePhase(phaseId);

        // Expand the next phase, collapse current
        if (nextPhase) {
            setExpandedPhase(nextPhase);
        } else {
            // All done! Collapse everything
            setExpandedPhase(null);
        }
    };

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
                <Text style={styles.largeTitle}>Daily Protocols</Text>

                {phaseOrder.map((phaseId) => (
                    <GlassCard key={phaseId}>
                        <DisclosureGroup
                            phaseId={phaseId}
                            phase={phases[phaseId]}
                            tasks={phaseTasks[phaseId]}
                            isExpanded={expandedPhase === phaseId}
                            isUnlocked={isPhaseUnlocked(phaseId)}
                            onToggleTask={toggleTask}
                            onToggleExpand={handleToggleExpand}
                            onCompletePhase={handleCompletePhase}
                            onTaskPress={handleTaskPress}
                            progress={getPhaseProgress(phaseId)}
                        />
                    </GlassCard>
                ))}

                {/* Day Complete - Only shows when ALL tasks done */}
                {allPhasesComplete && (
                    <GlassCard>
                        <View style={styles.celebrationContainer}>
                            <Text style={styles.celebrationEmoji}>🏆</Text>
                            <Text style={styles.celebrationTitle}>Day Complete!</Text>
                            <Text style={styles.celebrationSubtitle}>
                                You've conquered all 17 habits. Rest well, warrior.
                            </Text>
                        </View>
                    </GlassCard>
                )}

            </ScrollView>

            {/* Habit Detail Sheet */}
            <HabitDetailSheet
                visible={sheetVisible}
                onClose={handleCloseSheet}
                habit={selectedHabit}
                onToggleHistory={toggleTaskHistory}
                getHistory={getTaskHistory}
            />

            {showCelebration && (
                <ConfettiCannon
                    count={200}
                    origin={{ x: Dimensions.get('window').width / 2, y: -20 }}
                    autoStart={true}
                    fadeOut={true}
                    fallSpeed={3000}
                />
            )}
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
    largeTitle: {
        ...Typography.largeTitle,
        color: Colors.text,
        marginBottom: Spacing.lg,
    },
    // Disclosure Group
    disclosureGroup: {},
    disclosureHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 44,
    },
    disclosureChevron: {
        fontSize: 24,
        fontWeight: '300',
        color: Colors.textMuted,
        width: 20,
        marginRight: Spacing.xs,
    },
    disclosureChevronLocked: {
        opacity: 0.4,
    },
    lockIcon: {
        fontSize: 14,
        marginRight: Spacing.xs,
    },
    disclosureTitleContainer: {
        flex: 1,
    },
    disclosureTitle: {
        ...Typography.headline,
        color: Colors.text,
    },
    disclosureTitleLocked: {
        color: Colors.textMuted,
    },
    disclosureSubtitle: {
        ...Typography.footnote,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    disclosureSubtitleComplete: {
        color: '#34C759',
    },
    progressPill: {
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
        backgroundColor: Colors.fill,
        borderRadius: 10,
    },
    progressPillComplete: {
        backgroundColor: 'rgba(52, 199, 89, 0.15)',
    },
    progressPillText: {
        ...Typography.caption1,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    progressPillTextComplete: {
        color: '#34C759',
    },
    // Disclosure Content
    disclosureContent: {
        marginTop: Spacing.md,
    },
    // Task List
    taskList: {
        backgroundColor: Colors.secondaryFill,
        borderRadius: Radii.md,
        overflow: 'hidden',
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: Spacing.md,
        minHeight: 44,
    },
    taskRowBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.separator,
    },
    // iOS Checkbox
    iosCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        marginRight: Spacing.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosCheckmark: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
        marginTop: -1,
    },
    taskEmoji: {
        fontSize: 18,
        marginRight: Spacing.sm,
    },
    taskLabel: {
        ...Typography.body,
        color: Colors.text,
        flex: 1,
    },
    taskLabelDone: {
        color: Colors.textMuted,
        textDecorationLine: 'line-through',
    },
    taskChevron: {
        fontSize: 22,
        color: Colors.textMuted,
        fontWeight: '300',
        marginLeft: Spacing.sm,
    },
    // Primary Button
    primaryButton: {
        marginTop: Spacing.md,
        borderRadius: Radii.md,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: SenecaBlue.start,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android: { elevation: 4 },
        }),
    },
    primaryButtonDisabled: {
        shadowOpacity: 0,
        elevation: 0,
    },
    primaryButtonGradient: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    primaryButtonText: {
        ...Typography.headline,
        color: '#FFFFFF',
    },
    primaryButtonTextDisabled: {
        color: Colors.textMuted,
    },
    // Celebration
    celebrationContainer: {
        alignItems: 'center',
        paddingVertical: Spacing.xl,
    },
    celebrationEmoji: {
        fontSize: 56,
        marginBottom: Spacing.md,
    },
    celebrationTitle: {
        ...Typography.title2,
        color: '#34C759',
        marginBottom: Spacing.xs,
    },
    celebrationSubtitle: {
        ...Typography.body,
        color: Colors.textMuted,
        textAlign: 'center',
    },
});
