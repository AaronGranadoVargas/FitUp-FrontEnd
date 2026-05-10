import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://TU_IP_LOCAL:8080/api';

const obtenerToken = async () => {
    if (Platform.OS === 'web') return localStorage.getItem('userToken');
    return await SecureStore.getItemAsync('userToken');
};

export const getMisEntrenamientos = async () => {
    const token = await obtenerToken();
    const res = await axios.get(`${API_URL}/entrenamientos/mis-entrenamientos`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export const getEntrenamientoPorFecha = async (fecha) => {
    const token = await obtenerToken();
    const res = await axios.get(`${API_URL}/entrenamientos/fecha/${fecha}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

export const guardarEntrenamiento = async (fecha, notas, ejercicios) => {
    const token = await obtenerToken();
    const res = await axios.post(`${API_URL}/entrenamientos`, { fecha, notas, ejercicios }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};