import { StyleSheet, Text, View } from 'react-native';
import BotaoMenu from '../components/botaomenu';
import Header from '../components/header';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NavBar from '../components/Navbar'
export default function Servicos({ navigation }) {
  return (
    <View style={styles.containerTela}>
      <Header title = "Serviços"/>
      <View style={styles.container}>
        <BotaoMenu
          onPress={() => navigation.navigate('ListaMentorias')}
          titulo="Monitorias"
          imagem={
            <SimpleLineIcons
              name="notebook"
              size={60}
              color="white"

            />
          }
        />
        <BotaoMenu
          onPress={() => navigation.navigate('Cronograma')}
          titulo="Cronograma"


          imagem={
            <FontAwesome
              name="calendar"
              size={50}
              color="white"

            />
          }
        />
        <BotaoMenu
          onPress={() => navigation.navigate('perfil')}
          titulo="Perfil"
          imagem={
            <Octicons
              name="person"
              size={60}
              color="white"

            />
          }
        />
        <BotaoMenu
          onPress={() => navigation.navigate('MenuChat')}
          titulo="Chat"
          imagem={
            <Ionicons
              name="chatbox-ellipses-outline"
              size={60}
              color="white"

            />
          }
        />
        <BotaoMenu
          onPress={() => navigation.navigate('Forum')}
          titulo="Fórum"
          imagem={
            <Fontisto
              name="persons"
              size={50}
              color="white"

            />
          }
        />
        <BotaoMenu
          onPress={() => navigation.navigate('Sac')}
          titulo="SAC"
          imagem={
            <MaterialIcons
              name="contact-support"
              size={60}
              color="white"

            />
          }
        />
      </View>
      <NavBar />
      {/* <View style={styles.footer}></View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,

  },
  containerTela: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center ',
    backgroundColor: '#E5E5E5',
    height: '100%',
    width: "100%",




  },
  // footer: {
  //   width: '100%',
  //   height: 30,
  //   backgroundColor: '#770B1C',
  //   marginTop: 20,
  // },
});
