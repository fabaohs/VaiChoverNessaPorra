import { useEffect, useRef, useState } from "react";
import { Alert, TextInput, Text, View, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from 'expo-image'
import { global } from "../../styles/global";
import { Gradient } from "../../components/Gradient";
import { styles } from './Home.style'
import { BlurView } from 'expo-blur';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location'

import MaterialIcons from '@expo/vector-icons/MaterialIcons/'
import palette from "../../styles/palette";
import Api from "../../services/api";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import SearchInput from "../../components/SearchInput/SearchInput";

import sunny from '../../../assets/animations/sunny.json'
import rain from '../../../assets/animations/rain.json'
import cloudy from '../../../assets/animations/cloudy.json'

export default function Home() {

    const [currentCity, setCurrentCity] = useState('')
    const [forecast, setForecast] = useState({})
    const [willRainPhrase, setWillRainPhrase] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [animationPath, setAnimationPath] = useState('')
    const [isBgSunny, setIsBgSunny] = useState(false)
    const animation = useRef(null);

    const getPermission = async () => {
        const { granted } = await Location.requestForegroundPermissionsAsync()
        if (!granted) {
            return Alert.alert('Ops...', 'Você precisa permitir o acesso a localização para usar o app.')
        }

        const { coords } = await Location.getCurrentPositionAsync()

        const { latitude, longitude } = coords

        return getCity(latitude, longitude)
    }

    const getCity = async (lat, lon) => {
        const response = await Api.getCity(lat, lon)

        if (!response) {
            console.log('Failed to get current city')
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }

        const { timelines } = response
        const cityData = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon })
        const city = cityData[0].city === null ? cityData[0].subregion : cityData[0].city

        setCurrentCity(city)
        setForecast(timelines)

        return getPhrase(timelines.daily[0].values.precipitationProbabilityAvg)
    }

    const getPhrase = (rainProbability) => {
        if (rainProbability >= 80) {
            setAnimationPath(rain)
            setIsBgSunny(false)
            return setWillRainPhrase('Vai chover nessa porra')
        }

        if (rainProbability >= 60) {
            setAnimationPath(cloudy)
            setIsBgSunny(false)
            return setWillRainPhrase('Provavelmente vai chover nessa porra')
        }

        if (rainProbability >= 40) {
            setAnimationPath(cloudy)
            setIsBgSunny(true)
            return setWillRainPhrase('Talvez chova nessa porra')
        }

        if (rainProbability < 20 && rainProbability >= 10) {
            setAnimationPath(sunny)
            setIsBgSunny(true)
            return setWillRainPhrase('Pouco provável que chova nessa porra')
        }

        setIsBgSunny(true)
        setAnimationPath(sunny)
        return setWillRainPhrase('Não vai chover nessa porra')
    }

    useEffect(() => {
        getPermission()
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

    const handleShowSearch = () => {
        setShowSearch(!showSearch)
    }

    return (
        <>
            <View>
                <Gradient.Linear.GlobalBg bgSunny={isBgSunny}>
                    <View style={global.containerGlobal}>

                        {/* HEADER */}
                        <View style={StyleSheet.compose(styles.header, { marginBottom: showSearch ? 28 : 0 })}>
                            {showSearch
                                ? (
                                    <>
                                        <SearchInput onClose={handleShowSearch} getCity={getCity} />
                                    </>
                                ) : (
                                    <>
                                        <View>
                                            <TouchableOpacity
                                                style={styles.inputHeader}
                                                onPress={handleShowSearch}
                                            >
                                                <MaterialIcons name="place" size={24} color={palette.solid.white} />
                                                <Text style={styles.headerText}>
                                                    {currentCity}
                                                </Text>
                                                <MaterialIcons name="keyboard-arrow-down" size={24} color={palette.solid.white} />
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <MaterialIcons name="notifications" size={24} color={palette.solid.white} />
                                        </View>
                                    </>
                                )

                            }


                        </View>

                        {/* MAIN CONTENT */}
                        <View style={styles.main}>
                            <View style={styles.imageWrapper}>
                                {animationPath !== '' && !showSearch
                                    ? (
                                        <View style={styles.image}>
                                            <LottieView
                                                autoPlay
                                                ref={animation}
                                                source={animationPath}
                                            />
                                        </View>

                                    ) : null
                                }
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
                                    {Object.keys(forecast).length > 0
                                        ? (
                                            <>
                                                <Text style={{ textAlign: 'center', fontSize: 70, color: '#ffffff' }}>
                                                    {Number(forecast.daily[0].values.temperatureApparentAvg).toFixed(1)}°
                                                </Text>

                                                <Text style={{ marginTop: 12, textAlign: 'center', color: palette.solid.white, fontSize: 24 }}>
                                                    {willRainPhrase}
                                                </Text>
                                            </>
                                        )
                                        : null
                                    }
                                </View>
                            </BlurView>
                        </View>
                    </View >
                </Gradient.Linear.GlobalBg >
            </View>
        </>
    )
}