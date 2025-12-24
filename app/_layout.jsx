import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Colors';
import { ProtocolProvider } from '../context/ProtocolContext';

/**
 * Root Layout
 * 
 * HIG: Use light status bar style with light backgrounds
 * Provides the navigation structure for the entire app
 * ProtocolProvider wraps all screens for shared task state
 */
export default function RootLayout() {
    return (
        <ProtocolProvider>
            <StatusBar style="dark" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: Colors.background },
                    animation: 'default', // Native iOS push animation
                }}
            >
                <Stack.Screen name="(tabs)" />
            </Stack>
        </ProtocolProvider>
    );
}
