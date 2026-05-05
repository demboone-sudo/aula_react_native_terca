import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../database/firebase';
import { signOut } from 'firebase/auth';

function HomeScreen({navigation}){

    const sair = () => {
        signOut(auth).then(() => navigation.navigate('Login'))
    }

    return (
        <View style={{ padding: 20}}>
            <Text>Bem vino a Home ;D</Text>
            <Button title="Sair" onPress={sair}/>
        </View>

    );
}

export default HomeScreen;