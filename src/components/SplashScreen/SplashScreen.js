import * as Splash from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { useState, useEffect, useCallback } from 'react'

export default function SplashScreen({ showSplashScreen }) {

    const [appIsReady, setAppIsReady] = useState(showSplashScreen);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await Splash.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onLayout={onLayoutRootView}>
            <Text>SplashScreen Demo! 👋</Text>
        </View>
    );

}