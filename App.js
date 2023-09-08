import { SafeAreaView } from 'react-native';
import Home from './src/pages/Home/Home';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  return (
    <SafeAreaView >
      <StatusBar style="auto" hidden />
      <Home />
    </SafeAreaView>
  );
}


