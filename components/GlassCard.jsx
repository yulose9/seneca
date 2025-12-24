import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Radii, Spacing } from '../constants/Colors';

/**
 * GlassCard Component - Apple HIG Compliant
 * 
 * Design Rules:
 * - Uses iOS native blur (systemMaterialLight tint)
 * - Colored shadow using Seneca Blue
 * - 1px glass border for definition
 * - 16pt border radius (HIG standard for cards)
 * - 16pt internal padding
 */
export default function GlassCard({ children, style, onPress, disabled = false }) {
    const CardWrapper = onPress ? TouchableOpacity : View;

    return (
        <CardWrapper
            style={[styles.container, style]}
            activeOpacity={0.9}
            onPress={onPress}
            disabled={disabled}
        >
            {/* iOS: Native blur for true glass effect */}
            {Platform.OS === 'ios' && (
                <BlurView
                    style={StyleSheet.absoluteFill}
                    intensity={Colors.glassBlur}
                    tint="systemMaterialLight"
                />
            )}

            {/* Glass Background Layer */}
            <View style={styles.glassBackground} />

            {/* Glass Border (1px stroke for "cut glass" look) */}
            <View style={styles.glassBorder} />

            {/* Content Container */}
            <View style={styles.content}>
                {children}
            </View>
        </CardWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: Radii.lg, // 16pt - HIG standard
        overflow: 'hidden',
        marginBottom: Spacing.md, // 12pt gap between cards

        // Colored Shadow - "Secret Sauce"
        // Uses Seneca Blue instead of black for warmth
        ...Platform.select({
            ios: {
                shadowColor: Colors.shadow,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: Colors.shadowOpacity,
                shadowRadius: 16,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    glassBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.glass,
    },
    glassBorder: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: Radii.lg,
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    content: {
        padding: Spacing.base, // 16pt
    },
});
