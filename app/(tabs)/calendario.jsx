import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getMisEntrenamientos, getEntrenamientoPorFecha, guardarEntrenamiento } from '../../src/api/entrenamientoService';
import { calendarStyles as styles } from '../../src/styles/calendarStyles';
import { theme } from '../../src/styles/theme';

export default function CalendarioScreen() {
    const [cargando, setCargando] = useState(false);
    const [marcas, setMarcas] = useState({});
    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [notas, setNotas] = useState('');
    const [ejercicios, setEjercicios] = useState([]);

    useFocusEffect(
        useCallback(() => {
            cargarHistorial();
        }, [])
    );

    const cargarHistorial = async () => {
        try {
            const data = await getMisEntrenamientos();
            const newMarcas = {};
            if (Array.isArray(data)) {
                data.forEach(ent => {
                    if (ent && ent.fecha) {
                        newMarcas[ent.fecha] = { marked: true, dotColor: theme.colors.naranja };
                    }
                });
            }
            setMarcas(newMarcas);
        } catch (e) { console.error("Fallo al cargar historial:", e); }
    };

    const handleSelectDay = async (day) => {
        setDiaSeleccionado(day.dateString);
        setNotas('');
        setEjercicios([]);
        setModalVisible(true);
        setCargando(true);
        try {
            const data = await getEntrenamientoPorFecha(day.dateString);
            setNotas(data?.notas || '');

            if (data?.ejercicios && Array.isArray(data.ejercicios)) {
                const ejerciciosFormateados = data.ejercicios.map(ej => ({
                    nombreEjercicio: ej.nombreEjercicio || '',
                    series: ej.series ? ej.series.toString() : '',
                    repeticiones: ej.repeticiones ? ej.repeticiones.toString() : '',
                    pesoKg: ej.pesoKg ? ej.pesoKg.toString() : ''
                }));
                setEjercicios(ejerciciosFormateados);
            }
        } catch (e) {
            console.error(e);
        } finally { setCargando(false); }
    };

    const agregarEjercicio = () => {
        setEjercicios([...ejercicios, { nombreEjercicio: '', series: '', repeticiones: '', pesoKg: '' }]);
    };

    const eliminarEjercicio = (index) => {
        const nuevaLista = [...ejercicios];
        nuevaLista.splice(index, 1);
        setEjercicios(nuevaLista);
    };

    const actualizarEjercicio = (index, campo, valor) => {
        const nuevaLista = [...ejercicios];
        nuevaLista[index][campo] = valor;
        setEjercicios(nuevaLista);
    };

    const onConfirmSave = async () => {
        setCargando(true);
        try {
            const ejerciciosParaJava = ejercicios
                .filter(ej => ej.nombreEjercicio.trim() !== '')
                .map(ej => ({
                    nombreEjercicio: ej.nombreEjercicio,
                    series: parseInt(ej.series) || 0,
                    repeticiones: parseInt(ej.repeticiones) || 0,
                    pesoKg: parseFloat(ej.pesoKg) || 0.0
                }));

            await guardarEntrenamiento(diaSeleccionado, notas, ejerciciosParaJava);
            await cargarHistorial();
            setModalVisible(false);
        } catch (e) {
            console.error("Error al guardar:", e.response?.data || e.message);
            Alert.alert("Error", "No se pudo guardar la rutina.");
        } finally { setCargando(false); }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTitle}>Calendario FitUp</Text>

                <View style={styles.calendarCard}>
                    <Calendar
                        onDayPress={handleSelectDay}
                        markedDates={{
                            ...marcas,
                            [diaSeleccionado]: { ...marcas[diaSeleccionado], selected: true, selectedColor: theme.colors.naranja }
                        }}
                        theme={{
                            todayTextColor: theme.colors.naranja,
                            dotColor: theme.colors.naranja,
                            arrowColor: theme.colors.naranja,
                            monthTextColor: '#333',
                            textMonthFontWeight: '900',
                        }}
                    />
                </View>
                <Text style={{ color: '#888', textAlign: 'center', fontSize: 13 }}>Toca un día para ver o añadir tus notas.</Text>
            </ScrollView>

            <Modal animationType="slide" transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalDateText}>Día {diaSeleccionado}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close-circle" size={32} color="#ddd" />
                            </TouchableOpacity>
                        </View>

                        {cargando ? <ActivityIndicator size="large" color={theme.colors.naranja} /> : (
                            <ScrollView showsVerticalScrollIndicator={false}>

                                <Text style={styles.sectionLabel}>Notas Generales</Text>
                                <TextInput
                                    style={styles.notesInput}
                                    multiline
                                    placeholder="Sensaciones del entrenamiento..."
                                    value={notas}
                                    onChangeText={setNotas}
                                />

                                <Text style={styles.sectionLabel}>Ejercicios Realizados</Text>

                                {/* MAPEO DE LA LISTA DE EJERCICIOS */}
                                {ejercicios.map((ejercicio, index) => (
                                    <View key={index} style={styles.exerciseCard}>
                                        <View style={styles.exerciseHeader}>
                                            <TextInput
                                                style={styles.exerciseNameInput}
                                                placeholder="Ej: Press de Banca"
                                                value={ejercicio.nombreEjercicio}
                                                onChangeText={(text) => actualizarEjercicio(index, 'nombreEjercicio', text)}
                                            />
                                            <TouchableOpacity onPress={() => eliminarEjercicio(index)}>
                                                <Ionicons name="trash-outline" size={24} color="#EF4444" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.exerciseMetrics}>
                                            <View style={styles.metricInputGroup}>
                                                <TextInput
                                                    style={styles.metricInput}
                                                    keyboardType="numeric"
                                                    placeholder="0"
                                                    value={ejercicio.series}
                                                    onChangeText={(text) => actualizarEjercicio(index, 'series', text)}
                                                />
                                                <Text style={styles.metricLabel}>Ser</Text>
                                            </View>
                                            <Text style={{ color: '#CCC', fontWeight: 'bold' }}>X</Text>
                                            <View style={styles.metricInputGroup}>
                                                <TextInput
                                                    style={styles.metricInput}
                                                    keyboardType="numeric"
                                                    placeholder="0"
                                                    value={ejercicio.repeticiones}
                                                    onChangeText={(text) => actualizarEjercicio(index, 'repeticiones', text)}
                                                />
                                                <Text style={styles.metricLabel}>Rep</Text>
                                            </View>
                                            <View style={styles.metricInputGroup}>
                                                <TextInput
                                                    style={styles.metricInput}
                                                    keyboardType="numeric"
                                                    placeholder="0.0"
                                                    value={ejercicio.pesoKg}
                                                    onChangeText={(text) => actualizarEjercicio(index, 'pesoKg', text)}
                                                />
                                                <Text style={styles.metricLabel}>Kg</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}

                                <TouchableOpacity style={styles.btnAddExercise} onPress={agregarEjercicio}>
                                    <Ionicons name="add-circle-outline" size={24} color={theme.colors.naranja} />
                                    <Text style={styles.btnAddExerciseText}>AÑADIR EJERCICIO</Text>
                                </TouchableOpacity>

                                <View style={styles.actionsContainer}>
                                    <TouchableOpacity style={styles.btnPrimary} onPress={onConfirmSave}>
                                        <Ionicons name="save-outline" size={20} color="white" />
                                        <Text style={styles.btnTextWhite}>GUARDAR RUTINA</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnSecondary} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.btnTextRed}>CANCELAR</Text>
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}