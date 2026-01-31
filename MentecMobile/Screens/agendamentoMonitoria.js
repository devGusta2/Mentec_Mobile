import React from 'react';
import { View, StyleSheet, StatusBar, Alert, Pressable, Text } from 'react-native';
import Header from '../components/header2';
import CaixaMonitoria from '../components/caixaMonitoria';
import BotaoPadrao from '../components/BotaoPadraos';
import NavBar from '../components/Navbar';

export default function AgendamentoMonitoria({ title, onPress, navigation}) {
  
  const handlePress = (message) => {
    alert(message);
  
  };
  
  return (
    
    <View style={styles.container}>

    <Text style={styles.textMentec}>Mentec</Text>
      <StatusBar backgroundColor="#770B1C" barStyle="light-content" />
      <Header title="Monitoria" />

      <View style={styles.parteBranca}>

        <CaixaMonitoria />

        <View style={styles.containerBotoes}>
          <BotaoPadrao
            title="Agendar"
            onPress={() => alert('Você clicou no agendamento')}
          />
          <BotaoPadrao
            title="Materiais de apoio"
            onPress={() => navigation.navigate('MaterialApoio')}
          />          
        </View>
        <NavBar />
      </View>     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#770B1C',
  },

  parteBranca: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 50,
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingBottom: 140, 
  },

  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    height: '80%',
    marginTop: 17,
    fontWeight: 'bold',
  },

  textMentec:{
      color:'white',
      paddingLeft: 262,
      fontSize:18,
    },
});
