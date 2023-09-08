import { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { Image } from 'expo-image'
import { global } from "../../styles/global";
import { Gradient } from "../../components/Gradient";
import { styles } from './Home.style'
import { BlurView } from 'expo-blur';
import * as Location from 'expo-location'

import MaterialIcons from '@expo/vector-icons/MaterialIcons/'
import palette from "../../styles/palette";
import Api from "../../services/api";

export default function Home() {

    const getLatLon = async () => {
        const { status, granted } = await Location.requestForegroundPermissionsAsync()
        if (!granted) {
            return Alert.alert('Permissão de localização negada.')
        }

        const { coords } = await Location.getCurrentPositionAsync()
        console.log(coords)

        const { latitude, longitude } = coords
        const response = await Api.getCity(latitude, longitude)
        console.log(response)

        if (!response) {
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }
    }

    useEffect(() => {
        getLatLon()
    }, [])

    const getDate = () => {
        const data = new Date()
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();

        return `${dia} de ${mes}`
    }

    return (

        <View>
            <Gradient.Linear.GlobalBg>
                <View style={global.containerGlobal}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <View style={styles.inputHeader}>
                            <MaterialIcons name="place" size={24} color={palette.solid.white} />
                            <Text style={styles.headerText}>Brasília</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color={palette.solid.white} />
                        </View>
                        <View>
                            <MaterialIcons name="notifications" size={24} color={palette.solid.white} />
                        </View>
                    </View>

                    {/* MAIN CONTENT */}
                    <View style={styles.main}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={require('../../../assets/images/Cloudy.png')}
                                style={styles.image}
                                contentFit="cover"
                            />
                        </View>

                        {/* CARD */}
                        <BlurView intensity={40} style={styles.card} tint="light">
                            <Text style={styles.title}>Vai chover nessa porra?</Text>
                            <Text style={styles.text}>{getDate()}</Text>
                        </BlurView>
                    </View>
                </View>
            </Gradient.Linear.GlobalBg>
        </View>

    )

}