import { View, Text, ScrollView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { homeStyles as styles } from '../../src/styles/homeStyles';

export default function HomeScreen() {
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        const cargarNombre = async () => {
            let nombreGuardado = null;
            if (Platform.OS === 'web') {
                nombreGuardado = localStorage.getItem('userName');
            } else {
                nombreGuardado = await SecureStore.getItemAsync('userName');
            }

            if (nombreGuardado) {
                setNombreUsuario(nombreGuardado);
            }
        };
        cargarNombre();
    }, []);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

            <View style={styles.header}>
                <Text style={styles.dateText}>ABRIL 18</Text>
                <Text style={styles.greeting}>
                    ¡Hola {nombreUsuario ? nombreUsuario.split(' ')[0] : 'de nuevo'}! 👋
                </Text>
            </View>

            <View style={[styles.card, styles.primaryCard]}>
                <Text style={styles.cardTitleWhite}>Tu entrenamiento de hoy</Text>
                <Text style={styles.cardSubtitleWhite}>Pierna y Glúteo</Text>
                <View style={styles.cardPlaceholder} />
            </View>

            <View style={styles.row}>
                <View style={[styles.card, styles.halfCard]}>
                    <Text style={styles.cardTitle}>Calorías</Text>
                    <Text style={styles.metricText}>--</Text>
                </View>
                <View style={[styles.card, styles.halfCard]}>
                    <Text style={styles.cardTitle}>Pasos</Text>
                    <Text style={styles.metricText}>--</Text>
                </View>
            </View>

            <View style={[styles.card, styles.secondaryCard]}>
                <Text style={styles.cardTitleWhite}>Progreso Semanal</Text>
            </View>

        </ScrollView>
    );
}