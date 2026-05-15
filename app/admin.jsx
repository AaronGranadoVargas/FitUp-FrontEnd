import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Modal, ScrollView, Image } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getProductos, crearProducto, eliminarProducto, actualizarProducto } from '../src/api/tiendaService';

const CATEGORIAS = ['SUPLEMENTO', 'ROPA', 'COMIDA'];

export default function AdminScreen() {
    const router = useRouter();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editandoId, setEditandoId] = useState(null);

    const [form, setForm] = useState({
        nombre: '', precio: '', stock: '', descripcion: '', categoria: 'SUPLEMENTO', imagenUrl: ''
    });

    useFocusEffect(useCallback(() => { cargarCatalogo(); }, []));

    const cargarCatalogo = async () => {
        setCargando(true);
        try {
            const data = await getProductos();
            setProductos(data);
        } catch (e) { Alert.alert("Error", "No se pudieron cargar los productos"); }
        finally { setCargando(false); }
    };

    const abrirEditar = (producto) => {
        setEditandoId(producto.id);
        setForm({
            nombre: producto.nombre,
            precio: producto.precio.toString(),
            stock: producto.stock.toString(),
            descripcion: producto.descripcion || '',
            categoria: producto.categoria || 'SUPLEMENTO',
            imagenUrl: producto.imagenUrl || ''
        });
        setModalVisible(true);
    };

    const abrirCrear = () => {
        setEditandoId(null);
        setForm({ nombre: '', precio: '', stock: '', descripcion: '', categoria: 'SUPLEMENTO', imagenUrl: '' });
        setModalVisible(true);
    };

    const handlePrecioChange = (texto) => {
        let limpio = texto.replace(/,/g, '.').replace(/[^0-9.]/g, '');

        const partes = limpio.split('.');
        if (partes.length > 2) {
            limpio = partes[0] + '.' + partes.slice(1).join('');
        }

        setForm({ ...form, precio: limpio });
    };

    const handleStockChange = (texto) => {
        const limpio = texto.replace(/[^0-9]/g, '');
        setForm({ ...form, stock: limpio });
    };

    const handleGuardar = async () => {
        if (!form.nombre || !form.precio || !form.stock) {
            Alert.alert("Aviso", "Rellena los campos obligatorios.");
            return;
        }

        setCargando(true);
        try {
            const body = {
                nombre: form.nombre,
                precio: parseFloat(form.precio),
                stock: parseInt(form.stock),
                descripcion: form.descripcion,
                categoria: form.categoria,
                imagenUrl: form.imagenUrl
            };

            if (editandoId) {
                await actualizarProducto(editandoId, body);
            } else {
                await crearProducto(body);
            }

            setModalVisible(false);
            cargarCatalogo();
            Alert.alert("Éxito", editandoId ? "Producto actualizado" : "Producto creado");
        } catch (e) { Alert.alert("Error", "No se pudo guardar."); }
        finally { setCargando(false); }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemRow}>
            {item.imagenUrl ? (
                <Image source={{ uri: item.imagenUrl }} style={styles.thumbnail} />
            ) : (
                <View style={[styles.thumbnail, { backgroundColor: '#EEE', justifyContent: 'center', alignItems: 'center' }]}>
                    <Ionicons name="image-outline" size={20} color="#999" />
                </View>
            )}
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemSub}>{item.stock} uds | {item.precio.toFixed(2)}€</Text>
                <View style={styles.badge}><Text style={styles.badgeText}>{item.categoria}</Text></View>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => abrirEditar(item)} style={styles.actionBtn}><Ionicons name="pencil" size={20} color="#FF8C00" /></TouchableOpacity>
                <TouchableOpacity onPress={() => handleEliminar(item.id, item.nombre)} style={styles.actionBtn}><Ionicons name="trash" size={20} color="#EF4444" /></TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
                <Text style={styles.title}>Gestión Tienda</Text>
                <TouchableOpacity onPress={abrirCrear} style={styles.addBtn}><Ionicons name="add" size={24} color="white" /></TouchableOpacity>
            </View>

            {cargando && !modalVisible ? <ActivityIndicator size="large" color="#FF8C00" /> :
                <FlatList data={productos} keyExtractor={item => item.id.toString()} renderItem={renderItem} />
            }

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.modalTitle}>{editandoId ? 'Modificar Producto' : 'Nuevo Producto'}</Text>

                            <Text style={styles.label}>Nombre del Producto</Text>
                            <TextInput style={styles.input} value={form.nombre} onChangeText={t => setForm({...form, nombre: t})} />

                            <View style={styles.row}>
                                <View style={{flex:1, marginRight:10}}>
                                    <Text style={styles.label}>Precio (€)</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="decimal-pad"
                                        value={form.precio}
                                        onChangeText={handlePrecioChange}
                                        placeholder="0.00"
                                    />
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={styles.label}>Stock</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="number-pad"
                                        value={form.stock}
                                        onChangeText={handleStockChange}
                                        placeholder="0"
                                    />
                                </View>
                            </View>

                            <Text style={styles.label}>URL de la Imagen</Text>
                            <TextInput style={styles.input} placeholder="https://..." value={form.imagenUrl} onChangeText={t => setForm({...form, imagenUrl: t})} />

                            <Text style={styles.label}>Descripción</Text>
                            <TextInput style={[styles.input, { height: 80 }]} multiline numberOfLines={3} value={form.descripcion} onChangeText={t => setForm({...form, descripcion: t})} />

                            <Text style={styles.label}>Categoría</Text>
                            <View style={styles.categoryRow}>
                                {CATEGORIAS.map((cat) => (
                                    <TouchableOpacity
                                        key={cat}
                                        style={[styles.categoryOption, form.categoria === cat && styles.categorySelected]}
                                        onPress={() => setForm({...form, categoria: cat})}
                                    >
                                        <Text style={[styles.categoryText, form.categoria === cat && styles.categoryTextSelected]}>{cat}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity style={styles.btnSave} onPress={handleGuardar}>
                                <Text style={styles.btnSaveText}>GUARDAR CAMBIOS</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.btnCancel}><Text style={{color: '#666'}}>Cerrar</Text></TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 45, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    addBtn: { backgroundColor: '#1E1E1E', padding: 10, borderRadius: 25 },
    itemRow: { flexDirection: 'row', backgroundColor: 'white', padding: 12, borderRadius: 15, marginBottom: 10, alignItems: 'center', elevation: 2 },
    thumbnail: { width: 50, height: 50, borderRadius: 10, marginRight: 12 },
    itemInfo: { flex: 1 },
    itemName: { fontWeight: 'bold', fontSize: 16 },
    itemSub: { color: '#666', fontSize: 13 },
    badge: { backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, alignSelf: 'flex-start', marginTop: 4 },
    badgeText: { color: '#FF8C00', fontSize: 10, fontWeight: 'bold' },
    actions: { flexDirection: 'row' },
    actionBtn: { padding: 8 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, height: '85%' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 14, color: '#666', marginBottom: 5, fontWeight: 'bold' },
    input: { backgroundColor: '#F1F3F5', padding: 12, borderRadius: 10, marginBottom: 15, textAlignVertical: 'top' },
    row: { flexDirection: 'row' },
    categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, marginTop: 5 },
    categoryOption: { flex: 1, paddingVertical: 10, backgroundColor: '#F1F3F5', borderRadius: 10, alignItems: 'center', marginHorizontal: 4 },
    categorySelected: { backgroundColor: '#1E1E1E' },
    categoryText: { fontSize: 12, color: '#333', fontWeight: 'bold' },
    categoryTextSelected: { color: 'white' },
    btnSave: { backgroundColor: '#FF8C00', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    btnSaveText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    btnCancel: { alignItems: 'center', marginVertical: 15 }
});