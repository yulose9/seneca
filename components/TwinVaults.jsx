import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import GlassCard from './GlassCard';
import { Colors } from '../constants/Colors';

const VaultRow = ({ title, current, target, color, gradientColors }) => {
    const progress = Math.min((current / target) * 100, 100);

    return (
        <View style={styles.row}>
            <View style={styles.headerRow}>
                <Text style={styles.rowTitle}>{title}</Text>
                <TouchableOpacity style={styles.addButton}>
                    <Plus size={16} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.amountContainer}>
                <Text style={[styles.currentAmount, { color }]}>₱{current.toLocaleString()}</Text>
                <Text style={styles.targetAmount}> / {target / 1000}k</Text>
            </View>

            <View style={styles.barContainer}>
                <View style={[styles.barBg, { backgroundColor: color + '15' }]} />
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.barFill, { width: `${progress}%` }]}
                />
            </View>
        </View>
    );
};

export default function TwinVaults() {
    return (
        <GlassCard style={styles.card}>
            <Text style={styles.sectionHeader}>Wealth</Text>

            <VaultRow
                title="Emergency Fund"
                current={35000}
                target={100000}
                color={Colors.success}
                gradientColors={['#14B8A6', '#0F766E']}
            />

            <View style={styles.divider} />

            <VaultRow
                title="AI & Growth Stocks"
                current={12500}
                target={100000}
                color={Colors.warning}
                gradientColors={['#F59E0B', '#D97706']}
            />
        </GlassCard>
    );
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.primary,
        marginBottom: 20,
        fontFamily: 'System',
    },
    row: {
        marginBottom: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    rowTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.textMuted,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 12,
    },
    currentAmount: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    targetAmount: {
        fontSize: 14,
        color: Colors.textMuted,
        marginLeft: 4,
    },
    barContainer: {
        height: 12,
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative',
    },
    barBg: {
        ...StyleSheet.absoluteFillObject,
    },
    barFill: {
        height: '100%',
        borderRadius: 6,
    },
    addButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.glassBorder,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.glassBorder,
        marginVertical: 20,
    }
});
