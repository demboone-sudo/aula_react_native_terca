import React, { useState, useEffect } from "react";
import { View, 
        TextInput, 
        Button, 
        Text, 
        FlatList, 
        TouchableOpacity, 
        StyleSheet } from "react-native";
import db from "../database/database";

const DexieExemplo = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [usuarios, setUsuarios] = useState('');
    const [idEdicao, setIdEdicao] = useState(null);

    useEffect(() => {
        carregarUsuarios();
    }, [])

    const addUsuario = async () => {

        if (!nome || !idade) return; 

        if (idEdicao) {
            await db.usuarios.update(idEdicao, {nome, idade: parseInt(idade)});
            setIdEdicao(null);
        } else {
            await db.usuarios.add({nome, idade: parseInt(idade)});
        }
        setNome('');
        setIdade('');
        carregarUsuarios();
    }

    const carregarUsuarios = async () => {
        const todosUsuarios = await db.usuarios.toArray()
        setUsuarios(todosUsuarios);
    }

    const prepararEdicao = (usuario) => {
        setNome(usuario.nome);
        setIdade(usuario.idade.toString());
        setIdEdicao(usuario.id)
    }

    const cancelarEdicao = () => {
        setNome('');
        setIdade('');
        setIdEdicao(null);
    }

    const deletarUsuario = async (id) => {
        await db.usuarios.delete(id);
        carregarUsuarios();
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
                style={styles.input}
            />

            <TextInput
                placeholder="Idade"
                value={idade}
                onChangeText={setIdade}
                style={styles.input}
            />

            <Button 
            title={idEdicao? "Atualizar Usuario": "Adicionar Usuario"}
            onPress={addUsuario}/>
            {idEdicao && (
                    <View style={styles.cancelarContainer}>
                        <Button title="Cancelar Edicao" color="#105e2e" onPress={cancelarEdicao}/>
                    </View>
                )
            }

            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>Nome: {item.nome}, {item.idade} anos</Text>

                        <View style={styles.botoesContainer}>
                            <TouchableOpacity onPress={() => prepararEdicao(item)} style={styles.botaoAcao}>
                                <Text style={styles.textoBotaoAcao}>Editar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={() => deletarUsuario(item.id)}
                                style={[styles.botaoAcao, styles.botaoDeletar]}
                                >
                                <Text style={styles.textoBotaoAcao}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                )}
            />
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {padding: 20},
    input: {
            borderWidth: 1,
            marginBottom: 10,
            padding: 8,
            borderRadius: 4,
            borderColor: '#ccc'
    },
    cancelarContainer: {
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    itemText: {
        flex: 1,
        fontSize: 16
    },
    botoesContainer: {
        flexDirection: 'row'
    },
    botaoAcao : {
        backgroundColor: '#007BFF',
        padding: 8,
        borderRadius: 4, 
        marginLeft: 10
    },
    botaoDeletar: {
        backgroundColor: '#DC3545',
    },
    textoBotaoAcao: {
        color: '#fff',
        fontWeight: 'bold'
    } 

})

export default DexieExemplo;