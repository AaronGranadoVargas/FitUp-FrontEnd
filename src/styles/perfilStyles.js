import {StyleSheet} from 'react-native';
import {theme} from './theme';

export const perfilStyles = StyleSheet.create({
    centerContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5'},
    container: {flex: 1, backgroundColor: '#F5F5F5', padding: 20},
    header: {alignItems: 'center', marginTop: 40, marginBottom: 30},
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.naranja,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        elevation: 5
    },
    avatarText: {fontSize: 40, color: 'white', fontWeight: 'bold'},
    nameText: {fontSize: 24, fontWeight: 'bold', color: '#333'},
    emailText: {fontSize: 14, color: '#666', marginTop: 5},

    statsCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        elevation: 2,
        marginBottom: 30
    },
    statBox: {flex: 1, alignItems: 'center'},
    statLabel: {fontSize: 14, color: '#888', textTransform: 'uppercase', marginBottom: 5},
    statValue: {fontSize: 28, fontWeight: 'bold', color: '#333'},
    statUnit: {fontSize: 16, color: '#666', fontWeight: 'normal'},
    divider: {width: 1, backgroundColor: '#E0E0E0', marginHorizontal: 15},

    // --- BOTÓN DE EDITAR MEJORADO ---
    editButton: {
        flexDirection: 'row',
        backgroundColor: theme.colors.naranja,
        paddingVertical: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // Lo centra en la pantalla
        width: '100%',       // Ocupa todo el espacio disponible...
        maxWidth: 350,       // ...pero nunca más de 350 píxeles (perfecto para PC)
    },
    editButtonText: {color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 10},

    // --- BOTÓN DE CERRAR SESIÓN MEJORADO ---
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // Lo centra en la pantalla
        width: '100%',       // Ocupa todo el espacio disponible...
        maxWidth: 350,       // ...pero nunca más de 350 píxeles (perfecto para PC)
        marginTop: 20,
        elevation: 3
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10
    },

    modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end'},
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        elevation: 10
    },
    modalTitle: {fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center'},
    inputLabel: {fontSize: 14, color: '#666', marginBottom: 5, marginLeft: 5},
    input: {backgroundColor: '#F5F5F5', borderRadius: 10, padding: 15, marginBottom: 15, fontSize: 16},
    modalActions: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 10},
    cancelButton: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        marginRight: 10,
        alignItems: 'center'
    },
    cancelButtonText: {color: '#555', fontWeight: 'bold', fontSize: 16},
    saveButton: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        backgroundColor: theme.colors.naranja,
        marginLeft: 10,
        alignItems: 'center'
    },
    saveButtonText: {color: 'white', fontWeight: 'bold', fontSize: 16}
});