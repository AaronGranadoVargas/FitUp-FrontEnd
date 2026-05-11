import React, { useState, useCallback } from 'react';
import { agregarProductoCarrito } from '../../src/api/carritoService'; // <-- Añade esta importación arriba
import { Alert } from 'react-native'; // <-- Asegúrate de tener Alert importado
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getProductos } from '../../src/api/tiendaService';
import { theme } from '../../src/styles/theme';

export default function TiendaScreen() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const handleAddToCart = async (producto) => {
        try {
            await agregarProductoCarrito(producto.id, 1);
            Alert.alert("🛒 Añadido", `${producto.nombre} se ha añadido a tu carrito.`);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo añadir al carrito.");
        }
    };

    useFocusEffect(
        useCallback(() => {
            cargarCatalogo();
        }, [])
    );

    const cargarCatalogo = async () => {
        setCargando(true);
        const data = await getProductos();
        setProductos(data);
        setCargando(false);
    };

    const renderProducto = ({ item }) => (
        <View style={styles.card}>
            {/* Si tienes imágenes reales en la BD, usas item.imagenUrl. Si no, un icono genérico */}
            <View style={styles.imagePlaceholder}>
                <Ionicons
                    name={item.categoria === 'ROPA' ? 'shirt-outline' : 'nutrition-outline'}
                    size={50} color="#CCC"
                />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.categoriaTag}>{item.categoria}</Text>
                <Text style={styles.title} numberOfLines={2}>{item.nombre}</Text>
                <Text style={styles.price}>{item.precio.toFixed(2)} €</Text>

                <TouchableOpacity style={styles.btnAdd} onPress={() => handleAddToCart(item)}>
                    <Ionicons name="cart" size={18} color="white" />
                    <Text style={styles.btnAddText}>Añadir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (cargando) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={theme.colors.naranja} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Tienda FitUp</Text>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                renderItem={renderProducto}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.fondoBase, padding: 15 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 28, fontWeight: '900', color: '#333', marginBottom: 20, marginTop: 10 },
    row: { justifyContent: 'space-between', marginBottom: 15 },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '23%', // ← Cambia esto a 23% o 24%
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden'
    },
    imagePlaceholder: {
        backgroundColor: '#F8F9FA',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE'
    },
    cardContent: { padding: 12 },
    categoriaTag: { fontSize: 10, color: theme.colors.naranja, fontWeight: 'bold', marginBottom: 4 },
    title: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 8, minHeight: 38 },
    price: { fontSize: 18, fontWeight: '900', color: '#333', marginBottom: 12 },
    btnAdd: {
        backgroundColor: theme.colors.naranja,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6
    },
    btnAddText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});