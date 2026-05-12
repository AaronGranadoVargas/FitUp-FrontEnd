import { Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
// 1. Importa Image de react-native
import { Platform, View, ActivityIndicator, useWindowDimensions, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../src/context/ThemeContext';

// 2. Importa tu imagen. Ajusta la ruta si es necesario.
import FitUpOutline from '../../assets/images/FitUp-outline.png';

export default function TabLayout() {
    const router = useRouter();
    const [verificando, setVerificando] = useState(true);
    const { theme } = useTheme();
    const { width } = useWindowDimensions();

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

    const isMobileView = width < 768;
    const isWebTopBar = Platform.OS === 'web' && !isMobileView;

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
            tabBarPosition: isWebTopBar ? 'top' : 'bottom',
            tabBarShowLabel: false,
            tabBarItemStyle: {
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: isWebTopBar ? 0 : 10,
            },
            tabBarStyle: {
                backgroundColor: theme.colors.blanco,
                borderTopWidth: 0,
                borderTopColor: theme.colors.borde,
                height: isWebTopBar ? 65 : 90,
                paddingBottom: isWebTopBar ? 0 : 30,
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
                                backgroundColor: theme.colors.naranja,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={FitUpOutline}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        tintColor: theme.colors.blanco
                                    }}
                                />
                            </View>
                        ) : (
                            <Image
                                source={FitUpOutline}
                                style={{
                                    width: 32,
                                    height: 32,
                                    tintColor: color
                                }}
                            />
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
                                backgroundColor: theme.colors.naranja,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="calendar-outline" size={32} color={theme.colors.blanco} />
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
                                backgroundColor: theme.colors.naranja,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Ionicons name="person-outline" size={32} color={theme.colors.blanco} />
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