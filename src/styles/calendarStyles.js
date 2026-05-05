import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const calendarStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fondoBase,
        padding: 20
    },

    wrapper: {
        width: '100%',
        maxWidth: 600,
        alignSelf: 'center',
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#333',
        marginBottom: 20,
        marginTop: 10
    },

    calendarCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        elevation: 4,
        shadowColor: theme.colors.naranja,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 20,
        overflow: 'hidden'
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end'
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        height: '80%',
        elevation: 10,
        width: '100%',
        maxWidth: 800,
        alignSelf: 'center'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    modalDateText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.naranja,
        textTransform: 'uppercase'
    },
    closeButton: {
        padding: 5
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginTop: 10
    },
    notesInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        padding: 15,
        fontSize: 16,
        color: '#333',
        minHeight: 120,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },

    exerciseCard: {
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.naranja
    },
    exerciseName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    exerciseDetails: { fontSize: 14, color: '#666', marginTop: 4 },

    saveButton: {
        backgroundColor: theme.colors.naranja,
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: theme.colors.naranja,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase'
    }
});