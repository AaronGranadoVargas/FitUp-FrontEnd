import { StyleSheet } from 'react-native';

export const getTiendaStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fondoBase,
        padding: 15,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.fondoBase,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.texto,
        marginBottom: 20,
        marginTop: 10,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    card: {
        backgroundColor: theme.colors.blanco,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        backgroundColor: theme.colors.fondoBase,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borde,
    },
    cardContent: {
        padding: 12,
    },
    categoriaTag: {
        fontSize: 10,
        color: theme.colors.naranja,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.texto,
        marginBottom: 8,
        minHeight: 38,
    },
    price: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.texto,
        marginBottom: 12,
    },
    btnAdd: {
        backgroundColor: theme.colors.naranja,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
    },
    btnAddText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});