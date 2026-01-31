import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Header from '../components/headerPerfil';
import NavBar from '../components/Navbar';
import BotaoPadrao from '../components/BotaoPadraos';
import CaixaMonitoria2 from '../components/caixamonitoria2';


export default function Perfil({navigation}) {
  return (
    <View style={styles.containerTela}>
      <Header />

      <View style={styles.profileCard}>
        <View style={styles.containerAvatar}>
          <View style={styles.avatarCircle}>
            <Image
              source={require('../assets/logo_perfil.png')}
              style={styles.avatar}
            />
          </View>

          <Text>Lorem ipsum eu tristique</Text>
        </View>

        <CaixaMonitoria2 />

        <View style={styles.container}>
          <BotaoPadrao
            title="Histórico de monitorias"
               onPress = {()=>{navigation.navigate('historico')}}
          />
          <BotaoPadrao
            title="Configuração"
            onPress = {()=>{navigation.navigate('Confi')}}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <NavBar navigation={navigation} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 280,
    flexWrap: 'wrap',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  containerTela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
  },
  footer: {
    width: '100%',
    height: 30,
    backgroundColor: '#770B1C',
    marginTop: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
  },
  containerAvatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
  },
  
});