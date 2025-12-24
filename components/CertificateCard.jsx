import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlassCard from './GlassCard';
import { Colors } from '../constants/Colors';
import { Circle, Svg } from 'react-native-svg';

const ProgressRing = ({ progress, size = 44, strokeWidth = 4, color }) => {
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
                    stroke={Colors.glassBorder}
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
            <Text style={{ fontSize: 10, fontWeight: '700', color: Colors.text }}>{progress}%</Text>
        </View>
    );
};

export default function CertificateCard({ title, subtitle, role, progress, color }) {
    return (
        <GlassCard style={styles.card} intensity={40}>
            <View style={styles.topRow}>
                <View style={[styles.iconCircle, { backgroundColor: color + '15', borderColor: color + '30' }]}>
                    <Text style={[styles.iconText, { color }]}>{title.charAt(0)}</Text>
                </View>
                <ProgressRing progress={progress} color={color} />
            </View>

            <View style={styles.content}>
                <Text style={styles.role} numberOfLines={1}>{role}</Text>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
            </View>
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        marginRight: 15,
        minHeight: 150,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    iconText: {
        fontSize: 20,
        fontWeight: '700',
    },
    content: {
        gap: 4,
    },
    role: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.textMuted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    subtitle: {
        fontSize: 13,
        color: Colors.textMuted,
    },
});
