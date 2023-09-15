import { StyleSheet } from "react-native";
import palette from "../../styles/palette";

const textWhite = palette.solid.white

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputHeader: {
        flexDirection: "row",
        gap: 20,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: textWhite,
    },
    main: {
        marginTop: 68,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "900",
        color: textWhite,
        textShadowRadius: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: -3,
            height: 3
        }
    },
    imageWrapper: {
        width: 200,
        height: 200,
        marginHorizontal: '15%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    card: {
        width: 335,
        height: 335,
        maxWidth: 335,
        maxHeight: 335,
        overflow: 'hidden',
        paddingTop: 17,
        paddingBottom: 26,
        paddingHorizontal: 93,

        borderRadius: 20,
        borderColor: textWhite,
        borderStyle: 'solid',
        borderWidth: 1
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: textWhite,
        textShadowRadius: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: {
            width: -3,
            height: 3
        }
    },
    content: {
        marginTop: 16,
        width: '100%',
    },
})

export { styles }