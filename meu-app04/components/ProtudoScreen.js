import React, { useState, useEffect } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { db } from "../database/firebase";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

function ProdutoScreen() {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [produtos, setProdutos] = useState('');
    const [editarId, setEditarId] = useState(null);

    useEffect(()=> {
        listarProdutos();
    }, []);

    const salvarProdutos = async () => {
        if (editarId) {
            await updateDoc(doc(db, 'produtos', editarId), {nome, preco: Number(preco)});
            setEditarId(null);
        } else {
            await addDoc(collection(db, 'produtos'), {nome, preco: Number(preco)});
        }
        setNome('');
        setPreco('');
        listarProdutos();
    }

    const listarProdutos = async () => {
        const dadosDosProdutos = await getDocs(collection(db, 'produtos'));
        const listaProdutos = dadosDosProdutos.docs.map(doc => ({id: doc.id, ...doc.data()}));
        setProdutos(listaProdutos);
    }

    const editarProduto = (produto) => {
        setNome(produto.nome);
        setPreco(produto.preco.toString());
        setEditarId(produto.id);
    }

    const deletarProduto = async (id) => {
        await deleteDoc(doc(db, 'produtos', id));
        listarProdutos();
    }

    return (
        <View style={{padding: 20}}>
            <TextInput placeholder="Nome do Produto"
            value={nome}
            onChangeText={setNome}
            style={{borderBottomWidth: 1}}
            />

            <TextInput
                placeholder="Preco"
                value={preco}
                onChangeText={setPreco}
                style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />

            <Button
                title={editarId ? "Atualizar": "Adicionar"}
                onPress={salvarProdutos}
            />

            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={{ marginVertical: 10 }}>
                        <Text> {item.nome} - R${item.preco} </Text>
                        <Button title="Deletar" onPress={() => deletarProduto(item.id)}/>
                        <Button title="Editar" onPress={() => editarProduto(item)} color="red" />
                    </View>
                )}
            />

        </View>
    );
}

export default ProdutoScreen;