import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MenuConversa from '../components/Sabrina/components/menuConversa';
import PesquisarMensagem from '../components/Sabrina/components/pesqMensagem';
import NavBar from '../components/Navbar';

export default function TelaMenuChat({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerChat}>
        <Text style={styles.textMentec}>Mentec</Text>
      </View>

      <View style={styles.containerPesq}>
        <PesquisarMensagem />
      </View>

      <View style={styles.lista}>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <MenuConversa
            nome="Gelibolu da Silva"
            mensagem="Você: Bom dia"
            data="03/03/2025"
            hora="17:30"
            imagem={require('../assets/perfilFlat.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <MenuConversa
            nome="Trevor Beraldo"
            mensagem="Trevo: Slk não compensa"
            data="26/02/2025"
            hora="17:59"
            imagem={require('../assets/perfilFlat.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerNavBar}>
    <NavBar navigation={navigation} style={{marginTop:'20%'  }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#EFEFEF',
  },

  containerChat: {
    backgroundColor: '#770B1C',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  containerPesq: {
    marginTop: 30,
    paddingHorizontal: 3,
  },
  containerNavBar: {
    marginTop: 280,
    paddingHorizontal: 3,
  },

  textMentec: {
    color: 'white',
    fontSize: 18,
  },

  lista: {
    marginTop: 20,
    paddingHorizontal: 3,
  },
});
