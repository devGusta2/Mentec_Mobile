import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BotaoPadrao from '../components/BotaoPadrao';
import CaixaInform from '../components/CaixaInform';
import Header from '../components/header';
import NavBar from '../components/Navbar';


export default function Perfil() {
  const navigation = useNavigation();

  return (
    <View style={styles.containerTela}>

      <Header titulo="Perfil" />

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

        <CaixaInform />

        <View style={styles.containerBotoes}>
          <BotaoPadrao
            title="HistóricoMonitorias"
            onPress={() => navigation.navigate('HistoricoMonitorias')}
          />

          <BotaoPadrao
            title="Configuração"
            onPress={() => navigation.navigate('conf')}
          />

          <BotaoPadrao
            title="Gerenciar monitorias"
            onPress={() => navigation.navigate('GerenciarMonitorias')}
          />
        </View>

      </View>

      <NavBar />

    </View>
  );
}

const styles = StyleSheet.create({

  containerTela: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },

  profileCard: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },

  containerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 10,
    marginBottom: 10,
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

  containerBotoes: {
    marginTop: 5,
    gap: 5,
    alignItems: 'center',
  },

});