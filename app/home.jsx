import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            if (Platform.OS === 'web') {
                localStorage.removeItem('userToken');
            } else {
                await SecureStore.deleteItemAsync('userToken');
            }

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