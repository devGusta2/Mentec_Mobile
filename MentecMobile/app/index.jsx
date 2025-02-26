import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text , Image} from "react-native";
import mascote from '..//assets/images/Arts/MascoteMentecVermelho.png';
import { useRouter } from 'expo-router';
export default function Inicio() {
    const router = useRouter(); 
    return (
        
        <View style={styles.container}>
            <View style={styles.title_Box}>
                <Text style={styles.title}>Mentec</Text>
            </View>
            <View style={styles.mascote_sub_title}>
                <Image source={mascote} style={styles.mascote_img}></Image>
                <Text style={styles.sb_title}>Conectando mentes, moldando futuros!</Text>
            </View>
            <View style={styles.btn_box}>
                <TouchableOpacity
                onPress={() => router.push('/Cadastro')}
                style={styles.btn_start}>
                    <Text style={styles.text_btn}>Comece agora</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_login}>
                    <Text style={styles.text_btn}>Já tenho uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#770B1C",
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-around',

    },
    title_Box: {
        height: '20%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },
    mascote_sub_title: {
        height: '45%',
        width: '100%',
        alignItems:'center',
        justifyContent:'center',
        gap:20
    },
    btn_box: {
        height: '35%',
        width: '100%',
        alignItems:'center',
        justifyContent:'center',
        gap:10
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color:'white'
    },
    btn_start:{
        height:'25%',
        width:'80%',
        backgroundColor:'#A6192E',
        borderRadius:16,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
    },
    btn_login:{
        height:'25%',
        width:'80%',
        borderWidth: 3,           // Define a espessura da borda
        borderColor: 'white',     // Define a cor da borda
        borderRadius: 16,   
        borderRadius:16,
        justifyContent:'center',
       
    },
    text_btn:{
        color:'white',
        textAlign:'center',
        fontWeight:500
    },
    mascote_img:{
        height:'60%',
        width:'70%'
    },
    sb_title:{
        color:'white',
        fontSize:23,
        width:'60%'
    }
})