import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ScrollView  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import mascote from './assets/MascoteMentecVermelho.png';
import NavBar from './components/Navbar'



//telas

import Cadastro from './Screens/Cadastro'
import Login from './Screens/Login'

import Servicos from './Screens/Servicos'
import AgendamentoMonitoria from './Screens/agendamentoMonitoria'
import ListaMonitorias from './Screens/listaMonitorias'
import Perfil from './Screens/perfil'
import Historico from './Screens/historicoMonitorias'
import Sac from './Screens/sac'
import Chat from './Screens/telaChat'
import TelaMenuChat from './Screens/telaMenuChat'
import Conf from './Screens/conf'
import Forum from './Screens/forum'

import Cronograma from './Screens/Cronograma'
import MaterialApoio from './Screens/MaterialApoio'
import Feedback from './Screens/feedback'

import VerifyCode from './Screens/VerifyCode';



const Stack = createNativeStackNavigator();

const Inicio = ({ navigation }) => {
  return (
    <View  style={styles.container}>
      <View style={styles.title_Box}>
        <Text style={styles.title}>Mentec</Text>
      </View>
      <View style={styles.mascote_sub_title}>
        <Image source={mascote} style={styles.mascote_img} />
        <Text style={styles.sb_title}>
          Conectando mentes, moldando futuros!
        </Text>
      </View>
      <View style={styles.btn_box}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
          style={styles.btn_start}>
          <Text style={styles.text_btn}>Comece agora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_login}
        onPress = {()=>{navigation.navigate('Login')}}
        >
          <Text style={styles.text_btn}>Já tenho uma conta</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.btn_login, {borderWidth:0}]}
        onPress = {()=>{navigation.navigate('Servicos')}}
        >
          <Text style={styles.text_btn}>Entrar como visitante</Text>
        </TouchableOpacity>
      </View>
  
    </View >
  );
};

export default function App() {
  return (
  <NavigationContainer >
      <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name = "Cadastro" component = {Cadastro}/>
        <Stack.Screen name = "Login" component = {Login}/>
        <Stack.Screen name = "Servicos" component = {Servicos}/>
        <Stack.Screen name = "ListaMentorias" component = {ListaMonitorias} /> 
        <Stack.Screen name = "AgendamentoMonitoria" component = {AgendamentoMonitoria} /> 
        <Stack.Screen name = "perfil" component = {Perfil} /> 
        <Stack.Screen name = "historico" component = {Historico} /> 
        <Stack.Screen name = "Sac" component = {Sac} /> 
        <Stack.Screen name = "MenuChat" component = {TelaMenuChat} /> 
        <Stack.Screen name = "Chat" component = {Chat} /> 
        <Stack.Screen name = "Forum" component = {Forum} /> 
        <Stack.Screen name = "Confi" component = {Conf} /> 
        <Stack.Screen name = "Cronograma" component = {Cronograma} /> 
        <Stack.Screen name = "MaterialApoio" component = {MaterialApoio} /> 
        <Stack.Screen name = "Feedback" component = {Feedback} /> 
        <Stack.Screen name = "VerifyCode" component = {VerifyCode} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#770B1C',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  title_Box: {
    height: '20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  mascote_sub_title: {
    height: '45%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  btn_box: {
    height: '35%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
  },
  btn_start: {
    height: '25%',
    width: '80%',
    backgroundColor: '#A6192E',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  btn_login: {
    height: '25%',
    width: '80%',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
  },
  text_btn: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
  mascote_img: {
    height: '60%',
    width: '70%',
  },
  sb_title: {
    color: 'white',
    fontSize: 23,
    width: '60%',
  },
});
