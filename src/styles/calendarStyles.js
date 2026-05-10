import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const calendarStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.fondoBase, padding: 20 },
    wrapper: { width: '100%', maxWidth: 600, alignSelf: 'center' },
    headerTitle: { fontSize: 28, fontWeight: '900', color: '#333', marginBottom: 20 },

    calendarCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 20
    },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        height: '90%',
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center'
    },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    modalDateText: { fontSize: 22, fontWeight: 'bold', color: theme.colors.naranja },

    sectionLabel: { fontSize: 16, fontWeight: '700', color: '#555', marginBottom: 10, marginTop: 10 },
    notesInput: {
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        padding: 18,
        fontSize: 16,
        color: '#333',
        minHeight: 100,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#E9ECEF'
    },

    exerciseCard: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.naranja
    },
    exerciseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    exerciseNameInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingVertical: 5,
        marginRight: 10
    },
    exerciseMetrics: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    metricInputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%'
    },
    metricInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        padding: 8,
        textAlign: 'center',
        fontSize: 15,
        width: 50
    },
    metricLabel: { marginLeft: 5, color: '#666', fontSize: 14, fontWeight: 'bold' },

    btnAddExercise: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.naranja,
        borderStyle: 'dashed',
        borderRadius: 12,
        marginBottom: 20
    },
    btnAddExerciseText: { color: theme.colors.naranja, fontWeight: 'bold', marginLeft: 8 },

    actionsContainer: { gap: 12, marginTop: 10, marginBottom: 30 },
    btnPrimary: { backgroundColor: theme.colors.naranja, padding: 16, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
    btnSecondary: { backgroundColor: '#FEE2E2', padding: 16, borderRadius: 12, alignItems: 'center' },
    btnTextWhite: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
    btnTextRed: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 }
});