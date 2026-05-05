import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const obtenerToken = async () => {
    if (Platform.OS === 'web') return localStorage.getItem('userToken');
    return await SecureStore.getItemAsync('userToken');
};

export const getMisEntrenamientos = async () => {
    const token = await obtenerToken();
    const response = await axios.get(`${API_URL}/entrenamientos/mis-entrenamientos`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const getEntrenamientoPorFecha = async (fechaString) => {
    const token = await obtenerToken();
    const response = await axios.get(`${API_URL}/entrenamientos/fecha/${fechaString}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const guardarEntrenamiento = async (fechaString, notas) => {
    const token = await obtenerToken();
    const payload = {
        fecha: fechaString,
        notas: notas
    };
    const response = await axios.post(`${API_URL}/entrenamientos`, payload, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};