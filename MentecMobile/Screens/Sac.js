import { StyleSheet, Text, View } from 'react-native';

import Header from '../components/header';
import NavBar from '../components/Navbar';
import CaixaTxt from '../components/CaixaTxt';

export default function SAC() {
  return (
    <View style={styles.containerTela}>
      
      <Header titulo="SAC" />

      <View style={styles.containerConteudo}>
        <Text style={styles.titulo}>
          Fatec{"\n"}Ferraz de Vasconcelos
        </Text>

        <View style={styles.container}>
          <CaixaTxt />
        </View>

      </View>

      <NavBar />

    </View>
  );
}

const styles = StyleSheet.create({

  containerTela: {
    flex: 1,
    backgroundColor: '#770B1C',
  },

  containerConteudo: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    alignItems: 'center',
    paddingTop: 20,
  },

  titulo: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },

});