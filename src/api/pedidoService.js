import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://TU_IP_LOCAL:8080/api';

const obtenerToken = async () => {
    if (Platform.OS === 'web') return localStorage.getItem('userToken');
    return await SecureStore.getItemAsync('userToken');
};

export const procesarPago = async () => {
    const token = await obtenerToken();
    const response = await axios.post(`${API_URL}/pedidos/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};