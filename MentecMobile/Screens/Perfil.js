import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import BotaoPadrao from '../components/BotaoPadrao';
import CaixaInform from '../components/CaixaInform';
import Header from '../components/header';
import NavBar from '../components/Navbar';
import defaultAvatar from '../assets/psi.jpg';

export default function Perfil({ navigation }) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [usuario, setUsuario] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCampo = (...campos) => {
    const campo = campos.find((nomeCampo) => usuario?.[nomeCampo]);
    return campo ? usuario[campo] : null;
  };

  const fetchPerfil = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const idUser = await AsyncStorage.getItem('@mentec_userid');

      if (!TOKEN || !idUser) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/usuarios/info/${idUser}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      setUsuario(response.data);
    } catch (e) {
      console.log('Erro ao buscar perfil:', e);
    } finally {
      setLoading(false);
    }
  };

  const loadAvatar = async () => {
    const avatarSalvo = await AsyncStorage.getItem('@mentec_avatar');
    setAvatar(avatarSalvo);
  };

  useEffect(() => {
    fetchPerfil();
    loadAvatar();

    const unsubscribe = navigation.addListener('focus', loadAvatar);
    return unsubscribe;
  }, []);

  const nome = getCampo('nome', 'nomeCompleto', 'name', 'fullName');
  const email = getCampo('email', 'emailUsuario');
  const telefone = getCampo('telefone', 'celular', 'phone', 'numeroTelefone');

  return (
    <View style={styles.containerTela}>
      <Header titulo="Perfil" />

      <View style={styles.conteudo}>
      <View style={styles.profileCard}>
        <View style={styles.containerAvatar}>
          <View style={styles.avatarCircle}>
            <Image
              source={avatar ? { uri: avatar } : defaultAvatar}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.nomeUsuario}>
            {loading ? 'Carregando...' : nome || 'Nome não informado'}
          </Text>
        </View>

        <CaixaInform email={email} telefone={telefone} />

        <View style={styles.containerBotoes}>
          <BotaoPadrao
            title="Histórico Monitorias"
            onPress={() => navigation.navigate('HistoricoMonitorias')}
          />

          <BotaoPadrao
            title="Configuração"
            onPress={() => navigation.navigate('Conf')}
          />
        </View>
      </View>
      </View>

      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    backgroundColor: '#770B1C',
  },

  conteudo: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -18,
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 16,
  },

  profileCard: {
    flex: 1,
    alignItems: 'center',
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

  nomeUsuario: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: 180,
  },

  containerBotoes: {
    marginTop: 5,
    gap: 5,
    alignItems: 'center',
  },
});
