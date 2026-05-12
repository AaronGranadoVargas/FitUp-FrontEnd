import { View, Text, ScrollView, Platform, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { homeStyles as styles } from '../../src/styles/homeStyles';
import { theme } from '../../src/styles/theme';
import { getMisEntrenamientos, getEntrenamientoPorFecha } from '../../src/api/entrenamientoService';

export default function HomeScreen() {
    const router = useRouter();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [cargando, setCargando] = useState(true);
    const [userRole, setUserRole] = useState(null);

    const [entrenamientoHoy, setEntrenamientoHoy] = useState(null);
    const [marcasCalendario, setMarcasCalendario] = useState({});

    const obtenerFechaFormateada = () => {
        const d = new Date();
        const anio = d.getFullYear();
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const dia = String(d.getDate()).padStart(2, '0');
        return `${anio}-${mes}-${dia}`;
    };

    const obtenerTextoFecha = () => {
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fecha = new Date();
        return `${fecha.getDate()} ${meses[fecha.getMonth()]}`;
    };

    useFocusEffect(
        useCallback(() => {
            const sincronizarDashboard = async () => {
                try {
                    let nombreGuardado = Platform.OS === 'web'
                        ? localStorage.getItem('userName')
                        : await SecureStore.getItemAsync('userName');

                    // Asumimos que el rol se guarda de la misma forma
                    let roleGuardado = Platform.OS === 'web'
                        ? localStorage.getItem('userRole')
                        : await SecureStore.getItemAsync('userRole');

                    if (nombreGuardado) setNombreUsuario(nombreGuardado);

                    const lista = await getMisEntrenamientos();
                    const marcas = {};
                    lista.forEach(ent => {
                        marcas[ent.fecha] = { marked: true, dotColor: theme.colors.naranja };
                    });
                    setMarcasCalendario(marcas);

                    const hoyString = obtenerFechaFormateada();
                    const datosHoy = await getEntrenamientoPorFecha(hoyString);

                    if (datosHoy && datosHoy.notas && datosHoy.notas.trim() !== "") {
                        setEntrenamientoHoy(datosHoy.notas);
                    } else {
                        setEntrenamientoHoy(null);
                    }

                    setUserRole(roleGuardado);

                } catch (error) {
                    console.error("Error sincronizando Home:", error);
                } finally {
                    setCargando(false);
                }
            };

            sincronizarDashboard();
        }, [])
    );

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

                {userRole === 'ADMIN' && (
                    <TouchableOpacity
                        style={[localStyles.adminButton, { backgroundColor: theme.colors.verdeSalvia }]}
                        onPress={() => router.push('/addProduct')} // Navega a la pantalla de añadir producto
                    >
                        <Ionicons name="add-circle-outline" size={22} color="white" />
                        <Text style={localStyles.adminButtonText}>Añadir Producto</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.header}>
                    <Text style={styles.dateText}>{obtenerTextoFecha()}</Text>
                    <Text style={styles.greeting}>
                        ¡Hola {nombreUsuario ? nombreUsuario.split(' ')[0] : 'de nuevo'}! 👋
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.primaryCard, !entrenamientoHoy && { backgroundColor: '#555' }]}
                    activeOpacity={0.8}
                    onPress={() => router.push('/calendario')}
                >
                    <View style={styles.primaryCardTextContainer}>
                        <Text style={styles.cardTitleWhite}>
                            {entrenamientoHoy ? "Tu plan para hoy" : "Día de descanso"}
                        </Text>
                        <Text style={styles.cardSubtitleWhite} numberOfLines={2}>
                            {entrenamientoHoy ? entrenamientoHoy : "No has programado nada"}
                        </Text>
                        <Text style={styles.cardTitleWhite}>
                            <Ionicons name="calendar-outline" size={14} />
                            {entrenamientoHoy ? " Ver detalles" : " Ir al calendario"}
                        </Text>
                    </View>
                    <View style={styles.playButton}>
                        <Ionicons
                            name={entrenamientoHoy ? "play" : "add"}
                            size={24}
                            color={entrenamientoHoy ? theme.colors.naranja : "#555"}
                            style={{ marginLeft: entrenamientoHoy ? 3 : 0 }}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shopBanner} activeOpacity={0.8} onPress={() => router.push('/(tabs)/tienda')}>
                    <View style={styles.shopBannerTextContainer}>
                        <Text style={styles.shopBannerTitle}>Visita la Tienda</Text>
                        <Text style={styles.shopBannerSubtitle}>Suplementación y ropa deportiva.</Text>
                    </View>
                    <View style={styles.shopIconContainer}>
                        <Ionicons name="cart-outline" size={32} color={theme.colors.naranja} />
                    </View>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Historial del Mes</Text>
                <View style={styles.miniCalendarCard}>
                    <Calendar
                        hideArrows={true}
                        disableMonthChange={true}
                        onDayPress={() => router.push('/calendario')}
                        markedDates={marcasCalendario}
                        theme={{
                            todayTextColor: theme.colors.naranja,
                            dotColor: theme.colors.naranja,
                            selectedDayBackgroundColor: theme.colors.naranja,
                            monthTextColor: '#333',
                            textMonthFontWeight: 'bold',
                        }}
                    />
                </View>

            </View>
        </ScrollView>
    );
}

// Estilos locales para el botón de admin
const localStyles = StyleSheet.create({
    adminButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 12,
        marginTop: 60, // Espacio superior para que no se pegue al borde
        marginBottom: -10, // Compensa el margen del header
    },
    adminButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 16,
    },
});