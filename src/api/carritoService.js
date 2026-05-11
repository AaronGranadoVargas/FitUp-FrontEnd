import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://TU_IP_LOCAL:8080/api';

const obtenerToken = async () => {
    if (Platform.OS === 'web') return localStorage.getItem('userToken');
    return await SecureStore.getItemAsync('userToken');
};

export const getMiCarrito = async () => {
    const token = await obtenerToken();
    const response = await axios.get(`${API_URL}/carrito`, {
        headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
    });
    return response.data;
};

export const agregarProductoCarrito = async (productoId, cantidad = 1) => {
    const token = await obtenerToken();
    const response = await axios.post(`${API_URL}/carrito`,
        { productoId, cantidad },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const eliminarProductoCarrito = async (carritoItemId) => {
    const token = await obtenerToken();
    await axios.delete(`${API_URL}/carrito/${carritoItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const vaciarCarrito = async () => {
    const token = await obtenerToken();
    await axios.delete(`${API_URL}/carrito/vaciar`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};