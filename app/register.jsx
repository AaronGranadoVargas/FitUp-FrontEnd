import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { registrarUsuario } from '../src/api/authService';
import { authStyles as styles } from '../src/styles/authStyles';

export default function RegisterScreen() {
    const router = useRouter();

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');

    const [mensajeError, setMensajeError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handlePesoChange = (texto) => {
        let limpio = texto.replace(/,/g, '.').replace(/[^0-9.]/g, '');
        if ((limpio.match(/\./g) || []).length > 1) limpio = limpio.substring(0, limpio.length - 1);
        setPeso(limpio);
    };

    const handleAlturaChange = (texto) => setAltura(texto.replace(/[^0-9]/g, ''));

    const handleRegister = async () => {
        Keyboard.dismiss();
        setMensajeError('');

        if (!nombre.trim() || !email.trim() || !password.trim() || !peso || !altura) return setMensajeError("⚠️ Todos los campos son obligatorios.");
        if (password.length < 6) return setMensajeError("⚠️ La contraseña debe tener al menos 6 caracteres.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setMensajeError("⚠️ El formato del correo no es válido.");

        setCargando(true);
        try {
            await registrarUsuario({
                nombre: nombre.trim(),
                email: email.trim().toLowerCase(),
                password,
                pesoActual: parseFloat(peso),
                altura: parseInt(altura, 10)
            });
            router.replace('/(tabs)/home');
        } catch (errores) {
            if (typeof errores === 'object' && errores !== null) {
                setMensajeError(errores.mensaje ? `❌ ${errores.mensaje}` : `❌ ${Object.values(errores).join('\n')}`);
            } else {
                setMensajeError("❌ No se pudo conectar con el servidor.");
            }
        } finally {
            setCargando(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Crear Cuenta</Text>

            <TextInput style={styles.input} placeholder="Tu nombre completo" value={nombre} onChangeText={setNombre} editable={!cargando} />
            <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!cargando} />
            <TextInput style={styles.input} placeholder="Contraseña (mínimo 6 caracteres)" value={password} onChangeText={setPassword} secureTextEntry editable={!cargando} />

            <View style={styles.row}>
                <TextInput style={[styles.input, styles.halfInput]} placeholder="Peso (ej: 75.5)" value={peso} onChangeText={handlePesoChange} keyboardType="numeric" editable={!cargando} />
                <TextInput style={[styles.input, styles.halfInput]} placeholder="Altura en cm (ej: 180)" value={altura} onChangeText={handleAlturaChange} keyboardType="numeric" editable={!cargando} />
            </View>

            {mensajeError ? <Text style={styles.errorText}>{mensajeError}</Text> : null}

            <TouchableOpacity style={[styles.button, cargando && styles.buttonDisabled]} onPress={handleRegister} disabled={cargando}>
                {cargando ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Registrarse</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/login')}>
                <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión aquí</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}