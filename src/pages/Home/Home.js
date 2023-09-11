import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
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

    const [currentCity, setCurrentCity] = useState('')
    const [forecast, setForecast] = useState([])

    const getCurrentCity = async () => {
        const { status, granted } = await Location.requestForegroundPermissionsAsync()
        if (!granted) {
            return Alert.alert('Opss', 'Você precisa permitir o acesso a localização para usar o app.')
        }

        const { coords } = await Location.getCurrentPositionAsync()

        const { latitude, longitude } = coords
        const response = await Api.getCity(latitude, longitude)

        if (!response) {
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }

        const { Key, LocalizedName } = response
        setCurrentCity(LocalizedName)

        return getCurrentWeather(Key)
    }

    const getCurrentWeather = async (city) => {
        if (!city) {
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }

        const response = await Api.getWeather(city)

        if (!response) {
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }

        console.log('Weather response', response)
        setForecast(response.DailyForecasts[0])
        return
    }

    useEffect(() => {
        getCurrentCity()
    }, [])

    const getDate = () => {
        const data = new Date()
        const meses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const dia = data.getDate();
        const mes = meses[data.getMonth()];

        return `${dia} de ${mes}`
    }

    return (

        <View>
            <Gradient.Linear.GlobalBg>
                <ScrollView style={{ height: 300, width: 300 }}>
                    <Text>{JSON.stringify(forecast, null, 2)}</Text>
                </ScrollView>

                <View style={global.containerGlobal}>

                    {/* HEADER */}
                    <View style={styles.header}>
                        <View style={styles.inputHeader}>
                            <MaterialIcons name="place" size={24} color={palette.solid.white} />
                            <Text style={styles.headerText}>{currentCity}</Text>
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
                            {/* CARD HEADER */}
                            <View>
                                <Text style={styles.title}>Vai chover nessa porra?</Text>
                                <Text style={styles.text}>{getDate()}</Text>
                            </View>

                            {/* CARD CONTENT */}
                            <View style={styles.content}>
                                <Text style={{ textAlign: 'center', fontSize: 100, color: '#ffffff' }}>
                                    {
                                        forecast
                                            ? forecast.Temperature.Maximum.Value
                                            : ''
                                    }
                                </Text>
                            </View>
                        </BlurView>
                    </View>
                </View>
            </Gradient.Linear.GlobalBg>
        </View>

    )

}