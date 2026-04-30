import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const obtenerToken = async () => {
    if (Platform.OS === 'web') return localStorage.getItem('userToken');
    return await SecureStore.getItemAsync('userToken');
};

export const getPerfilUsuario = async () => {
    const token = await obtenerToken();
    const response = await axios.get(`${API_URL}/usuarios/perfil`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const updatePerfilUsuario = async (datosActualizados) => {
    const token = await obtenerToken();
    const response = await axios.put(`${API_URL}/usuarios/perfil`, datosActualizados, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};