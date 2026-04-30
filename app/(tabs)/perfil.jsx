import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { getPerfilUsuario, updatePerfilUsuario } from '../../src/api/usuarioService';
import { perfilStyles as styles } from '../../src/styles/perfilStyles';
import { theme } from '../../src/styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function PerfilScreen() {
    const [perfil, setPerfil] = useState(null);
    const [cargando, setCargando] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [formEdit, setFormEdit] = useState({ nombre: '', peso: '', altura: '' });
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const datos = await getPerfilUsuario();
            setPerfil(datos);
            setFormEdit({
                nombre: datos.nombre || '',
                peso: datos.peso ? datos.peso.toString() : '',
                altura: datos.altura ? datos.altura.toString() : ''
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
                altura: formEdit.altura ? parseFloat(formEdit.altura) : null
            };

            const perfilActualizado = await updatePerfilUsuario(request);
            setPerfil(perfilActualizado); // Actualizamos la vista al instante
            setModalVisible(false); // Cerramos la ventana
            Alert.alert("¡Éxito!", "Tus datos han sido actualizados en la base de datos.");
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el perfil.");
        } finally {
            setGuardando(false);
        }
    };

    // Pantalla de carga mientras Java responde
    if (cargando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.naranja} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* SECCIÓN 1: Foto y datos básicos */}
            <View style={styles.header}>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{perfil?.nombre?.charAt(0).toUpperCase() || 'U'}</Text>
                </View>
                <Text style={styles.nameText}>{perfil?.nombre || 'Usuario'}</Text>
                <Text style={styles.emailText}>{perfil?.email || 'Sin email'}</Text>
            </View>

            {/* SECCIÓN 2: Tarjeta de medidas físicas */}
            <View style={styles.statsCard}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Peso</Text>
                    <Text style={styles.statValue}>{perfil?.peso || '--'} <Text style={styles.statUnit}>kg</Text></Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Altura</Text>
                    <Text style={styles.statValue}>{perfil?.altura || '--'} <Text style={styles.statUnit}>cm</Text></Text>
                </View>
            </View>

            {/* BOTÓN: Abre la ventana de edición */}
            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="pencil-outline" size={20} color="white" />
                <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>

            {/* VENTANA EMERGENTE (MODAL) PARA EDITAR */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Datos Físicos</Text>

                        <Text style={styles.inputLabel}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={formEdit.nombre}
                            onChangeText={(text) => setFormEdit({...formEdit, nombre: text})}
                        />

                        <Text style={styles.inputLabel}>Peso (kg)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={formEdit.peso}
                            onChangeText={(text) => setFormEdit({...formEdit, peso: text})}
                        />

                        <Text style={styles.inputLabel}>Altura (cm)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={formEdit.altura}
                            onChangeText={(text) => setFormEdit({...formEdit, altura: text})}
                        />

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.saveButton} onPress={handleGuardarCambios} disabled={guardando}>
                                {guardando ? <ActivityIndicator color="white" /> : <Text style={styles.saveButtonText}>Guardar</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}