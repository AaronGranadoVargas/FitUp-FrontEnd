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

    shopBanner: {
        backgroundColor: '#1E1E1E',
        borderRadius: 20,
        padding: 20,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderLeftWidth: 5,
        borderLeftColor: theme.colors.naranja
    },
    shopBannerTextContainer: {
        flex: 1,
        marginRight: 15
    },
    shopBannerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5
    },
    shopBannerSubtitle: {
        color: '#AAA',
        fontSize: 14
    },
    shopIconContainer: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 12,
        borderRadius: 15
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginTop: 5,
        marginLeft: 5
    },
    miniCalendarCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 20,
        overflow: 'hidden'
    }
});