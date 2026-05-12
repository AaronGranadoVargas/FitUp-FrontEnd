import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api';

export default function SuccessScreen() {
    const router = useRouter();
    const { token: tokenPayPal } = useLocalSearchParams();
    const [estado, setEstado] = useState('Procesando tu pago en el servidor...');

    useEffect(() => {
        const confirmarPago = async () => {
            if (!tokenPayPal) return;
            try {
                const userToken = Platform.OS === 'web'
                    ? localStorage.getItem('userToken')
                    : await SecureStore.getItemAsync('userToken');

                await axios.post(`${API_URL}/pedidos/paypal/capture?orderId=${tokenPayPal}`, {}, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });

                setEstado('¡Pago completado con éxito! 🎉 Redirigiendo a la tienda...');

                setTimeout(() => {
                    router.replace('/(tabs)/tienda');
                }, 3000);

            } catch (error) {
                setEstado('Error al confirmar el pago. Contacta con soporte.');
            }
        };

        confirmarPago();
    }, [tokenPayPal]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#003087" />
            <Text style={styles.text}>{estado}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7FA', justifyContent: 'center', alignItems: 'center', padding: 20 },
    text: { marginTop: 20, fontSize: 18, fontWeight: 'bold', color: '#003087', textAlign: 'center' }
});