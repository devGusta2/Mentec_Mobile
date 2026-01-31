import { StyleSheet, Text, View, ScrollView } from 'react-native';
import NavBar from '../components/Navbar';
import Pesquisar from '../components/Pesquisa';
import CaixaMonitoria from '../components/caixaMonitoria';

export default function ListaMonitorias({navigation}) {
  return (
    <View>
      <View style={styles.containerMentec}>
        <Text style={styles.textMentec}>Mentec</Text>
      </View>

      <View style={styles.container}>
        <Pesquisar />
        <ScrollView showsVerticalScrollIndicator={false}>
          <CaixaMonitoria />
          <CaixaMonitoria />
          <CaixaMonitoria />
        </ScrollView>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    height: '92%',
  },
  containerMentec: {
    backgroundColor: '#770B1C',
    width: '100%',
    height: '8%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  textMentec: {
    color: 'white',
    paddingRight: 20,
    paddingBottom: 5,
    fontSize: 18,
  },
});