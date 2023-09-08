import { StyleSheet } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import palette from "./palette"

const linearGradients = palette.degrade.linear
const radialGradients = palette.degrade.radial

const global = StyleSheet.create({
    containerGlobal: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 30,
        paddingTop: 52,
        paddingBottom: 30,
    }
})

const Gradient = {
    Linear: {
        GlobalBg: <LinearGradient
            colors={[linearGradients.globalBg.blueBg1, linearGradients.globalBg.blueBg2]}
        />
    }
}

export { global, Gradient }