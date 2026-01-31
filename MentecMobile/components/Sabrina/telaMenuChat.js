import { StyleSheet, Text, View } from 'react-native';
import MenuConversa from './components/menuConversa';
import PesquisarMensagem from './components/pesqMensagem';
import NavBar from '../../components/Navbar';

export default function TelaMenuChat() {
  return (
    <View style={styles.container}>
      
      <View style={styles.containerChat}> 
        <Text style={styles.textMentec}>Mentec</Text>
      </View>

      <View style={styles.containerPesq}>
        <PesquisarMensagem/>
      </View>

      <View style={styles.lista}>

        <MenuConversa
          onPress={() => navigation.navigate('Chat')}
          nome="Gelibolu da Silva"
          mensagem="Você: Bom dia"
          data="03/03/2025"
          hora="17:30"
          imagem={require('../../assets/perfilFlat.png')}
        />

        <MenuConversa
          nome="Trevor Beraldo"
          mensagem="Trevo: Slk não compensa"
          data="26/02/2025"
          hora="17:59"
          imagem={require('../../assets/perfilFlat.png')}
        />

      </View>

      <View style={styles.containerNavBar}>
        <NavBar/>
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
