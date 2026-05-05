import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { getMisEntrenamientos, getEntrenamientoPorFecha, guardarEntrenamiento } from '../../src/api/entrenamientoService';
import { calendarStyles as styles } from '../../src/styles/calendarStyles';
import { theme } from '../../src/styles/theme';

LocaleConfig.locales['es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

export default function CalendarioScreen() {
    const [cargandoPantalla, setCargandoPantalla] = useState(true);
    const [cargandoModal, setCargandoModal] = useState(false);

    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [entrenamientosMarcados, setEntrenamientosMarcados] = useState({});
    const [notasDia, setNotasDia] = useState('');
    const [ejerciciosDia, setEjerciciosDia] = useState([]);

    useEffect(() => {
        cargarPuntosCalendario();
    }, []);

    const cargarPuntosCalendario = async () => {
        try {
            const listaEntrenamientos = await getMisEntrenamientos();

            const marcas = {};
            listaEntrenamientos.forEach(entrenamiento => {
                marcas[entrenamiento.fecha] = { marked: true, dotColor: theme.colors.naranja };
            });

            setEntrenamientosMarcados(marcas);
        } catch (error) {
            console.error("Error cargando calendario:", error);
            Alert.alert("Error", "No pudimos cargar tu historial de entrenamientos.");
        } finally {
            setCargandoPantalla(false);
        }
    };

    const fechasMarcadasFinal = {
        ...entrenamientosMarcados,
        [diaSeleccionado]: {
            ...entrenamientosMarcados[diaSeleccionado],
            selected: true,
            selectedColor: theme.colors.naranja,
            disableTouchEvent: true
        }
    };

    const handleDiaPresionado = async (day) => {
        setDiaSeleccionado(day.dateString);
        setModalVisible(true);
        setCargandoModal(true);

        try {
            const datosEntrenamiento = await getEntrenamientoPorFecha(day.dateString);
            setNotasDia(datosEntrenamiento.notas || "");

            setEjerciciosDia([]);
        } catch (error) {
            Alert.alert("Error", "No se pudo cargar la información de este día.");
        } finally {
            setCargandoModal(false);
        }
    };

    const handleGuardarNotas = async () => {
        try {
            setCargandoModal(true);
            await guardarEntrenamiento(diaSeleccionado, notasDia);

            setModalVisible(false);

            await cargarPuntosCalendario();

        } catch (error) {
            console.error("Error al guardar:", error);
            Alert.alert("Error", "Ocurrió un fallo al intentar guardar las notas.");
        } finally {
            setCargandoModal(false);
        }
    };

    const formatearFecha = (fechaString) => {
        if (!fechaString) return '';
        const partes = fechaString.split('-');
        const mes = LocaleConfig.locales['es'].monthNames[parseInt(partes[1], 10) - 1];
        return `${partes[2]} de ${mes}`;
    };

    if (cargandoPantalla) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.colors.naranja} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.headerTitle}>Tu Progreso</Text>

                <View style={styles.calendarCard}>
                    <Calendar
                        onDayPress={handleDiaPresionado}
                        markedDates={fechasMarcadasFinal}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            selectedDayBackgroundColor: theme.colors.naranja,
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: theme.colors.naranja,
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: theme.colors.naranja,
                            selectedDotColor: '#ffffff',
                            arrowColor: theme.colors.naranja,
                            monthTextColor: theme.colors.naranja,
                            textMonthFontWeight: 'bold',
                        }}
                    />
                </View>
            </View>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
                    <View style={styles.modalContent}>

                        <View style={styles.modalHeader}>
                            <Text style={styles.modalDateText}>{formatearFecha(diaSeleccionado)}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Ionicons name="close-circle" size={30} color="#ccc" />
                            </TouchableOpacity>
                        </View>

                        {cargandoModal ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color={theme.colors.naranja} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.sectionTitle}>Tus Notas</Text>
                                <TextInput
                                    style={styles.notesInput}
                                    placeholder="¿Cómo ha ido el entrenamiento hoy? Apunta tus sensaciones..."
                                    placeholderTextColor="#999"
                                    multiline={true}
                                    numberOfLines={4}
                                    value={notasDia}
                                    onChangeText={setNotasDia}
                                />

                                <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Entrenamiento Registrado</Text>

                                {ejerciciosDia.length > 0 ? (
                                    ejerciciosDia.map((ejercicio) => (
                                        <View key={ejercicio.id} style={styles.exerciseCard}>
                                            <View>
                                                <Text style={styles.exerciseName}>{ejercicio.nombre}</Text>
                                                <Text style={styles.exerciseDetails}>{ejercicio.series} series x {ejercicio.repeticiones} reps</Text>
                                            </View>
                                            <Text style={[styles.exerciseName, { color: theme.colors.naranja }]}>{ejercicio.peso} kg</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={{ color: '#888', fontStyle: 'italic', marginTop: 10 }}>
                                        No hay ejercicios guardados para este día.
                                    </Text>
                                )}

                                <TouchableOpacity style={styles.saveButton} onPress={handleGuardarNotas}>
                                    <Text style={styles.saveButtonText}>Guardar</Text>
                                </TouchableOpacity>
                                <View style={{ height: 40 }} />
                            </ScrollView>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}