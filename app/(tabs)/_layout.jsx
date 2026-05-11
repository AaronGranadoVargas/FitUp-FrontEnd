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
            tabBarPosition: Platform.OS === 'web' ? 'top' : 'bottom',
            tabBarShowLabel: false,
            tabBarItemStyle: { justifyContent: 'center', alignItems: 'center', paddingTop: 15 },
            tabBarStyle: {
                backgroundColor: theme.colors.blanco,
                borderTopWidth: 0,
                elevation: 20,
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 8 },
                shadowRadius: 12,
                height: 80,
                paddingBottom: 15,
            }
        }}>
            <Tabs.Screen
                name="tienda"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: theme.colors.naranja,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="bag" size={32} color={theme.colors.blanco} />
                            </View>
                        ) : (
                            <Ionicons name="bag-outline" size={28} color={color} />
                        )
                    )
                }}
            />
            <Tabs.Screen
                name="carrito"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: theme.colors.naranja,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="card-outline" size={32} color={theme.colors.blanco} />
                            </View>
                        ) : (
                            <Ionicons name="card-outline" size={28} color={color} />
                        )
                    )
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: theme.colors.naranja,  // Fondo naranja sólido
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="home-outline" size={32} color={theme.colors.blanco} />  {/* Icono blanco */}
                            </View>
                        ) : (
                            <Ionicons name="home-outline" size={28} color={color} />
                        )
                    )
                }}
            />
            <Tabs.Screen
                name="calendario"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: theme.colors.naranja,  // Fondo naranja sólido
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="calendar-outline" size={32} color={theme.colors.blanco} />  {/* Icono blanco */}
                            </View>
                        ) : (
                            <Ionicons name="calendar-outline" size={28} color={color} />
                        )
                    )
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        focused ? (
                            <View style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: theme.colors.naranja,  // Fondo naranja sólido
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="person-outline" size={32} color={theme.colors.blanco} />  {/* Icono blanco */}
                            </View>
                        ) : (
                            <Ionicons name="person-outline" size={28} color={color} />
                        )
                    )
                }}
            />
        </Tabs>

    );
}