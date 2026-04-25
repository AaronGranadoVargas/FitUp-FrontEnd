import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const homeStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.fondoBase },
    content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
    header: { marginBottom: 25 },
    dateText: { color: theme.colors.grisTexto, fontSize: 14, fontWeight: 'bold', letterSpacing: 1, textTransform: 'uppercase' },
    greeting: { color: theme.colors.grisOscuro, fontSize: 28, fontWeight: 'bold', marginTop: 5 },

    card: {
        backgroundColor: theme.colors.blanco,
        borderRadius: theme.borderRadius.tarjeta,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    primaryCard: { backgroundColor: theme.colors.naranja, minHeight: 180 },
    secondaryCard: { backgroundColor: theme.colors.verdeSalvia, minHeight: 120, justifyContent: 'center' },

    row: { flexDirection: 'row', justifyContent: 'space-between' },
    halfCard: { width: '48%', minHeight: 140, justifyContent: 'center', alignItems: 'center' },

    cardPlaceholder: { backgroundColor: 'rgba(255,255,255,0.3)', height: 60, borderRadius: 10, marginTop: 20 },

    cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.grisOscuro },
    metricText: { fontSize: 24, fontWeight: 'bold', color: theme.colors.naranja, marginTop: 10 },
    cardTitleWhite: { fontSize: 22, fontWeight: 'bold', color: theme.colors.blanco },
    cardSubtitleWhite: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 5 },

    logoutButton: { marginTop: 20, padding: 15, alignItems: 'center' },
    logoutText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16 }
});