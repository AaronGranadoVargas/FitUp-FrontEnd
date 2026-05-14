import { StyleSheet } from 'react-native';

export const getCarritoStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.fondoBase,
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.fondoBase,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 20,
        color: theme.colors.texto,
    },
    cartItem: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: theme.colors.blanco,
        borderRadius: 15,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flex: 1,
        gap: 4,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.colors.texto,
    },
    price: {
        color: theme.colors.grisTexto,
        fontSize: 12,
    },
    right: {
        alignItems: 'flex-end',
        gap: 8,
    },
    subtotal: {
        fontWeight: '900',
        fontSize: 16,
        color: theme.colors.texto,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    controlButton: {
        backgroundColor: theme.colors.naranja,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.texto,
    },
    footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: theme.colors.borde,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 18,
        color: theme.colors.grisTexto,
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: theme.colors.texto,
    },
    btnPay: {
        backgroundColor: theme.colors.naranja,
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },
    emptyText: {
        textAlign: 'center',
        color: theme.colors.grisTexto,
        fontSize: 16,
    }
});