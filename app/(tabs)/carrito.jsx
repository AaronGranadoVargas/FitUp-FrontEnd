import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getMiCarrito, agregarProductoCarrito, eliminarProductoCarrito } from '../../src/api/carritoService';

const COLORS = {
    dark: "#1E1E1E",
    white: "#FFFFFF",
    gray: "#F5F5F3",
    grayText: "#888884",
    lightGray: "#EAEAEA",
    red: "#EF4444",
    lightRed: "#FEF2F2",
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

    const sumarUnidad = async (item) => {
        try {
            await agregarProductoCarrito(item.productoId, 1);
            await cargarCarrito();
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'No se pudo actualizar la cantidad del producto.');
        }
    };

    const restarUnidad = async (item) => {
        try {
            if (item.cantidad <= 1) {
                await eliminarProductoCarrito(item.id);
            } else {
                await agregarProductoCarrito(item.productoId, -1);
            }
            await cargarCarrito();
        } catch (e) {
            console.error(e);
            Alert.alert('Error', 'No se pudo actualizar la cantidad del producto.');
        }
    };

    const renderItem = ({ item }) => {
        const isLastItem = item.cantidad === 1;
        return (
            <View style={styles.cartItem}>
                <View style={styles.imageContainer}>
                    {/* Asumimos que el item tiene imagenUrl, si no, mostramos un icono */}
                    {item.imagenUrl ? (
                        <Image source={{ uri: item.imagenUrl }} style={styles.image} resizeMode="cover" />
                    ) : (
                        <Ionicons name={'shirt-outline'} size={30} color={COLORS.grayText} />
                    )}
                </View>

                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={2}>{item.nombreProducto}</Text>
                    <Text style={styles.subtotal}>{item.subtotal.toFixed(2)} €</Text>
                </View>

                <View style={styles.qtyControls}>
                    <TouchableOpacity style={[styles.qtyBtn, isLastItem && styles.trashBtn]} onPress={() => restarUnidad(item)}>
                        <Ionicons
                            name={isLastItem ? 'trash-outline' : 'remove'}
                            size={18}
                            color={isLastItem ? COLORS.red : COLORS.dark}
                        />
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.cantidad}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => sumarUnidad(item)}>
                        <Ionicons name="add" size={18} color={COLORS.dark} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (cargando) return <View style={styles.center}><ActivityIndicator color={COLORS.dark} /></View>;

    return (
        <View style={styles.container}>
            {carrito.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={60} color={COLORS.gray} />
                    <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                    <Text style={styles.emptySubtext}>Los productos que añadas desde la tienda aparecerán aquí.</Text>
                    <TouchableOpacity style={styles.shopButton} onPress={() => router.push('/tienda')}>
                        <Text style={styles.shopButtonText}>Ir a la tienda</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <Text style={styles.headerTitle}>Tu Carrito</Text>
                    <FlatList
                        data={carrito}
                        renderItem={renderItem}
                        keyExtractor={i => i.id.toString()}
                        contentContainerStyle={styles.listContent}
                    />
                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalPrice}>{total.toFixed(2)} €</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.payButton}
                            onPress={() => router.push({ pathname: '/checkout', params: { total } })}
                        >
                            <Text style={styles.payButtonText}>Pagar ahora</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },
    center: { flex: 1, justifyContent: 'center', backgroundColor: COLORS.white },
    headerTitle: { fontSize: 34, fontWeight: '900', marginVertical: 20, paddingHorizontal: 20, color: COLORS.dark },
    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
    cartItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderColor: COLORS.gray },
    imageContainer: { width: 70, height: 70, borderRadius: 12, backgroundColor: COLORS.gray, justifyContent: 'center', alignItems: 'center', marginRight: 15, overflow: 'hidden' },
    image: { width: '100%', height: '100%' },
    info: { flex: 1, justifyContent: 'center', gap: 6 },
    name: { fontSize: 15, fontWeight: '600', color: COLORS.dark },
    subtotal: { fontSize: 16, fontWeight: '800', color: COLORS.dark },
    qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    qtyBtn: {
        width: 34,
        height: 34,
        borderRadius: 17, // Hace el botón circular
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.lightGray
    },
    trashBtn: { borderColor: COLORS.red, backgroundColor: COLORS.lightRed },
    qtyValue: { minWidth: 24, textAlign: 'center', fontWeight: '700', fontSize: 16, color: COLORS.dark },
    footer: { padding: 20, borderTopWidth: 1, borderColor: COLORS.gray, backgroundColor: COLORS.white },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    totalLabel: { fontSize: 16, fontWeight: '500', color: COLORS.grayText },
    totalPrice: { fontSize: 26, fontWeight: '900', color: COLORS.dark },
    payButton: { backgroundColor: COLORS.dark, padding: 18, borderRadius: 18, alignItems: 'center' },
    payButtonText: { color: COLORS.white, fontWeight: 'bold', fontSize: 16 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, gap: 10 },
    emptyText: { fontSize: 20, fontWeight: '700', color: COLORS.dark, marginTop: 10 },
    emptySubtext: { fontSize: 14, color: COLORS.grayText, textAlign: 'center', marginBottom: 20 },
    shopButton: { backgroundColor: COLORS.dark, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
    shopButtonText: { color: COLORS.white, fontWeight: '600', fontSize: 15 },
});