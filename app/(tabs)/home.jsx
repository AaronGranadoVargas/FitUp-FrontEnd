import { View, Text, ScrollView, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { homeStyles as styles } from '../../src/styles/homeStyles';
import { theme } from '../../src/styles/theme';

export default function HomeScreen() {
    const router = useRouter();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [cargando, setCargando] = useState(true);

    const [estadisticas, setEstadisticas] = useState({
        calorias: 0,
        pasos: 0,
        entrenamientoHoy: 'Pierna y Glúteo',
        diasEntrenados: [false, true, false, true, false, false, false]
    });

    const obtenerFechaActual = () => {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fecha = new Date();
        return `${fecha.getDate()} ${meses[fecha.getMonth()]}`;
    };

    useEffect(() => {
        const inicializarPantalla = async () => {
            try {
                let nombreGuardado = Platform.OS === 'web'
                    ? localStorage.getItem('userName')
                    : await SecureStore.getItemAsync('userName');

                if (nombreGuardado) setNombreUsuario(nombreGuardado);

                await cargarDatosDashboard();

            } catch (error) {
                console.error("Error cargando el Home:", error);
            } finally {
                setCargando(false);
            }
        };

        inicializarPantalla();
    }, []);

    const cargarDatosDashboard = async () => {
        return new Promise(resolve => {
            setTimeout(() => {
                setEstadisticas({
                    calorias: 450,
                    pasos: 8432,
                    entrenamientoHoy: 'Pierna y Glúteo',
                    diasEntrenados: [true, true, false, true, false, false, false]
                });
                resolve();
            }, 800);
        });
    };

    if (cargando) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.colors.naranja} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            <View style={styles.wrapper}>

                <View style={styles.header}>
                    <Text style={styles.dateText}>{obtenerFechaActual()}</Text>
                    <Text style={styles.greeting}>
                        ¡Hola {nombreUsuario ? nombreUsuario.split(' ')[0] : 'de nuevo'}! 👋
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.primaryCard}
                    activeOpacity={0.8}
                    onPress={() => alert("Aquí abriremos la rutina")}
                >
                    <View style={styles.primaryCardTextContainer}>
                        <Text style={styles.cardTitleWhite}>Tu entrenamiento de hoy</Text>
                        <Text style={styles.cardSubtitleWhite}>{estadisticas.entrenamientoHoy}</Text>
                        <Text style={styles.cardTitleWhite}><Ionicons name="time-outline" size={14} /> 45 min</Text>
                    </View>
                    <View style={styles.playButton}>
                        <Ionicons name="play" size={24} color={theme.colors.naranja} style={{ marginLeft: 3 }} />
                    </View>
                </TouchableOpacity>

                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Ionicons name="flame" size={20} color="#FF9500" />
                            <Text style={styles.statTitle}>Calorías</Text>
                        </View>
                        <Text style={styles.statValue}>{estadisticas.calorias} <Text style={styles.statUnit}>kcal</Text></Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <Ionicons name="footsteps" size={20} color="#34C759" />
                            <Text style={styles.statTitle}>Pasos</Text>
                        </View>
                        <Text style={styles.statValue}>{estadisticas.pasos}</Text>
                    </View>
                </View>

                <View style={styles.secondaryCard}>
                    <Text style={styles.sectionTitle}>Progreso Semanal</Text>
                    <View style={styles.weekRow}>
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((dia, index) => {
                            const entrenado = estadisticas.diasEntrenados[index];
                            return (
                                <View key={index} style={[styles.dayBubble, entrenado && styles.dayBubbleActive]}>
                                    <Text style={entrenado ? styles.dayTextActive : styles.dayText}>{dia}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}