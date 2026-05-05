import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth } from '../database/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


function RegistroScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const registrarUsuario = () => {
        createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            console.log("Conta Criada com Sucesso");
            navigation.navigate('Login');
        }).catch(erro => {
            console.error("Erro ao enviar o dado no firebase", erro);
        })
    }

    return (
        <View style={{padding: 20}}>
            <Text> Cadastro de Usuario </Text>
            <TextInput placeholder="E-mail" onChangeText={setEmail} value={email}/>
            <TextInput placeholder="Senha" secureTextEntry
             onChangeText={setSenha} value={senha}/>
            <Button title="Cadastrar" onPress={registrarUsuario}/>
        </View>
    );
}

export default RegistroScreen;