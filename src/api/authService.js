import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const guardarSesion = async (token, nombre) => {
    try {
        if (Platform.OS === 'web') {
            localStorage.setItem('userToken', token);
            if (nombre) localStorage.setItem('userName', nombre);
        } else {
            await SecureStore.setItemAsync('userToken', token);
            if (nombre) await SecureStore.setItemAsync('userName', nombre);
        }
    } catch (error) {
        console.error("Error al guardar la sesión:", error);
    }
};

export const loginUsuario = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (response.data?.token) {
            await guardarSesion(response.data.token, response.data.usuario?.nombre);
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
    }
};

export const registrarUsuario = async (datosUsuario) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, datosUsuario);
        if (response.data?.token) {
            await guardarSesion(response.data.token, response.data.usuario?.nombre);
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
    }
};