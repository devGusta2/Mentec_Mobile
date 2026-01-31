import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/HeaderSac';
import NavBar from '../components/Navbar';
import CaixaTxt from '../components/CaixaTxt';

export default function SAC({navigation}) {
  return (
    <View style={styles.containerTela}>
      
      <Header />

      <Text style={styles.titulo}>Fatec{"\n"}Ferraz de Vasconcelos</Text>

      <View style={styles.container}>
        <CaixaTxt />
      </View>

      <View style={styles.footer}>
       <NavBar navigation={navigation} />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },

  titulo: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },

  footer: {
    width: '100%',
    height: 60,
    backgroundColor: '#770B1C',
    justifyContent: 'center',
  },
});