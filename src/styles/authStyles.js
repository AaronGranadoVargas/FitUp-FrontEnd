import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const authStyles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: theme.colors.fondoBase },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: theme.colors.fondoBase },

    title: { fontSize: 40, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: theme.colors.grisOscuro },
    subtitle: { fontSize: 16, color: theme.colors.grisTexto, marginBottom: 40, textAlign: 'center' },

    input: { backgroundColor: theme.colors.blanco, padding: 15, borderRadius: theme.borderRadius.boton, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    halfInput: { width: '48%' },

    button: { backgroundColor: theme.colors.naranja, padding: 15, borderRadius: theme.borderRadius.boton, alignItems: 'center', marginTop: 10, minHeight: 55, justifyContent: 'center' },
    buttonDisabled: { backgroundColor: 'rgba(255, 130, 0, 0.5)' }, // Naranja transparente si está cargando
    buttonText: { color: theme.colors.blanco, fontWeight: 'bold', fontSize: 18 },

    linkButton: { marginTop: 20, alignItems: 'center' },
    linkText: { color: theme.colors.verdeSalvia, fontSize: 16, fontWeight: 'bold' },

    errorText: { color: '#FF3B30', fontSize: 14, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' }
});