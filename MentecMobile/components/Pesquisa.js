import { Text, View, StyleSheet } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Pesquisar() {
  return (
    <View style={styles.containerPesq}>
      <View style={styles.pesq}>
        <Text style={styles.text}>Pesquise uma monitoria...</Text>
        <EvilIcons name="search" size={24} color="#ABAAAA" />
      </View>

      <View style={styles.filtro}>
        <View style={styles.campoFiltro}>
          <AntDesign name="down" size={15} color="white" />
          <Text style={styles.textFiltro}>Área</Text>
        </View>

        <View style={styles.campoFiltro}>
          <AntDesign name="down" size={15} color="white" />
          <Text style={styles.textFiltro}>Período</Text>
        </View>

        <View style={styles.campoFiltro}>
          <AntDesign name="down" size={15} color="white" />
          <Text style={styles.textFiltro}>Data</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPesq: {
    flexDirection: 'column', 
    backgroundColor: '#770B1C',
    width: '100%',
    alignItems: 'center',
    borderRadius: 9,
    justifyContent: 'space-evenly',
    paddingVertical: 15,
  },

  filtro: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 10,
  },

  campoFiltro: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pesq: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#ABAAAA',
    fontSize: 10,
    width: '90%',
    paddingLeft: 10,
  },

  textFiltro: {
    color: '#fff',
    fontSize: 12,
  },
});