import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii, Gradients, SenecaBlue } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';

/**
 * Journal Screen - The Mirror / Evening Review
 * Stoic/Liquid Glass Design
 */
export default function JournalScreen() {
    const insets = useSafeAreaInsets();
    const [entry, setEntry] = useState('');

    const pastEntries = [
        {
            id: 1,
            date: 'December 23, 2024',
            preview: 'Today I completed my morning routine without skipping...',
            mood: '😊'
        },
        {
            id: 2,
            date: 'December 22, 2024',
            preview: 'Struggled with focus today. Need to improve...',
            mood: '😔'
        },
        {
            id: 3,
            date: 'December 21, 2024',
            preview: 'Great progress on the Google Cloud certification...',
            mood: '🔥'
        },
    ];

    const hour = new Date().getHours();
    const isEvening = hour >= 18;

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
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>The Mirror</Text>
                <Text style={styles.subtitle}>Reflect on your journey</Text>

                {/* Daily Prompt */}
                <GlassCard>
                    <Text style={styles.promptLabel}>
                        {isEvening ? '🌙 EVENING REVIEW' : '☀️ DAILY REFLECTION'}
                    </Text>
                    <Text style={styles.promptText}>
                        {isEvening
                            ? "The day is ending. What did you accomplish? What could you improve tomorrow?"
                            : "What's your intention for today? What will you focus on?"}
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Write your thoughts..."
                        placeholderTextColor={Colors.textMuted}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                        value={entry}
                        onChangeText={setEntry}
                    />

                    {/* Liquid Button with Gradient + Shadow */}
                    <TouchableOpacity style={styles.submitBtnContainer}>
                        <LinearGradient
                            colors={Gradients.senecaBlue}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.submitBtn}
                        >
                            <Text style={styles.submitText}>Save Entry</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </GlassCard>

                {/* Past Entries */}
                <Text style={styles.sectionLabel}>PAST ENTRIES</Text>
                {pastEntries.map((item) => (
                    <GlassCard key={item.id}>
                        <View style={styles.entryHeader}>
                            <Text style={styles.entryMood}>{item.mood}</Text>
                            <Text style={styles.entryDate}>{item.date}</Text>
                        </View>
                        <Text style={styles.entryPreview} numberOfLines={2}>
                            {item.preview}
                        </Text>
                    </GlassCard>
                ))}

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
    promptLabel: {
        ...Typography.caption1,
        color: Colors.textMuted,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: Spacing.sm,
    },
    promptText: {
        ...Typography.body,
        color: Colors.textSecondary,
        lineHeight: 24,
        marginBottom: Spacing.base,
    },
    input: {
        ...Typography.body,
        color: Colors.text,
        backgroundColor: Colors.fill,
        borderRadius: Radii.md,
        padding: Spacing.base,
        minHeight: 120,
        marginBottom: Spacing.base,
    },
    submitBtnContainer: {
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
    submitBtn: {
        height: 50,
        borderRadius: Radii.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitText: {
        ...Typography.headline,
        color: '#FFF',
    },
    sectionLabel: {
        ...Typography.caption1,
        color: Colors.textMuted,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: Spacing.sm,
        marginTop: Spacing.xl,
    },
    entryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    entryMood: {
        fontSize: 20,
        marginRight: Spacing.sm,
    },
    entryDate: {
        ...Typography.footnote,
        color: Colors.textMuted,
    },
    entryPreview: {
        ...Typography.subheadline,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
});
