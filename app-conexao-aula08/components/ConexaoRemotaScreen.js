import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

const ConexaoRemotaScreen = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5009/listar_usuarios')
        .then(res => res.json())
        .then(data => {
            console.log("Usuario recebidos: ", data);
            setUsuarios(data);
        })
        .catch(error => console.error("Erro ao buscar usuarios: ", error));
    }, []);

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Lista de Usuarios
            </Text>
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={{ marginBottom: 5}}> {item.email} </Text>
                )}
            />

        </View>  
    );

}

export default ConexaoRemotaScreen;