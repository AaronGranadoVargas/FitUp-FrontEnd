import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Image} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { theme } from '../src/styles/theme';
import { authStyles } from '../src/styles/authStyles';

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
                <Image
                    source={require('../assets/images/fitup-logo.png')}
                    style={authStyles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={authStyles.button}
                    onPress={() => router.push('/login')}
                >
                    <Text style={authStyles.buttonText}>Iniciar Sesión</Text>
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
        backgroundColor: theme.colors.fondoBase,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.fondoBase,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
    },
    bottomContainer: {
        width: '100%',
        maxWidth: 400,
        paddingBottom: 20,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
        borderRadius: theme.borderRadius.boton,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.naranja,
        marginTop: 10,
        minHeight: 55,
        justifyContent: 'center',
    },
    secondaryButtonText: {
        color: theme.colors.naranja,
        fontSize: 18,
        fontWeight: 'bold',
    },
});