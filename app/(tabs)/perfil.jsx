import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    TextInput,
    Alert,
    Platform,
    ScrollView
} from 'react-native';
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
        nombre: '',
        peso: '',
        altura: '',
        telefono: '',
        ciudad: '',
        correo: ''
    });
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
                altura: datos.altura ? datos.altura.toString() : '',
                telefono: datos.telefono ? datos.telefono.toString() : '',
                ciudad: datos.ciudad ? datos.ciudad.toString() : '',
                correo: datos.correo ? datos.correo.toString() : '',
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
                telefono: formEdit.telefono ? parseFloat(formEdit.telefono) : null,
                ciudad: formEdit.ciudad ? formEdit.ciudad.toString() : null,
                correo: formEdit.correo ? formEdit.ciudad.toString() : null,
            };

            await updatePerfilUsuario(request);

            setPerfil((prevPerfil) => ({
                ...prevPerfil,
                ...request,
                email: request.correo || prevPerfil.email
            }));
            await cargarDatos();

            setModalVisible(false);
            Alert.alert("¡Éxito!", "Tus datos han sido actualizados en la base de datos.");
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el perfil.");
            console.error("Error actualizando perfil:", error);
        } finally {
            setGuardando(false);
        }
    };

    const handleTelefonoChange = (texto) => {
        const soloNumeros = texto.replace(/[^0-9]/g, '');
        setFormEdit({...formEdit, telefono: soloNumeros});
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
            } catch (error) {
                console.error("Error al cerrar sesión", error);
            }
        };

        if (Platform.OS === 'web') {
            const confirmar = window.confirm("¿Estás seguro de que quieres cerrar sesión?");
            if (confirmar) ejecutarSalida();
        } else {
            Alert.alert(
                "Cerrar Sesión",
                "¿Estás seguro de que quieres cerrar sesión?",
                [
                    {text: "Cancelar", style: "cancel"},
                    {text: "Sí, salir", style: "destructive", onPress: ejecutarSalida}
                ]
            );
        }
    };

    if (cargando) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={theme.colors.naranja}/>
            </View>
        );
    }

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
                    <Text style={styles.statValue}>{perfil?.altura || '--'} <Text
                        style={styles.statUnit}>cm</Text></Text>
                </View>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="pencil-outline" size={20} color="white"/>
                <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={20} color="white"/>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>

            {/* Modal de edición */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalOverlay}>
                    <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
                        <Text style={styles.modalTitle}>Editar Perfil</Text>
                        <Text style={styles.modalTitle}>Editar Datos Físicos</Text>

                        <Text style={styles.inputLabel}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={formEdit.nombre}
                            onChangeText={(text) => setFormEdit({...formEdit, nombre: text})}
                        />
                        <Text style={styles.inputLabel}>Teléfono</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            value={formEdit.telefono}
                            onChangeText={handleTelefonoChange}  // Cambiado para usar la función de filtro
                            placeholder="Tu número de teléfono"
                        />

                        <Text style={styles.inputLabel}>Ciudad</Text>
                        <TextInput
                            style={styles.input}
                            value={formEdit.ciudad}
                            onChangeText={(text) => setFormEdit({...formEdit, ciudad: text})}
                            placeholder="Tu ciudad"
                        />

                        <Text style={styles.inputLabel}>Correo electrónico</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formEdit.correo}  // Cambiado de 'ocupacion'
                            onChangeText={(text) => setFormEdit({...formEdit, correo: text})}  // Cambiado
                            placeholder="Tu correo electrónico"
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

                            <TouchableOpacity style={styles.saveButton} onPress={handleGuardarCambios}
                                              disabled={guardando}>
                                {guardando ? <ActivityIndicator color="white"/> :
                                    <Text style={styles.saveButtonText}>Guardar</Text>}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            </Modal>
        </View>
    )
        ;
}