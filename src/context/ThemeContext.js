import React, { createContext, useState, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [themeName, setThemeName] = useState(systemScheme || 'light');

    const toggleTheme = () => {
        setThemeName(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(() => (themeName === 'light' ? lightTheme : darkTheme), [themeName]);

    return (
        <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);