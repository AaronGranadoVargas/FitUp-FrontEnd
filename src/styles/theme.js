const commonStyles = {
    borderRadius: {
        tarjeta: 20,
        boton: 15,
    }
};

export const lightTheme = {
    ...commonStyles,
    colors: {
        naranja: '#FF8200',
        verdeSalvia: '#8FA38B',
        grisOscuro: '#333333',
        grisTexto: '#888888',
        fondoBase: '#F5F7F8',
        fondoClaro: '#FFFFFF',
        blanco: '#FFFFFF',
        texto: '#333333',
        borde: '#E1E1E1',
    }
};

export const darkTheme = {
    ...commonStyles,
    colors: {
        naranja: '#FF8200',
        verdeSalvia: '#8FA38B',
        grisOscuro: '#1A1A1A',
        grisTexto: '#AAAAAA',
        fondoBase: '#121212',
        fondoClaro: '#1E1E1E',
        blanco: '#FFFFFF',
        texto: '#F5F7F8',
        borde: '#333333',
    }
};

export const theme = lightTheme;
