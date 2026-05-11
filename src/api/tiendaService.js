import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const obtenerToken = async () => {
    if (Platform.OS === 'web') return localStorage.getItem('userToken');
    return await SecureStore.getItemAsync('userToken');
};

export const getProductos = async () => {
    try {
        const token = await obtenerToken();
        const response = await axios.get(`${API_URL}/productos`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error cargando productos:", error);
        return [];
    }
};