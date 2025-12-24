// Growth Screen - John Nazarene Dela Pisa Roadmap
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii } from '../../constants/Colors';
import GlassCard from '../../components/GlassCard';
import Svg, { Circle } from 'react-native-svg';
import { useState } from 'react';

const ProgressRing = ({ progress, size = 56, strokeWidth = 5, color = '#2563EB' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Svg height={size} width={size} style={{ position: 'absolute' }}>
                <Circle cx={size / 2} cy={size / 2} r={radius} stroke={Colors.fill} strokeWidth={strokeWidth} fill="none" />
                <Circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
                    strokeDasharray={`${circumference} ${circumference} `} strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
            </Svg>
            <Text style={[styles.ringText, { color }]}>{progress}%</Text>
        </View>
    );
};

const SectionHeader = ({ title, color, icon }) => (
    <View style={styles.sectionHeader}>
        <View style={[styles.sectionIcon, { backgroundColor: color + '20' }]}>
            <Text style={{ fontSize: 18 }}>{icon}</Text>
        </View>
        <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
    </View>
);

const CourseRow = ({ item, isLast, color }) => (
    <View style={[styles.courseRow, !isLast && styles.courseBorder]}>
        <View style={[styles.statusIndicator,
        item.status === 'done' ? { backgroundColor: '#D1FAE5', borderColor: '#34C759' } :
            item.status === 'progress' ? { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' } :
                { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }
        ]}>
            <Text style={{ fontSize: 10 }}>{item.status === 'done' ? '✓' : item.status === 'progress' ? '⏳' : '🔒'}</Text>
        </View>
        <View style={{ flex: 1 }}>
            <Text style={[styles.courseName, item.status === 'locked' && { color: Colors.textMuted }]}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                <View style={[styles.badge, { backgroundColor: color + '10' }]}>
                    <Text style={[styles.badgeText, { color }]}>{item.level}</Text>
                </View>
                <Text style={styles.courseTarget}>Target: {item.target}</Text>
            </View>
        </View>
    </View>
);

export default function GrowthScreen() {
    const insets = useSafeAreaInsets();
    const [filter, setFilter] = useState('All');

    // Data Source: John Nazarene Dela Pisa - WDP 2025
    const domains = [
        {
            id: 'technical',
            title: "Technical Mastery",
            color: "#EF4444", // Red
            icon: "⚡",
            modules: [
                { name: "HashiCorp Certified: Terraform Associate", level: "Intermediate", target: "PASSED (Mar 3, 2025)", status: "done" },
                { name: "Red Hat Certified Systems Administrator (EX200)", level: "Expert", target: "Oct 24, 2025", status: "progress" },
                { name: "AWS Solutions Architect - Associate", level: "Intermediate", target: "Y1 Q3-Q4", status: "progress" },
                { name: "Red Hat OpenShift Admin (EX280)", level: "Expert", target: "Sep 17, 2025", status: "locked" },
                { name: "Red Hat Certified Engineer (EX294)", level: "Expert", target: "Y1 Q2-Q3", status: "locked" },
                { name: "AWS Cloud Practitioner", level: "Basic", target: "Y1 Q3-Q4", status: "progress" },
                { name: "AWS Solutions Architect - Professional", level: "Expert", target: "Y1 Q4", status: "locked" },
                { name: "AWS Developer - Associate", level: "Intermediate", target: "Y2 Q2", status: "locked" },
                { name: "AWS DevOps Engineer - Professional", level: "Intermediate", target: "Y2 Q3", status: "locked" },
                { name: "GitHub Foundations", level: "Intermediate", target: "Y2 Q3-Q4", status: "locked" },
            ]
        },
        {
            id: 'communication',
            title: "Communication Core",
            color: "#3B82F6", // Blue
            icon: "🗣️",
            modules: [
                { name: "Grammar Hangover", level: "Basic", target: "Y1 Q1-Q2", status: "done" },
                { name: "EM and IM Culture", level: "Basic", target: "Y1 Q1-Q2", status: "done" },
                { name: "Rule the Room", level: "Basic", target: "Y1 Q3-Q4", status: "progress" },
                { name: "Public Speaking & Presentation", level: "Basic", target: "Y1 Q3-Q4", status: "progress" },
                { name: "Technical Business Writing", level: "Intermediate", target: "Y1 Q3-Q4", status: "locked" },
                { name: "Active Listening & Comprehension", level: "Basic", target: "Y1 Q3-Q4", status: "locked" },
                { name: "Diplomacy & Tact", level: "Intermediate", target: "Y2 Q1-Q2", status: "locked" },
            ]
        },
        {
            id: 'collaboration',
            title: "Collaboration & Problem Solving",
            color: "#10B981", // Green
            icon: "🤝",
            modules: [
                { name: "Building a Super Team", level: "Basic", target: "Y1 Q3-Q4", status: "progress" },
                { name: "Boosting Productivity through 5S", level: "Basic", target: "Y1 Q3-Q4", status: "progress" },
                { name: "Customer Service (The 6 Cs)", level: "Basic", target: "Y1 Q3-Q4", status: "locked" },
                { name: "ITSM Essentials", level: "Basic", target: "Y1 Q3-Q4", status: "locked" },
                { name: "Critical Thinking", level: "Basic", target: "Y1 Q3-Q4", status: "progress" },
                { name: "Continuous Improvement (PDCA)", level: "Basic", target: "Y1 Q3-Q4", status: "locked" },
                { name: "Design Sprint & Strategy", level: "Advance", target: "Future", status: "locked" },
            ]
        },
        {
            id: 'leadership',
            title: "Leadership & Governance",
            color: "#8B5CF6", // Purple
            icon: "🛡️",
            modules: [
                { name: "Managing Resistance to Change", level: "Basic", target: "Y1 Q3-Q4", status: "progress" },
                { name: "Philippine Labor Law", level: "Basic", target: "Y1 Q3-Q4", status: "locked" },
                { name: "Project Management PMP", level: "Expert", target: "Y2 Q4", status: "locked" },
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <LinearGradient colors={[Colors.background, '#FFFFFF', Colors.background]} style={StyleSheet.absoluteFill} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} />

            <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + Spacing.base, paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Growth Plan</Text>
                    <Text style={styles.subtitle}>John Nazarene Dela Pisa • 2025-2026</Text>
                </View>

                {/* Hero Stat */}
                <GlassCard variant="dark" style={styles.heroCard}>
                    <View style={styles.heroContent}>
                        <View>
                            <Text style={styles.heroLabel}>OVERALL PROGRESS</Text>
                            <Text style={styles.heroValue}>Y1 Q3 Focus</Text>
                        </View>
                        <ProgressRing progress={32} size={64} color="#34C759" />
                    </View>
                    <View style={styles.heroFooter}>
                        <Text style={styles.heroFooterText}>Next Major Exam: RHCSA (Oct 24)</Text>
                    </View>
                </GlassCard>

                {domains.map((domain) => (
                    <View key={domain.id} style={styles.domainSection}>
                        <SectionHeader title={domain.title} color={domain.color} icon={domain.icon} />
                        <GlassCard>
                            {domain.modules.map((module, index) => (
                                <CourseRow key={index} item={module} isLast={index === domain.modules.length - 1} color={domain.color} />
                            ))}
                        </GlassCard>
                    </View>
                ))}

                <Text style={styles.footerNote}>Generated from WDP2025r02 • Seneca AI</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { paddingHorizontal: 24 }, // Increased padding
    header: { marginBottom: 24 },
    title: { fontSize: 36, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 },
    subtitle: { fontSize: 14, fontWeight: '600', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },

    heroCard: { marginBottom: 40, borderColor: 'rgba(52, 199, 89, 0.3)', borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.8)' },
    heroContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    heroLabel: { fontSize: 13, fontWeight: '700', color: '#34C759', letterSpacing: 1.2, marginBottom: 8 },
    heroValue: { fontSize: 32, fontWeight: '800', color: Colors.text, letterSpacing: -0.5 }, // White -> Colors.text
    heroFooter: { marginHorizontal: 12, marginBottom: 12, marginTop: 4, backgroundColor: 'rgba(52, 199, 89, 0.1)', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12 },
    heroFooterText: { color: '#34C759', fontSize: 14, fontWeight: '700', textAlign: 'center' },

    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 24 },
    sectionIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
    sectionTitle: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5, color: Colors.text },
    domainSection: { marginBottom: 32 }, // Increased spacing

    courseRow: { flexDirection: 'row', paddingVertical: 18, alignItems: 'center' },
    courseBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
    statusIndicator: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    courseName: { fontSize: 17, fontWeight: '700', color: Colors.text, lineHeight: 24, marginBottom: 4 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 8, backgroundColor: 'rgba(0,0,0,0.05)' }, // Default bg
    badgeText: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
    courseTarget: { fontSize: 13, color: Colors.textMuted, fontWeight: '600' },

    ringText: { fontSize: 14, fontWeight: '800' },
    footerNote: { textAlign: 'center', color: Colors.textMuted, fontSize: 12, marginTop: 40, marginBottom: 80, opacity: 0.5, fontWeight: '500' }
});
