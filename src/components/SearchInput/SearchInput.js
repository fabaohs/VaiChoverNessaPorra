import { useState } from "react"
import { View, TextInput, Pressable, ActivityIndicator, Text, Alert } from "react-native"
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated'
import MaterialIcons from '@expo/vector-icons/MaterialIcons/'

import api from '../../services/api'
import styles from "./SearchInput.style"
import palette from "../../styles/palette"
import debounce from "../../functions/debounce"
import { FlashList } from "@shopify/flash-list"
import { Gradient } from "../Gradient"

export default function SearchInput({ onClose, getCity }) {

    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState([])

    const handleClose = () => {
        onClose()
        return
    }

    const handleChange = (city) => {
        setCity(city)
        debounce(() => search(city), 1500)()
    }

    const search = async (city) => {
        if (city.length < 2) {
            setCities([])
            return
        }

        setLoading(true)
        const response = await api.searchCity(city)
        setLoading(false)

        if (!response) {
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }

        return setCities(response)
    }

    const getCityWeather = async (lat, lon) => {
        if (!lat || !lon) {
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }

        setLoading(true)
        await getCity(lat, lon)
        setLoading(false)

        return handleClose()
    }

    return (
        <Gradient.Linear.SearchContainerBg>

            <Animated.View entering={SlideInUp} exiting={SlideOutUp} style={styles.container}>

                <View style={styles.inputContainer}>
                    <Pressable onPress={handleClose} style={{ marginRight: 24 }}>
                        <MaterialIcons name="arrow-back" size={24} color={palette.solid.purple} />
                    </Pressable>
                    <TextInput
                        onChangeText={(e) => handleChange(e)}
                        value={city}
                        style={styles.input}
                        placeholder="Pesquise aqui"
                    />

                    {loading ? (
                        <>
                            <ActivityIndicator size='small' color={palette.solid.purple} animating={true} />
                        </>
                    ) : null}

                </View>

                {cities.length > 0 && !loading ? (
                    <View style={styles.cities}>
                        <Text style={{ fontSize: 14, color: palette.solid.mutted, fontWeight: 'bold', marginBottom: 8 }}>Cidades encontradas: {`(${cities.length})`} </Text>
                        <FlashList
                            estimatedItemSize={cities.length}
                            keyExtractor={(item, index) => `${item.id}-${index}`}
                            data={cities}
                            scrollEnabled
                            renderItem={({ item }) => {
                                return (
                                    <Pressable
                                        style={styles.cityButton}
                                        onPress={() => getCityWeather(item.lat, item.lon)}
                                    >
                                        <Text style={styles.cityText}>{item.name} {` - ${item.state}`} - {item.country}</Text>
                                    </Pressable>
                                )
                            }}
                        />

                    </View>
                ) : null}


            </Animated.View>
        </Gradient.Linear.SearchContainerBg>

    )

}