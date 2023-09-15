import { Platform, StyleSheet } from "react-native";
import palette from "../../styles/palette";

const solidColors = palette.solid

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top: Platform.OS === 'android' ? -55 : 0,
        left: -30,

        backgroundColor: solidColors.whiteSmoke,

        paddingTop: 59,
        paddingHorizontal: 30,
        paddingBottom: 39,
        width: '119%',
        height: 'auto',

        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    inputContainer: {
        backgroundColor: solidColors.silver,

        height: 57,
        borderRadius: 15,
        paddingHorizontal: 16,
        paddingVertical: 15,

        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        color: palette.solid.purple,
        fontSize: 18,
        width: '75%'
    },
    cities: {
        marginTop: 41,
        height: 120
    },
    cityName: {
        color: palette.solid.purple,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8
    },
})

export default styles