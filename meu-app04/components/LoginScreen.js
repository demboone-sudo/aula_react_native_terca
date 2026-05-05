import React, {useState} from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database/firebase';

function LoginScreen({ navigation }){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const conectarConta = () => {
        signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            navigation.navigate('Home');
        })
        .catch(erro => {
            console.error("Erro ao realizar o login " + erro.message);
        })
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>Login</Text>
            <TextInput placeholder="E-mail" onChangeText={setEmail} value={email}/>
            <TextInput placeholder="Senha" secureTextEntry
             onChangeText={setSenha} value={senha}/>
            <Button title="Entrar" onPress={conectarConta}/>
            <Button title="Cadastra-se" onPress={() => navigation.navigate('Registro')} />
        </View>
    );

}

export default LoginScreen;