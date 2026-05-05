import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import DexieExemplo from './components/DexieExemplo';
import RegistroScreen from './components/RegistroScreen';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Registro" component={RegistroScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


