import { View, Text, StyleSheet } from "react-native";
import palette from "../../styles/palette";

export default function Alert({ message, showError }) {

    return (
        <View style={styles.container}>

            <View style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.7,
        position: 'absolute',
    },
    messageContainer: {
        backgroundColor: palette.blue,
        borderRadius: 8
    },
    message: {
        color: palette.textBlack,
        fontSize: 25,
        fontWeight: "800"
    }
})