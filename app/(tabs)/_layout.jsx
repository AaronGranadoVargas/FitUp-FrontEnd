import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { theme } from '../../src/styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    const router = useRouter();
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        const comprobarAcceso = async () => {
            try {
                let token = null;
                if (Platform.OS === 'web') {
                    token = localStorage.getItem('userToken');
                } else {
                    token = await SecureStore.getItemAsync('userToken');
                }

                if (!token) {
                    router.replace('/');
                } else {
                    setVerificando(false);
                }
            } catch (error) {
                router.replace('/');
            }
        };

        comprobarAcceso();
    }, []);

    if (verificando) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.colors.fondoBase }}>
                <ActivityIndicator size="large" color={theme.colors.naranja} />
            </View>
        );
    }

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.colors.naranja,
            tabBarInactiveTintColor: theme.colors.grisTexto,
            tabBarStyle: {
                backgroundColor: theme.colors.blanco,
                borderTopWidth: 0,
                elevation: 10,
                shadowOpacity: 0.1,
                height: 65,
                paddingBottom: 10,
            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={26} color={color} />
                }}
            />
        </Tabs>
    );
}