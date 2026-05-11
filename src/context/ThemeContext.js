import React, { createContext, useState, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme(); // Detecta el tema del sistema ('dark' o 'light')
    const [themeName, setThemeName] = useState(systemScheme || 'light');

    const toggleTheme = () => {
        setThemeName(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Usamos useMemo para evitar recalcular el tema en cada render
    const theme = useMemo(() => (themeName === 'light' ? lightTheme : darkTheme), [themeName]);

    return (
        <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personalizado para consumir el contexto fácilmente
export const useTheme = () => useContext(ThemeContext);