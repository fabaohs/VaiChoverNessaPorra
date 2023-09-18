import { LinearGradient } from 'expo-linear-gradient';
import palette from '../../../styles/palette';
import { StyleSheet } from 'react-native';

const linearGradients = palette.degrade.linear

export default function GlobalBg({ bgSunny, children }) {

    const sunnyBgColors = [linearGradients.whiteGlobalBg.blueBg1, linearGradients.whiteGlobalBg.blueBg2, linearGradients.whiteGlobalBg.blueBg3]

    const rainBgColors = [linearGradients.globalBg.blueBg1, linearGradients.globalBg.blueBg2]

    return (
        <LinearGradient
            style={styles.bg}
            colors={bgSunny ? sunnyBgColors : rainBgColors}
        >
            {children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
    }
})