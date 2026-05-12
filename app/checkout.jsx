import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080/api';

export default function CheckoutScreen() {
    const router = useRouter();
    const { total } = useLocalSearchParams();

    const [cargando, setCargando] = useState(false);
    const [paypalUrl, setPaypalUrl] = useState(null);

    const getToken = async () => {
        if (Platform.OS === 'web') return localStorage.getItem('userToken');
        return await SecureStore.getItemAsync('userToken');
    };

    const iniciarPago = async () => {
        setCargando(true);
        try {
            const token = await getToken();


            const returnUrl = Platform.OS === 'web'
                ? `${window.location.origin}/success`
                : "https://fitup-app.com/success";

            const cancelUrl = Platform.OS === 'web'
                ? `${window.location.origin}/checkout`
                : "https://fitup-app.com/cancel";

            const res = await axios.post(`${API_URL}/pedidos/paypal/create`,
                { total: parseFloat(total), returnUrl, cancelUrl },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (Platform.OS === 'web') {
                window.location.href = res.data.url;
            } else {
                setPaypalUrl(res.data.url);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar con PayPal");
            setCargando(false);
        }
    };

    const handleNavChange = async (navState) => {
        if (Platform.OS === 'web') return;
        const { url } = navState;

        if (url.includes("fitup-app.com/success")) {
            setPaypalUrl(null);
            setCargando(true);
            const tokenPayPal = url.match(/token=([^&]+)/)[1];

            try {
                const token = await getToken();
                await axios.post(`${API_URL}/pedidos/paypal/capture?orderId=${tokenPayPal}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Alert.alert("¡Pago con éxito! 🎉", "Pedido procesado.");
                router.replace('/(tabs)/tienda');
            } catch (e) {
                Alert.alert("Error", "El pago fue rechazado.");
                setCargando(false);
            }
        } else if (url.includes("fitup-app.com/cancel")) {
            setPaypalUrl(null);
            Alert.alert("Cancelado", "Has cancelado el pago.");
        }
    };

    if (paypalUrl && Platform.OS !== 'web') {
        return <WebView source={{ uri: paypalUrl }} onNavigationStateChange={handleNavChange} style={{ flex: 1, marginTop: 40 }} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.paypalHeader}>
                <Ionicons name="logo-paypal" size={40} color="#003087" />
                <Text style={styles.paypalText}>PayPal Checkout</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>Importe total a pagar</Text>
                <Text style={styles.amount}>{Number(total).toFixed(2)} €</Text>
                <View style={styles.divider} />

                {cargando ? (
                    <ActivityIndicator size="large" color="#003087" style={{ marginTop: 20 }} />
                ) : (
                    <TouchableOpacity style={styles.btnConfirm} onPress={iniciarPago}>
                        <Text style={styles.btnText}>PAGAR CON PAYPAL</Text>
                    </TouchableOpacity>
                )}
            </View>
            <TouchableOpacity onPress={() => router.back()} style={styles.btnCancel}>
                <Text style={styles.cancelText}>Volver al carrito</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F7FA', padding: 25, justifyContent: 'center' },
    paypalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 30 },
    paypalText: { fontSize: 24, fontWeight: 'bold', color: '#003087', fontStyle: 'italic' },
    card: { backgroundColor: 'white', borderRadius: 20, padding: 30, elevation: 5 },
    label: { color: '#666', textAlign: 'center', fontSize: 16 },
    amount: { fontSize: 40, fontWeight: '900', textAlign: 'center', marginVertical: 10 },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },
    btnConfirm: { backgroundColor: '#FFC439', padding: 15, borderRadius: 30, alignItems: 'center', elevation: 2 },
    btnText: { color: '#003087', fontWeight: '900', fontSize: 16 },
    btnCancel: { marginTop: 20, alignItems: 'center' },
    cancelText: { color: '#0070BA', fontWeight: 'bold' }
});