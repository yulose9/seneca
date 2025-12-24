import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii, Gradients, WealthTeal } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';

/**
 * Wealth Screen - Savings, Stocks, & Loans
 * Stoic/Liquid Glass Design with Wealth Teal
 */
export default function WealthScreen() {
    const insets = useSafeAreaInsets();

    const assets = {
        savings: 30000,
        stocks: 45000,
    };

    const loans = {
        personal: 15000,
        creditCard: 5000,
    };

    const totalAssets = assets.savings + assets.stocks;
    const totalLoans = loans.personal + loans.creditCard;
    const netWorth = totalAssets - totalLoans;
    const isPositive = netWorth >= 0;

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
                <Text style={styles.title}>Wealth</Text>
                <Text style={styles.subtitle}>Your financial empire</Text>

                {/* Net Worth Summary */}
                <GlassCard>
                    <Text style={styles.netLabel}>Net Worth</Text>
                    <Text style={[styles.netValue, { color: isPositive ? WealthTeal.start : Colors.destructive }]}>
                        ₱{netWorth.toLocaleString()}
                    </Text>
                    <View style={styles.formulaRow}>
                        <Text style={styles.formulaDetail}>
                            Assets ₱{totalAssets.toLocaleString()} − Loans ₱{totalLoans.toLocaleString()}
                        </Text>
                    </View>
                </GlassCard>

                {/* Assets Section */}
                <Text style={styles.sectionLabel}>ASSETS</Text>
                <GlassCard>
                    <View style={styles.ledgerRow}>
                        <View style={styles.ledgerIcon}>
                            <Text style={styles.ledgerEmoji}>🏦</Text>
                        </View>
                        <View style={styles.ledgerInfo}>
                            <Text style={styles.ledgerName}>Savings</Text>
                            <Text style={styles.ledgerType}>Emergency Fund</Text>
                        </View>
                        <Text style={[styles.ledgerAmount, { color: WealthTeal.start }]}>
                            ₱{assets.savings.toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.ledgerRow}>
                        <View style={styles.ledgerIcon}>
                            <Text style={styles.ledgerEmoji}>📈</Text>
                        </View>
                        <View style={styles.ledgerInfo}>
                            <Text style={styles.ledgerName}>Stocks</Text>
                            <Text style={styles.ledgerType}>Investment Portfolio</Text>
                        </View>
                        <Text style={[styles.ledgerAmount, { color: WealthTeal.start }]}>
                            ₱{assets.stocks.toLocaleString()}
                        </Text>
                    </View>
                </GlassCard>

                {/* Loans Section */}
                <Text style={styles.sectionLabel}>LOANS</Text>
                <GlassCard>
                    <View style={styles.ledgerRow}>
                        <View style={styles.ledgerIcon}>
                            <Text style={styles.ledgerEmoji}>💳</Text>
                        </View>
                        <View style={styles.ledgerInfo}>
                            <Text style={styles.ledgerName}>Personal Loan</Text>
                            <Text style={styles.ledgerType}>Bank of PH</Text>
                        </View>
                        <Text style={[styles.ledgerAmount, { color: Colors.destructive }]}>
                            −₱{loans.personal.toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.ledgerRow}>
                        <View style={styles.ledgerIcon}>
                            <Text style={styles.ledgerEmoji}>💰</Text>
                        </View>
                        <View style={styles.ledgerInfo}>
                            <Text style={styles.ledgerName}>Credit Card</Text>
                            <Text style={styles.ledgerType}>Outstanding Balance</Text>
                        </View>
                        <Text style={[styles.ledgerAmount, { color: Colors.destructive }]}>
                            −₱{loans.creditCard.toLocaleString()}
                        </Text>
                    </View>
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
    netLabel: {
        ...Typography.footnote,
        color: Colors.textMuted,
        marginBottom: Spacing.xs,
    },
    netValue: {
        fontSize: 40,
        fontWeight: '700',
        letterSpacing: -1,
        marginBottom: Spacing.sm,
    },
    formulaRow: {
        backgroundColor: Colors.fill,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: Radii.sm,
        alignSelf: 'flex-start',
    },
    formulaDetail: {
        ...Typography.footnote,
        color: Colors.textMuted,
    },
    sectionLabel: {
        ...Typography.caption1,
        color: Colors.textMuted,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: Spacing.sm,
        marginTop: Spacing.lg,
    },
    ledgerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    ledgerIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.fill,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    ledgerEmoji: {
        fontSize: 20,
    },
    ledgerInfo: {
        flex: 1,
    },
    ledgerName: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '600',
    },
    ledgerType: {
        ...Typography.footnote,
        color: Colors.textMuted,
    },
    ledgerAmount: {
        ...Typography.headline,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.separator,
        marginVertical: Spacing.sm,
    },
});
