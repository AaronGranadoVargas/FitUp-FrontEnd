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

export const crearProducto = async (productoRequest) => {
    try {
        const token = await obtenerToken();
        const response = await axios.post(`${API_URL}/productos`, productoRequest, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error creando producto:", error);
        throw error;
    }
};

export const actualizarProducto = async (id, productoRequest) => {
    try {
        const token = await obtenerToken();
        const response = await axios.put(`${API_URL}/productos/${id}`, productoRequest, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error(`Error actualizando el producto con ID ${id}:`, error);
        throw error;
    }
};

export const eliminarProducto = async (id) => {
    try {
        const token = await obtenerToken();
        await axios.delete(`${API_URL}/productos/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error) {
        console.error(`Error eliminando el producto con ID ${id}:`, error);
        throw error;
    }
};