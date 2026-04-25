import { Text, View, StyleSheet } from 'react-native';

export default function IndexScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                ¡Mi TFG arranca aquí! 🚀
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
    },
});