import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";



const API_URL = "http://localhost:8080"


export default function VerifyCode({ route, navigation }) {


    const { data } = route.params || {};
    const [code, setCode] = useState("");



    // const {data} = route.params;
    // const codeRequest = async () =>{
    const payload = {
        nome: data.nome,
        destinatario: data.email,
        senha: data.senha,
        sobrenome: data.sobrenome,
        cpf: data.cpf
    }
    const requestCode = async () => {
        try {
            const response = await axios.post(`${API_URL}/email/check`, payload)

        } catch (e) {
            alert("Ocorreu algum erro durante o envio dos dados: " + e.message || "")
        }
    }



    //     console.log(payload)
    // }

    // Adicione o parâmetro 'receivedCode'
    const verifyCode = async (receivedCode) => {
        const payload2 = {
            email: data.email,
            codigo: receivedCode || code // Usa o que recebeu ou o estado como backup
        }

        try {
            console.log("Enviando para o banco:", payload2);
            // const response = await axios.post(`${API_URL}/email/verify`, payload2);
            // navegação de sucesso aqui...
        } catch (e) {
            alert("Erro na verificação: " + (e.response?.data?.message || e.message));
        }
    }



    useEffect(() => {
        requestCode();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.text_box}>
                    <Text style={styles.title}>Enviamos um e-mail para confirmar seu cadastro</Text>
                    <FontAwesome color={'white'} size={100} style={styles.icon_mail} name="envelope" />
                </View>
                <View style={styles.text_box2}>
                    <Text style={styles.sub_title}>Caso não encontre o e-mail, confira também as pastas Spam ou Lixo Eletrônico.</Text>
                </View>
                <View style={styles.input_code_box}>
                    <TextInput
                    style={styles.input}
                        onChangeText={text => {
                            const numericText = text.replace(/[^0-9]/g, "");
                            setCode(numericText);

                            if (numericText.length === 6) {
                                // Passa o numericText (que tem os 6 dígitos) diretamente
                                verifyCode(numericText);
                            }
                        }}
                    />
                </View>
                <View style={styles.button_box}>
                    <TouchableOpacity onPress={requestCode} style={styles.button}>
                        <Text style={styles.btn_text}>Reenviar código</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#770B1C'
    },
    text_box: {
        height: 350,
        width: '100%',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,

    },
    title: {
        color: 'whitesmoke',
        fontSize: '22pt',
        marginLeft: '20%',
        width: '100%'
    },
    text_box2: {
        height: 150,
        width: '100%',

        padding: 50
    },
    sub_title: {
        color: 'whitesmoke',
        fontSize: '12pt',
        marginLeft: '0%',
        width: '100%',

    },
    input_code_box: {
        height: 250,
        width: '100%',
        padding: 50
    },
    button_box: {
        height: 100,
        width: '100%',

    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        outlineColor: 0,
        outlineStyle: 'none',
        padding: 5,
        color: 'white'
    },
    button: {
        height: 85,
        width: 320,
        backgroundColor: "#A6192E",
        borderRadius: 16,
        margin: 'auto',
        padding: 30
    },
    btn_text: {
        color: 'white',
        fontSize: '15pt',
        textAlign: 'center',

    }
})