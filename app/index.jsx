import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { theme } from '../src/styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
    const router = useRouter();
    const [verificando, setVerificando] = useState(true);

    useEffect(() => {
        const comprobarSesion = async () => {
            try {
                let token = null;
                if (Platform.OS === 'web') {
                    token = localStorage.getItem('userToken');
                } else {
                    token = await SecureStore.getItemAsync('userToken');
                }
                if (token) {
                    router.replace('/(tabs)/home');
                } else {
                    setVerificando(false);
                }
            } catch (error) {
                setVerificando(false);
            }
        };

        comprobarSesion();
    }, []);

    if (verificando) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.naranja} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.iconBackground}>
                    <Ionicons name="barbell" size={80} color="white" />
                </View>
                <Text style={styles.title}>FitUp</Text>
                <Text style={styles.subtitle}>Supera tus límites cada día.</Text>
            </View>

            {/* SECCIÓN INFERIOR: Botones */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/login')}
                >
                    <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push('/register')}
                >
                    <Text style={styles.secondaryButtonText}>Crear una cuenta nueva</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBackground: {
        backgroundColor: theme.colors.naranja,
        padding: 20,
        borderRadius: 60,
        marginBottom: 20,
        elevation: 8,
        shadowColor: theme.colors.naranja,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    title: {
        fontSize: 48,
        fontWeight: '900',
        color: '#333',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },
    bottomContainer: {
        width: '100%',
        paddingBottom: 20,
    },
    primaryButton: {
        backgroundColor: theme.colors.naranja,
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.naranja,
    },
    secondaryButtonText: {
        color: theme.colors.naranja,
        fontSize: 18,
        fontWeight: 'bold',
    },
});