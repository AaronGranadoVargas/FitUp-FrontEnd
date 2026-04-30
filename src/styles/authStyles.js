import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const authStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fondoBase,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: theme.colors.fondoBase,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    formWrapper: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },

    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 25,
        fontWeight: '900',
        marginBottom: 10,
        textAlign: 'center',
        color: theme.colors.grisOscuro,
        letterSpacing: 0.5
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.grisTexto,
        marginBottom: 35,
        textAlign: 'center'
    },

    // Inputs
    input: {
        backgroundColor: theme.colors.blanco,
        padding: 16,
        borderRadius: theme.borderRadius.boton,
        marginBottom: 15,
        borderWidth: 1.5,
        borderColor: '#E5E5EA',
        fontSize: 16,
        color: '#333'
    },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    halfInput: { width: '48%' },

    // Botones
    button: {
        backgroundColor: theme.colors.naranja,
        paddingVertical: 16,
        borderRadius: theme.borderRadius.boton,
        alignItems: 'center',
        marginTop: 15,
        minHeight: 55,
        justifyContent: 'center',
        elevation: 4,
        shadowColor: theme.colors.naranja,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: 'rgba(255, 130, 0, 0.5)',
        elevation: 0,
        shadowOpacity: 0
    },
    buttonText: { color: theme.colors.blanco, fontWeight: 'bold', fontSize: 18, textTransform: 'uppercase' },

    linkButton: {
        marginTop: 25,
        alignItems: 'center',
        padding: 10
    },
    linkText: { color: theme.colors.verdeSalvia, fontSize: 15, fontWeight: 'bold' },

    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: '600'
    }
});