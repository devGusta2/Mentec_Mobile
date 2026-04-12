import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BotaoMenu from '../components/botaomenu';
import Header from '../components/header';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Servicos() {
  const navigation = useNavigation();

  return (
    <View style={styles.containerTela}>
      
      <Header titulo="Serviços" />

      <View style={styles.container}>

        <BotaoMenu
          titulo="Monitorias"
          onPress={() => navigation.navigate('ListaMonitorias')}
          imagem={<SimpleLineIcons name="notebook" size={60} color="#fff" />}
        />

        <BotaoMenu
          titulo="Cronograma"
          onPress={() => navigation.navigate('Cronograma')}
          imagem={<FontAwesome name="calendar" size={50} color="#fff" />}
        />

        <BotaoMenu
          titulo="Perfil"
          onPress={() => navigation.navigate('Perfil')}
          imagem={<Octicons name="person" size={60} color="#fff" />}
        />

        <BotaoMenu
          titulo="Menu Inicial"
          onPress={() => navigation.navigate('Inicio')}
          imagem={<Ionicons name="home" size={60} color="#fff" />}
        />

        <BotaoMenu
          titulo="Fórum"
          onPress={() => navigation.navigate('Forum')}
          imagem={<Fontisto name="persons" size={50} color="#fff" />}
        />

        <BotaoMenu
          titulo="SAC"
          onPress={() => navigation.navigate('SAC')}
          imagem={<MaterialIcons name="contact-support" size={60} color="#fff" />}
        />

      </View>

      <View style={styles.footer} />

    </View>
  );
}

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
  },
  container: {
    flexDirection: 'row',
    width: 300,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  footer: {
    width: '100%',
    height: 30,
    backgroundColor: '#770B1C',
    marginTop: 20,
  },
});