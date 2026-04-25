import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginUsuario } from '../../api/authService';


export default function IndexScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Atención", "Rellena todos los campos");
            return;
        }

        try {
            const data = await loginUsuario(email, password);
            router.replace('/home');
            Alert.alert("¡Conectado!", "El backend ha respondido correctamente");
            console.log("Respuesta de Java:", data);
        } catch (error) {
            Alert.alert("Error de conexión", "Revisa que Spring Boot esté encendido y la IP sea correcta.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FitUp Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo electrónico (ej: juan@test.com)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f4f8' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center', color: '#333' },
    input: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
    button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});