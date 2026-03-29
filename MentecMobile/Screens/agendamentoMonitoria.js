import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/header';
import CaixaMonitoria from '../components/caixaMonitoria';
import BotaoPadrao from '../components/BotaoPadrao';
import NavBar from '../components/Navbar';

export default function AgendamentoMonitoria() {
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="#770B1C" barStyle="light-content" />

      <Header titulo="Monitoria" />

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

      </View>

      <NavBar />

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
    paddingBottom: 100,
  },

  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
});