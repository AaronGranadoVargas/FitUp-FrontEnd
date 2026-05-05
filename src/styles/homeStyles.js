import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fondoBase
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
        paddingBottom: 40
    },
    wrapper: {
        width: '100%',
        maxWidth: 600,
    },

    header: {
        marginTop: 20,
        marginBottom: 25
    },
    dateText: {
        fontSize: 14,
        color: theme.colors.naranja,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 5
    },
    greeting: {
        fontSize: 32,
        fontWeight: '900',
        color: '#333'
    },

    primaryCard: {
        backgroundColor: theme.colors.naranja,
        borderRadius: 20,
        padding: 25,
        marginBottom: 25,
        elevation: 6,
        shadowColor: theme.colors.naranja,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    primaryCardTextContainer: { flex: 1 },
    cardTitleWhite: { color: 'white', fontSize: 16, fontWeight: '600', opacity: 0.9, marginBottom: 5 },
    cardSubtitleWhite: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
    playButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },

    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: 18,
        padding: 20,
        width: '48%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    statTitle: { fontSize: 16, color: '#666', fontWeight: '600', marginLeft: 8 },
    statValue: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    statUnit: { fontSize: 14, color: '#888', fontWeight: 'normal' },

    secondaryCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    weekRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    dayBubble: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
    dayBubbleActive: { backgroundColor: theme.colors.naranja },
    dayText: { color: '#888', fontWeight: 'bold', fontSize: 14 },
    dayTextActive: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});