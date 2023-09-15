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

export default function SearchInput({ onClose }) {

    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState([])

    const handleClose = (e) => {
        e.preventDefault()
        onClose()
        return
    }

    const handleChange = (city) => {
        setCity((prev) => {
            return city
        })
        debounce(search, 2000)()
    }

    const search = async () => {
        setLoading(true)
        const response = await api.searchCity(city)
        setLoading(false)

        if (!response) {
            return Alert.alert('Ops...', 'Parece que ocorreu um erro! Tente novamente.')
        }

        return setCities(response)
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

                {cities.length > 0 ? (
                    <View style={styles.cities}>
                        <FlashList
                            data={cities}
                            renderItem={({ item }) => {
                                console.log(item)
                                return (
                                    <Text style={styles.cityName}>{item.name} - {item.country}</Text>
                                )
                            }}
                        />

                    </View>
                ) : null}


            </Animated.View>
        </Gradient.Linear.SearchContainerBg>

    )

}