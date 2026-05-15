import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert, Platform, ScrollView } from 'react-native';
import {useRouter} from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {getPerfilUsuario, updatePerfilUsuario} from '../../src/api/usuarioService';
import {perfilStyles as styles} from '../../src/styles/perfilStyles';
import {theme} from '../../src/styles/theme';
import {Ionicons} from '@expo/vector-icons';

export default function PerfilScreen() {
    const router = useRouter();

    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [formEdit, setFormEdit] = useState({
        nombre: '', peso: '', altura: '', correo: ''
    });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => { cargarDatos(); }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await getPerfilUsuario();

            console.log("Rol del usuario cargado:", datos.rol);

            setPerfil({
                ...datos,
                peso: datos.pesoActual
            });
            setFormEdit({
                nombre: datos.nombre || '',
                peso: datos.pesoActual ? datos.pesoActual.toString() : '',
                altura: datos.altura ? datos.altura.toString() : '',
                correo: datos.email || '',
            });
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los datos del perfil.");
        } finally {
            setCargando(false);
        }
    };

    const handleGuardarCambios = async () => {
        try {
            setGuardando(true);
            const request = {
                nombre: formEdit.nombre,
                peso: formEdit.peso ? parseFloat(formEdit.peso) : null,
                altura: formEdit.altura ? parseFloat(formEdit.altura) : null,
                correo: formEdit.correo ? formEdit.correo.toString() : null,
            };

            await updatePerfilUsuario(request);
            await cargarDatos();
            setModalVisible(false);
            Alert.alert("¡Éxito!", "Tus datos han sido actualizados.");
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar.");
        } finally {
            setGuardando(false);
        }
    };

    const handleLogout = () => {
        const ejecutarSalida = async () => {
            try {
                if (Platform.OS === 'web') {
                    localStorage.removeItem('userToken');
                    localStorage.removeItem('userName');
                } else {
                    await SecureStore.deleteItemAsync('userToken');
                    await SecureStore.deleteItemAsync('userName');
                }
                router.replace('/');
            } catch (error) {}
        };

        if (Platform.OS === 'web') {
            if (window.confirm("¿Cerrar sesión?")) ejecutarSalida();
        } else {
            Alert.alert("Cerrar Sesión", "¿Seguro que quieres salir?", [
                {text: "Cancelar", style: "cancel"}, {text: "Sí, salir", style: "destructive", onPress: ejecutarSalida}
            ]);
        }
    };

    if (cargando) return <View style={styles.centerContainer}><ActivityIndicator size="large" color={theme.colors.naranja}/></View>;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{perfil?.nombre?.charAt(0).toUpperCase() || 'U'}</Text>
                </View>
                <Text style={styles.nameText}>{perfil?.nombre || 'Usuario'}</Text>
                <Text style={styles.emailText}>{perfil?.email || 'Sin email'}</Text>
            </View>

            <View style={styles.statsCard}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Peso</Text>
                    <Text style={styles.statValue}>{perfil?.peso || '--'} <Text style={styles.statUnit}>kg</Text></Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Altura</Text>
                    <Text style={styles.statValue}>{perfil?.altura || '--'} <Text style={styles.statUnit}>cm</Text></Text>
                </View>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="pencil-outline" size={20} color="white"/>
                <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>

            {(perfil?.rol === 'ADMIN' || perfil?.rol === 'ROLE_ADMIN') && (
                <TouchableOpacity
                    style={[styles.editButton, { backgroundColor: '#1E1E1E', marginTop: 15 }]}
                    onPress={() => router.push('/admin')}
                >
                    <Ionicons name="settings-outline" size={20} color="white"/>
                    <Text style={styles.editButtonText}>Panel de Administración</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={[styles.logoutButton, { marginTop: 15 }]} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="white"/>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalOverlay}>
                    <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
                        <Text style={styles.modalTitle}>Editar Perfil</Text>

                        <Text style={styles.inputLabel}>Nombre</Text>
                        <TextInput style={styles.input} value={formEdit.nombre} onChangeText={t => setFormEdit({...formEdit, nombre: t})} />

                        <Text style={styles.inputLabel}>Correo electrónico</Text>
                        <TextInput style={styles.input} keyboardType="email-address" autoCapitalize="none" value={formEdit.correo} onChangeText={t => setFormEdit({...formEdit, correo: t})} />

                        <Text style={styles.inputLabel}>Peso (kg)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" value={formEdit.peso} onChangeText={t => setFormEdit({...formEdit, peso: t})} />

                        <Text style={styles.inputLabel}>Altura (cm)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" value={formEdit.altura} onChangeText={t => setFormEdit({...formEdit, altura: t})} />

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}><Text style={styles.cancelButtonText}>Cancelar</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleGuardarCambios} disabled={guardando}>
                                {guardando ? <ActivityIndicator color="white"/> : <Text style={styles.saveButtonText}>Guardar</Text>}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}