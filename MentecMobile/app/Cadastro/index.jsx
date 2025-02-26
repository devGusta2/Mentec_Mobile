import { View, Text, StyleSheet, TouchableOpacity, Image,TextInput } from 'react-native';
import msIcon from '../../assets/images/icons/microsoft.png';
import {  } from 'react-native-web';
export default function Cadastro() {
    return (
        <View style={styles.container}>
            <View style={styles.title_box}>
                <Text style={styles.title}>Preencha os dados para criar sua conta!</Text>
            </View>
            <View style={styles.inpts_box}>
            <View style={styles.inpt_field}>
                    {/* <Text style={styles.label}>Nome:</Text> */}
                    <TextInput placeholder='Nome:'   placeholderTextColor='white'style={styles.inpt_text}></TextInput>
                </View>
                <View style={styles.inpt_field}>
                    {/* <Text style={styles.label}>E-mail:</Text> */}
                    <TextInput placeholder='E-mail:'   placeholderTextColor='white'style={styles.inpt_text} ></TextInput>
                </View>
                <View style={styles.inpt_field}>
                    {/* <Text style={styles.label}>Matricula:</Text> */}
                    <TextInput placeholder='Matricula:'  placeholderTextColor='white' style={styles.inpt_text} ></TextInput>
                </View>
                <View style={styles.inpt_field}>
                    {/* <Text style={styles.label}>Senha:</Text> */}
                    <TextInput placeholder='Senha:' placeholderTextColor='white' style={styles.inpt_text} ></TextInput>
                </View>
                <View style={styles.inpt_field}>
                    {/* <Text style={styles.label}>Repita sua senha:</Text> */}
                    <TextInput  placeholder='Repita sua senha:'  placeholderTextColor='white'style={styles.inpt_text} ></TextInput>
                </View>

            </View>
            <View style={styles.btn_box}>
                <TouchableOpacity style={styles.btn_cadastro}>
                    <Text style={styles.btn_text}>Cadastrar</Text>
                </TouchableOpacity>
                <Text style={{ color: 'white' }}>Ou</Text>
                <TouchableOpacity style={styles.btn_cad_microsoft}>
                    <Image style={styles.ms_icon} source={msIcon} />
                    <Text>Cadastrar-se com microsoft</Text>
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
    title_box: {
        height: '20%',
        width: '100%',
   
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'left',
    },
    inpts_box: {
        height: '50%',
        width: '100%',
        
        alignContent:'center',
        justifyContent:'center'
    },
    btn_box: {
        height: '30%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15
    },
    btn_cadastro: {
        height: '25%',
        width: '80%',
        borderWidth: 3,           // Define a espessura da borda
        borderColor: 'white',     // Define a cor da borda
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    btn_cad_microsoft: {
        height: '25%',
        width: '80%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 16,
        flexDirection: 'row',
        gap: 30
    },
    btn_text: {
        color: 'white'
    },
    ms_icon: {
        height: '50%',
        width: '10%'
    },
    inpt_field:{
        width:'100%',
        height:'20%',
        justifyContent:'center',
        alignItems:'center',
        position:'relative',

        
    },  
    inpt_text: {
        // Borda na direita
        borderBottomWidth: 3,
        borderColor: 'white',
        height:'50%',
        width:'90%',
        color:'white'
    },
    label:{
        color:'white',
    
    }

});