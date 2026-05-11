import { Stack } from 'expo-router';
import React from "react";
import { ThemeProvider } from '@/src/context/ThemeContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="register" />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </ThemeProvider>
    );
}
