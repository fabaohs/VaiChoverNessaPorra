import { LinearGradient } from 'expo-linear-gradient';
import palette from '../../../styles/palette';
import { StyleSheet } from 'react-native';

const linearGradients = palette.degrade.linear

export default function GlobalBg({ children }) {
    return (
        <LinearGradient
            style={styles.bg}
            colors={[linearGradients.globalBg.blueBg1, linearGradients.globalBg.blueBg2]}
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