import React, { useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Animated, Image, useWindowDimensions } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getProductos } from '../../src/api/tiendaService';
import { agregarProductoCarrito } from '../../src/api/carritoService';

const COLORS = {
    green: "#94A78E",
    dark: "#1E1E1E",
    white: "#FFFFFF",
    greenLight: "#EDF2EB",
    gray: "#F5F5F3",
    grayText: "#888884",
    red: "#EF4444",
    orange: "#F97316"
};

export default function TiendaScreen() {
    const { width } = useWindowDimensions();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const numColumns = width > 700 ? 4 : 2;
    const cardWidth = (width / numColumns) - (width > 700 ? 25 : 20);

    useFocusEffect(
        useCallback(() => { cargarCatalogo(); }, [])
    );

    const cargarCatalogo = async () => {
        setCargando(true);
        try {
            const data = await getProductos();
            setProductos(data);
        } catch (e) { console.error(e); }
        finally { setCargando(false); }
    };

    const handleAddToCart = async (producto) => {
        if (producto.stock <= 0) return;
        try {
            await agregarProductoCarrito(producto.id, 1);
            mostrarToast();
        } catch (error) { console.error(error); }
    };

    const mostrarToast = () => {
        setShowToast(true);
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
        setTimeout(() => {
            Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => { setShowToast(false); });
        }, 1500);
    };

    const renderProducto = ({ item }) => {
        const outOfStock = item.stock <= 0;
        const lowStock = item.stock > 0 && item.stock < 5;

        return (
            <View style={[styles.card, { width: cardWidth }]}>
                <View style={styles.imageContainer}>
                    {item.imagenUrl ? (
                        <Image source={{ uri: item.imagenUrl }} style={styles.image} />
                    ) : (
                        <Ionicons name={item.categoria === 'ROPA' ? 'shirt-outline' : 'nutrition-outline'} size={32} color={COLORS.grayText} />
                    )}
                </View>

                <Text style={styles.title} numberOfLines={2}>{item.nombre}</Text>

                {/* INDICADOR DE STOCK PROFESIONAL */}
                <View style={styles.stockRow}>
                    <View style={[styles.stockDot, { backgroundColor: outOfStock ? COLORS.red : lowStock ? COLORS.orange : COLORS.green }]} />
                    <Text style={[styles.stockText, { color: outOfStock ? COLORS.red : COLORS.grayText }]}>
                        {outOfStock ? 'Sin stock' : lowStock ? `¡Solo ${item.stock} uds!` : `Stock: ${item.stock}`}
                    </Text>
                </View>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>{item.precio.toFixed(2)} €</Text>
                    <TouchableOpacity
                        style={[styles.addButton, outOfStock && { opacity: 0.3 }]}
                        onPress={() => handleAddToCart(item)}
                        disabled={outOfStock}
                    >
                        <Ionicons name={outOfStock ? "close" : "add"} size={22} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (cargando) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.dark} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {showToast && (
                <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.green} />
                    <Text style={styles.toastText}>Añadido al carrito</Text>
                </Animated.View>
            )}

            <Text style={styles.headerTitle}>FitUp Store</Text>

            <FlatList
                key={numColumns}
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                numColumns={numColumns}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                renderItem={renderProducto}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 15 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 32, fontWeight: '900', color: COLORS.dark, marginVertical: 20 },
    columnWrapper: { justifyContent: 'flex-start', gap: 15 },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.greenLight,
    },
    imageContainer: {
        aspectRatio: 1,
        backgroundColor: COLORS.gray,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        overflow: 'hidden'
    },
    image: { width: '100%', height: '100%' },
    title: { fontSize: 13, fontWeight: '700', color: COLORS.dark, height: 35 },
    stockRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginVertical: 5 },
    stockDot: { width: 6, height: 6, borderRadius: 3 },
    stockText: { fontSize: 11, fontWeight: '600' },
    bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
    price: { fontSize: 16, fontWeight: '900', color: COLORS.dark },
    addButton: { backgroundColor: COLORS.dark, padding: 6, borderRadius: 8 },
    toast: { position: 'absolute', top: 20, alignSelf: 'center', backgroundColor: COLORS.dark, flexDirection: 'row', padding: 12, borderRadius: 50, zIndex: 1000, gap: 8, alignItems: 'center' },
    toastText: { color: COLORS.white, fontWeight: 'bold' }
});