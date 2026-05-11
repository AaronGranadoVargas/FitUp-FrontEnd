import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getMiCarrito, eliminarProductoCarrito, vaciarCarrito } from '../../src/api/carritoService';
import { theme } from '../../src/styles/theme';

export default function CarritoScreen() {
    const [carrito, setCarrito] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Se ejecuta cada vez que entras a la pestaña del carrito
    useFocusEffect(
        useCallback(() => {
            cargarCarrito();
        }, [])
    );

    const cargarCarrito = async () => {
        setCargando(true);
        try {
            const data = await getMiCarrito();
            setCarrito(data);
        } catch (error) {
            console.error("Error al cargar carrito:", error);
        } finally {
            setCargando(false);
        }
    };

    const handleEliminarItem = async (id) => {
        try {
            await eliminarProductoCarrito(id);
            cargarCarrito(); // Recargamos para actualizar la lista y el total
        } catch (error) {
            Alert.alert("Error", "No se pudo eliminar el producto.");
        }
    };

    const handleVaciarCarrito = async () => {
        Alert.alert(
            "Vaciar carrito",
            "¿Estás seguro de que quieres eliminar todos los productos?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Vaciar",
                    style: "destructive",
                    onPress: async () => {
                        await vaciarCarrito();
                        cargarCarrito();
                    }
                }
            ]
        );
    };

    // Calculamos el precio total sumando los subtotales que nos manda Java
    const totalCarrito = carrito.reduce((sum, item) => sum + (item.subtotal || 0), 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.nombreProducto}</Text>
                <Text style={styles.itemPrice}>{item.precioUnitario?.toFixed(2)} €</Text>
                <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>Cant: {item.cantidad}</Text>
                </View>
            </View>

            <View style={styles.itemActions}>
                <Text style={styles.subtotalText}>{item.subtotal?.toFixed(2)} €</Text>
                <TouchableOpacity onPress={() => handleEliminarItem(item.id)} style={styles.btnDelete}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (cargando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.naranja} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mi Carrito</Text>
                {carrito.length > 0 && (
                    <TouchableOpacity onPress={handleVaciarCarrito}>
                        <Text style={styles.clearText}>Vaciar todo</Text>
                    </TouchableOpacity>
                )}
            </View>

            {carrito.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color="#DDD" />
                    <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                    <Text style={styles.emptySubText}>¡Pásate por la tienda y añade algo de proteína!</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={carrito}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total a pagar:</Text>
                            <Text style={styles.totalAmount}>{totalCarrito.toFixed(2)} €</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btnCheckout}
                            onPress={() => alert('¡Listo para la Fase 3: Crear el Pedido!')}
                        >
                            <Text style={styles.btnCheckoutText}>TRAMITAR PEDIDO</Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.fondoBase, padding: 15 },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 },
    headerTitle: { fontSize: 28, fontWeight: '900', color: '#333' },
    clearText: { color: '#EF4444', fontWeight: 'bold', fontSize: 14 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontSize: 20, fontWeight: 'bold', color: '#666', marginTop: 15 },
    emptySubText: { fontSize: 14, color: '#999', marginTop: 5, textAlign: 'center' },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemInfo: { flex: 1, paddingRight: 10 },
    itemName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    itemPrice: { fontSize: 14, color: '#666', marginBottom: 8 },
    quantityBadge: { backgroundColor: '#F0F0F0', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    quantityText: { fontSize: 12, fontWeight: 'bold', color: '#555' },
    itemActions: { alignItems: 'flex-end', justifyContent: 'space-between', height: '100%' },
    subtotalText: { fontSize: 16, fontWeight: '900', color: theme.colors.naranja, marginBottom: 10 },
    btnDelete: { padding: 5 },
    footer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        marginTop: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    totalLabel: { fontSize: 18, color: '#555', fontWeight: 'bold' },
    totalAmount: { fontSize: 24, fontWeight: '900', color: '#333' },
    btnCheckout: {
        backgroundColor: theme.colors.naranja,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        gap: 10
    },
    btnCheckoutText: { color: 'white', fontWeight: '900', fontSize: 16, letterSpacing: 1 }
});