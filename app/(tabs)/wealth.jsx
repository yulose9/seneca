import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii, WealthTeal } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';
import { useState } from 'react';

const ProgressBar = ({ current, target, color = WealthTeal.start }) => {
    const percentage = Math.min((current / target) * 100, 100);
    return (
        <View style={styles.progressContainer}>
            <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: color }]} />
        </View>
    );
};

export default function WealthScreen() {
    const insets = useSafeAreaInsets();

    const assets = {
        savings: { current: 1928, target: 100000, label: 'Emergency Fund', icon: '🏦', platform: 'MariBank' },
        investments: { current: 5000, target: 100000, label: 'AI Growth Stocks', icon: '📈', platform: 'Trading212' },
    };

    const liabilities = {
        kuya: { amount: 16000, label: 'Loan from Kuya', icon: '🤝' },
        other: { amount: 160000, label: 'Other Loans', icon: '🏦' },
    };

    const totalAssets = assets.savings.current + assets.investments.current;
    const totalLiabilities = liabilities.kuya.amount + liabilities.other.amount;
    const netWorth = totalAssets - totalLiabilities;

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
                <View style={styles.header}>
                    <Text style={styles.title}>Wealth</Text>
                    <Text style={styles.subtitle}>Financial Fortress</Text>
                </View>

                {/* Net Worth Hero */}
                <GlassCard variant="dark" style={styles.netWorthCard}>
                    <Text style={styles.netLabel}>NET WORTH</Text>
                    <Text style={[styles.netValue, { color: netWorth >= 0 ? '#34C759' : '#FF3B30' }]}>
                        {netWorth < 0 ? '-' : ''}₱{Math.abs(netWorth).toLocaleString()}
                    </Text>
                    <View style={styles.netFooter}>
                        <View style={styles.netStat}>
                            <Text style={styles.netStatLabel}>ASSETS</Text>
                            <Text style={styles.netStatValue}>₱{totalAssets.toLocaleString()}</Text>
                        </View>
                        <View style={styles.verticalDivider} />
                        <View style={styles.netStat}>
                            <Text style={styles.netStatLabel}>LIABILITIES</Text>
                            <Text style={styles.netStatValue}>₱{totalLiabilities.toLocaleString()}</Text>
                        </View>
                    </View>
                </GlassCard>

                {/* Growth Targets */}
                <Text style={styles.sectionLabel}>WAR CHEST (GOALS)</Text>
                <GlassCard>
                    <View style={styles.assetRow}>
                        <View style={styles.iconBox}>
                            <Text style={{ fontSize: 24 }}>{assets.savings.icon}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Text style={styles.assetName}>{assets.savings.platform}</Text>
                                <Text style={styles.assetValue}>₱{assets.savings.current.toLocaleString()} / 100k</Text>
                            </View>
                            <ProgressBar current={assets.savings.current} target={assets.savings.target} color="#34C759" />
                            <Text style={styles.assetSub}>{assets.savings.label}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.assetRow}>
                        <View style={styles.iconBox}>
                            <Text style={{ fontSize: 24 }}>{assets.investments.icon}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Text style={styles.assetName}>{assets.investments.platform}</Text>
                                <Text style={styles.assetValue}>₱{assets.investments.current.toLocaleString()} / 100k</Text>
                            </View>
                            <ProgressBar current={assets.investments.current} target={assets.investments.target} color="#5856D6" />
                            <Text style={styles.assetSub}>{assets.investments.label}</Text>
                        </View>
                    </View>
                </GlassCard>

                {/* Liabilities */}
                <Text style={styles.sectionLabel}>OBLIGATIONS</Text>
                <GlassCard>
                    <View style={styles.liabilityRow}>
                        <View style={[styles.iconBox, { backgroundColor: '#FF3B3020' }]}>
                            <Text style={{ fontSize: 20 }}>{liabilities.kuya.icon}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.liabilityName}>{liabilities.kuya.label}</Text>
                            <Text style={styles.liabilitySub}>Personal</Text>
                        </View>
                        <Text style={styles.liabilityValue}>-₱{liabilities.kuya.amount.toLocaleString()}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.liabilityRow}>
                        <View style={[styles.iconBox, { backgroundColor: '#FF3B3020' }]}>
                            <Text style={{ fontSize: 20 }}>{liabilities.other.icon}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.liabilityName}>{liabilities.other.label}</Text>
                            <Text style={styles.liabilitySub}>Bank / Other</Text>
                        </View>
                        <Text style={styles.liabilityValue}>-₱{liabilities.other.amount.toLocaleString()}</Text>
                    </View>
                </GlassCard>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { paddingHorizontal: 24 },
    header: { marginBottom: 24 },
    title: { fontSize: 36, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
    subtitle: { fontSize: 14, fontWeight: '600', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },

    netWorthCard: { marginBottom: 32, paddingVertical: 20, borderColor: 'rgba(0,0,0,0.1)' },
    netLabel: { fontSize: 13, fontWeight: '700', color: Colors.textMuted, textAlign: 'center', letterSpacing: 1.2, marginBottom: 8 },
    netValue: { fontSize: 42, fontWeight: '800', textAlign: 'center', letterSpacing: -1, marginBottom: 20 },
    netFooter: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 16 },
    netStat: { alignItems: 'center', paddingHorizontal: 20 },
    netStatLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, marginBottom: 4 },
    netStatValue: { fontSize: 16, fontWeight: '600', color: Colors.text },
    verticalDivider: { width: 1, height: 30, backgroundColor: 'rgba(0,0,0,0.1)' },

    sectionLabel: { fontSize: 13, fontWeight: '700', color: Colors.textMuted, marginTop: 24, marginBottom: 12, letterSpacing: 1, marginLeft: 4 },

    assetRow: { flexDirection: 'row', paddingVertical: 16, alignItems: 'center' },
    iconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.03)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    assetName: { fontSize: 17, fontWeight: '700', color: Colors.text },
    assetValue: { fontSize: 15, fontWeight: '600', color: Colors.textMuted },
    assetSub: { fontSize: 12, color: Colors.textMuted, marginTop: 6 },

    progressContainer: { height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, width: '100%', overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 3 },

    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginLeft: 64 },

    liabilityRow: { flexDirection: 'row', paddingVertical: 16, alignItems: 'center' },
    liabilityName: { fontSize: 16, fontWeight: '600', color: Colors.text },
    liabilitySub: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
    liabilityValue: { fontSize: 16, fontWeight: '700', color: '#FF3B30' },
});
