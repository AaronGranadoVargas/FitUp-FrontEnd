import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getMiCarrito, eliminarProductoCarrito, vaciarCarrito } from '../../src/api/carritoService';

const COLORS = {
    dark: "#1E1E1E",
    white: "#FFFFFF",
    greenLight: "#EDF2EB",
    gray: "#F5F5F3",
    grayText: "#888884",
    naranja: "#F97316"
};

export default function CarritoScreen() {
    const router = useRouter();
    const [carrito, setCarrito] = useState([]);
    const [cargando, setCargando] = useState(true);

    useFocusEffect(
        useCallback(() => { cargarCarrito(); }, [])
    );

    const cargarCarrito = async () => {
        setCargando(true);
        try {
            const data = await getMiCarrito();
            setCarrito(data);
        } catch (e) { console.error(e); }
        finally { setCargando(false); }
    };

    const total = carrito.reduce((sum, item) => sum + (item.subtotal || 0), 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.nombreProducto}</Text>
                <Text style={styles.qty}>Cantidad: {item.cantidad} x {item.precioUnitario}€</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.subtotal}>{item.subtotal.toFixed(2)} €</Text>
                <TouchableOpacity onPress={() => eliminarProductoCarrito(item.id).then(cargarCarrito)}>
                    <Ionicons name="trash-outline" size={18} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (cargando) return <View style={styles.center}><ActivityIndicator color={COLORS.dark} /></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Tu Carrito</Text>

            {carrito.length === 0 ? (
                <Text style={styles.empty}>Vaya, parece que no hay nada aquí...</Text>
            ) : (
                <>
                    <FlatList data={carrito} renderItem={renderItem} keyExtractor={i => i.id.toString()} />
                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalPrice}>{total.toFixed(2)} €</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btnPay}
                            onPress={() => router.push({ pathname: '/checkout', params: { total } })}
                        >
                            <Text style={styles.btnText}>PAGAR AHORA</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', padding: 20 },
    center: { flex: 1, justifyContent: 'center' },
    headerTitle: { fontSize: 32, fontWeight: '900', marginBottom: 20 },
    cartItem: { flexDirection: 'row', padding: 15, backgroundColor: COLORS.gray, borderRadius: 15, marginBottom: 10, justifyContent: 'space-between' },
    name: { fontWeight: 'bold', fontSize: 16 },
    qty: { color: COLORS.grayText, fontSize: 12 },
    right: { alignItems: 'flex-end', gap: 5 },
    subtotal: { fontWeight: '900', fontSize: 16 },
    footer: { paddingVertical: 20, borderTopWidth: 1, borderColor: COLORS.gray },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    totalLabel: { fontSize: 18, color: COLORS.grayText },
    totalPrice: { fontSize: 24, fontWeight: '900' },
    btnPay: { backgroundColor: COLORS.dark, padding: 18, borderRadius: 15, alignItems: 'center' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    empty: { textAlign: 'center', marginTop: 50, color: COLORS.grayText }
});