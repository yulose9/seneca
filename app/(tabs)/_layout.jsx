import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';
import { Home, Flame, Trophy, Landmark, BookOpen } from 'lucide-react-native';

/**
 * NativeTabs Layout - Liquid Glass Floating Navigation
 * 
 * Information Architecture:
 * 1. Home     - The Cockpit (Dashboard of Sneak Peeks)
 * 2. Protocol - Daily Habits (Morning Ignition, etc.)
 * 3. Growth   - Certifications & Goals
 * 4. Wealth   - Savings, Stocks, & Loans
 * 5. Journal  - The Evening Review/Mirror
 * 
 * Visual Specs (iOS 26 Style):
 * - Floating lozenge shape
 * - Heavy frosted glass material
 * - SF Symbols (stroke style)
 * - Active state: Deep blue liquid glow
 */
export default function TabLayout() {
    return (
        <NativeTabs
            // iOS system blue for active tint
            tintColor="#007AFF"
            // Floating behavior - minimizes on scroll, floats above content
            minimizeBehavior="onScrollDown"
            // Prevent transparency glitches
            disableTransparentOnScrollEdge
        >

            {/* Tab 1: Home - The Cockpit */}
            <NativeTabs.Trigger name="index">
                <Label>Home</Label>
                {Platform.select({
                    ios: <Icon sf={{ default: 'house', selected: 'house.fill' }} />,
                    android: <Icon src={<Home color="#000" size={24} />} />,
                })}
            </NativeTabs.Trigger>

            {/* Tab 2: Protocol - Daily Habits */}
            <NativeTabs.Trigger name="protocol">
                <Label>Protocol</Label>
                {Platform.select({
                    ios: <Icon sf={{ default: 'flame', selected: 'flame.fill' }} />,
                    android: <Icon src={<Flame color="#000" size={24} />} />,
                })}
            </NativeTabs.Trigger>

            {/* Tab 3: Growth - Certifications & Goals */}
            <NativeTabs.Trigger name="growth">
                <Label>Growth</Label>
                {Platform.select({
                    ios: <Icon sf={{ default: 'trophy', selected: 'trophy.fill' }} />,
                    android: <Icon src={<Trophy color="#000" size={24} />} />,
                })}
            </NativeTabs.Trigger>

            {/* Tab 4: Wealth - Savings, Stocks, Loans */}
            <NativeTabs.Trigger name="wealth">
                <Label>Wealth</Label>
                {Platform.select({
                    ios: <Icon sf={{ default: 'banknote', selected: 'banknote.fill' }} />,
                    android: <Icon src={<Landmark color="#000" size={24} />} />,
                })}
            </NativeTabs.Trigger>

            {/* Tab 5: Journal - Evening Review */}
            <NativeTabs.Trigger name="journal">
                <Label>Journal</Label>
                {Platform.select({
                    ios: <Icon sf={{ default: 'book', selected: 'book.fill' }} />,
                    android: <Icon src={<BookOpen color="#000" size={24} />} />,
                })}
            </NativeTabs.Trigger>

        </NativeTabs>
    );
}
