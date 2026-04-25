import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
// Función inteligente para guardar según el dispositivo
const guardarToken = async (token) => {
    try {
        if (Platform.OS === 'web') {
            // Si estamos en el navegador web del PC
            localStorage.setItem('userToken', token);
            console.log("¡Token guardado en el navegador web!");
        } else {
            // Si estamos en tu móvil (ej: Samsung S23 Ultra)
            await SecureStore.setItemAsync('userToken', token);
            console.log("¡Token guardado en la caja fuerte del móvil!");
        }
    } catch (error) {
        console.error("Error al guardar el token:", error);
    }
};

export const loginUsuario = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password
        });

        if (response.data && response.data.token) {
            await guardarToken(response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error("Error al conectar con el backend:", error);
        throw error;
    }
};