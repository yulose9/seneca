import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, CheckSquare, Trophy, Landmark, MessageCircle } from 'lucide-react-native';
import { Colors } from '../constants/Colors';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Fluid configuration
const TAB_BAR_WIDTH = WINDOW_WIDTH - 40;
const TAB_COUNT = 5;
const TAB_WIDTH = TAB_BAR_WIDTH / TAB_COUNT;

/**
 * Fluid Liquid Glass Tab Bar (Stable / Expo Go Compatible)
 * 
 * Features:
 * - Uses Standard React Native Animated API (No Reanimated crashes)
 * - Uses Expo BlurView for background
 * - Fluid Spring Animation for active indicator
 */
export default function TabBar({ activeTab: initialTab = 'home' }) {
    const [activeId, setActiveId] = useState(initialTab);

    const tabs = [
        { id: 'home', Icon: Home },
        { id: 'discipline', Icon: CheckSquare },
        { id: 'achievements', Icon: Trophy },
        { id: 'wealth', Icon: Landmark },
        { id: 'journal', Icon: MessageCircle },
    ];

    const activeIndex = tabs.findIndex(t => t.id === activeId);

    // Use standard Animated API
    const translateX = useRef(new Animated.Value(activeIndex * TAB_WIDTH)).current;

    useEffect(() => {
        // Spring physics for "Liquid" feel
        Animated.spring(translateX, {
            toValue: activeIndex * TAB_WIDTH,
            useNativeDriver: true, // Performance optimized
            tensions: 60,
            friction: 10,
        }).start();
    }, [activeIndex]);

    return (
        <View style={styles.shadowContainer}>
            {/* Container simulating GlassView border */}
            <View style={styles.borderWrapper}>
                <BlurView
                    style={StyleSheet.absoluteFill}
                    intensity={80}
                    tint="light"
                />

                <View style={styles.innerContent}>

                    {/* Fluid Active Indicator */}
                    <Animated.View style={[
                        styles.activePillContainer,
                        { transform: [{ translateX }] }
                    ]}>
                        <LinearGradient
                            colors={['rgba(0,122,255,0.15)', 'rgba(0,122,255,0.05)']}
                            style={styles.activePill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        />
                        {/* Glow effect */}
                        <View style={styles.pillGlow} />
                    </Animated.View>

                    {/* Icons */}
                    <View style={styles.iconRow}>
                        {tabs.map(({ id, Icon }) => {
                            const isActive = activeId === id;
                            return (
                                <TouchableOpacity
                                    key={id}
                                    style={styles.tabItem}
                                    activeOpacity={0.7}
                                    onPress={() => setActiveId(id)}
                                >
                                    <Icon
                                        size={24}
                                        color={isActive ? '#007AFF' : Colors.textMuted}
                                        strokeWidth={isActive ? 2.5 : 2}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowContainer: {
        width: TAB_BAR_WIDTH,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        borderRadius: 32,
        backgroundColor: 'transparent',
    },
    borderWrapper: {
        borderRadius: 32,
        overflow: 'hidden',
        height: 64,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        // Slight white background to ensure blur visibility
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    innerContent: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    activePillContainer: {
        position: 'absolute',
        left: 0,
        top: 6, // Centered vertically (64 - 52)/2
        width: TAB_WIDTH,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activePill: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    pillGlow: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 122, 255, 0.2)',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    iconRow: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});
