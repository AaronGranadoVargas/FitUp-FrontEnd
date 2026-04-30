import {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {loginUsuario} from '../src/api/authService';
import {authStyles as styles} from '../src/styles/authStyles';

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async () => {
        Keyboard.dismiss();
        setMensajeError('');

        if (!email.trim() || !password.trim()) {
            return setMensajeError("⚠️ Debes rellenar tu correo y contraseña.");
        }

        setCargando(true);
        try {
            await loginUsuario(email.trim().toLowerCase(), password);
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
        <View style={styles.container}>
            <View style={styles.formWrapper}>
                <Image
                    source={require('../assets/images/fitup-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Iniciar sesión</Text>

                <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail}
                           keyboardType="email-address" autoCapitalize="none" editable={!cargando}/>
                <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword}
                           secureTextEntry editable={!cargando}/>

                {mensajeError ? <Text style={styles.errorText}>{mensajeError}</Text> : null}

                <TouchableOpacity style={[styles.button, cargando && styles.buttonDisabled]} onPress={handleLogin}
                                  disabled={cargando}>
                    {cargando ? <ActivityIndicator color="white"/> : <Text style={styles.buttonText}>Entrar</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/register')}
                                  disabled={cargando}>
                    <Text style={styles.linkText}>¿No tienes cuenta? Regístrate gratis</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}