import { useState } from "react"
import { View, TextInput, Pressable } from "react-native"
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated'
import MaterialIcons from '@expo/vector-icons/MaterialIcons/'

import api from '../../services/api'
import styles from "./SearchInput.style"
import palette from "../../styles/palette"
import debounce from "../../functions/debounce"

export default function SearchInput({ onClose }) {

    const [city, setCity] = useState('')

    const handleClose = (e) => {
        e.preventDefault()
        onClose()
        return
    }

    const handleChange = (city) => {
        setCity(city)
        const debouncedSearch = debounce(search, 1500)()
    }

    const search = async () => {
        console.log(`Searching for ${city}`)
        const response = await api.getCity(city)

        console.log('City information', response)

        return
    }

    return (

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
            </View>

        </Animated.View>

    )

}