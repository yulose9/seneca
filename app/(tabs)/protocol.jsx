import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii, SenecaBlue } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';
import { useProtocol } from '../../context/ProtocolContext';

/**
 * Protocol Screen - Daily Habits & Routines
 * Uses shared ProtocolContext for state (syncs with Home)
 * Features animated checkboxes, strikethrough, and counter
 */

// Animated Checkbox Component
const AnimatedCheckbox = ({ done, onToggle }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const checkAnim = useRef(new Animated.Value(done ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(checkAnim, {
            toValue: done ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [done]);

    const handlePress = () => {
        // Bounce animation
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 0.8,
                useNativeDriver: true,
                friction: 3,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 3,
            }),
        ]).start();

        onToggle();
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <Animated.View style={[
                styles.checkbox,
                {
                    transform: [{ scale: scaleAnim }],
                    backgroundColor: done ? SenecaBlue.start : 'transparent',
                    borderColor: done ? SenecaBlue.start : Colors.textMuted,
                }
            ]}>
                {done && (
                    <Animated.Text style={[
                        styles.checkmark,
                        { opacity: checkAnim }
                    ]}>
                        ✓
                    </Animated.Text>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

// Animated Task Text with Strikethrough
const AnimatedTaskText = ({ text, done }) => {
    const strikeAnim = useRef(new Animated.Value(done ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(strikeAnim, {
            toValue: done ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [done]);

    const strikeWidth = strikeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const textOpacity = strikeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
    });

    return (
        <View style={styles.taskTextContainer}>
            <Animated.Text style={[
                styles.taskText,
                { opacity: textOpacity }
            ]}>
                {text}
            </Animated.Text>
            <Animated.View style={[
                styles.strikeLine,
                { width: strikeWidth }
            ]} />
        </View>
    );
};

// Animated Number Counter
const AnimatedCounter = ({ value, total }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current !== value) {
            const direction = prevValue.current < value ? -1 : 1;
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: direction * 20,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -direction * 20,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                    friction: 8,
                    tension: 100,
                }),
            ]).start();
            prevValue.current = value;
        }
    }, [value]);

    return (
        <View style={styles.counterContainer}>
            <View style={styles.counterOverflow}>
                <Animated.Text style={[
                    styles.counterNumber,
                    { transform: [{ translateY }] }
                ]}>
                    {value}
                </Animated.Text>
            </View>
            <Text style={styles.counterSlash}>/{total}</Text>
        </View>
    );
};

export default function ProtocolScreen() {
    const insets = useSafeAreaInsets();

    // Use shared context
    const { tasks, toggleTask, completedCount, totalCount, isComplete } = useProtocol();

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
                <Text style={styles.title}>Protocol</Text>
                <Text style={styles.subtitle}>Your daily discipline system</Text>

                {/* Morning Ignition */}
                <GlassCard>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>🔥 Morning Ignition</Text>
                        <View style={styles.progressBadge}>
                            <AnimatedCounter value={completedCount} total={totalCount} />
                        </View>
                    </View>

                    {tasks.map((task, index) => (
                        <View key={task.id} style={[
                            styles.taskRow,
                            index < tasks.length - 1 && styles.taskBorder
                        ]}>
                            <AnimatedCheckbox
                                done={task.done}
                                onToggle={() => toggleTask(task.id)}
                            />
                            <AnimatedTaskText
                                text={task.title}
                                done={task.done}
                            />
                        </View>
                    ))}
                </GlassCard>

                {/* The Arena */}
                <GlassCard>
                    <Text style={styles.sectionTitle}>⚔️ The Arena</Text>
                    <Text style={styles.inactiveText}>
                        {isComplete
                            ? "Morning Ignition complete! Ready for battle."
                            : "Waiting for Morning Ignition..."}
                    </Text>
                </GlassCard>

                {/* Wind Down */}
                <GlassCard>
                    <Text style={styles.sectionTitle}>🌙 Wind Down</Text>
                    <Text style={styles.inactiveText}>Available after 8:00 PM</Text>
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        ...Typography.headline,
        color: Colors.text,
    },
    progressBadge: {
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        backgroundColor: SenecaBlue.start + '15',
        borderRadius: Radii.sm,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterOverflow: {
        height: 22,
        overflow: 'hidden',
    },
    counterNumber: {
        ...Typography.subheadline,
        color: SenecaBlue.start,
        fontWeight: '700',
    },
    counterSlash: {
        ...Typography.subheadline,
        color: SenecaBlue.start,
        fontWeight: '600',
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
    },
    taskBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.separator,
    },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        marginRight: Spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 14,
    },
    taskTextContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
    },
    taskText: {
        ...Typography.body,
        color: Colors.text,
    },
    strikeLine: {
        position: 'absolute',
        left: 0,
        top: '50%',
        height: 2,
        backgroundColor: Colors.textMuted,
        borderRadius: 1,
    },
    inactiveText: {
        ...Typography.subheadline,
        color: Colors.textMuted,
        marginTop: Spacing.sm,
    },
});
