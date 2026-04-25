import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
    const router = useRouter();

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            // 1. Borramos la llave de la caja fuerte (Web o Móvil)
            if (Platform.OS === 'web') {
                localStorage.removeItem('userToken');
            } else {
                await SecureStore.deleteItemAsync('userToken');
            }

            // 2. Lo devolvemos a la pantalla de Login (index)
            router.replace('/');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido a FitUp! 🏋️‍♂️</Text>
            <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
    logoutButton: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 10, width: '80%', alignItems: 'center' },
    logoutText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});