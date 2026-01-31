import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import NavBar from '../components/Navbar';

export default function Cronograma({ navigation }) {
  const totalQuadrados = 21;

  return (
    <View style={styles.containerCronograma}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.textHeader}>Cronograma de Aulas</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 100 }} // espaço para navbar
      >
        {/* Filtro */}
        <View style={styles.filter}>
          <Text style={{ color: 'white' }}>2025</Text>
          <Text style={{ color: 'white' }}>Setembro</Text>
        </View>

        {/* Grid de dias */}
        <View style={styles.gridContainer}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((dia, idx) => (
            <View key={idx} style={styles.quadradin}>
              <Text>{dia}</Text>
            </View>
          ))}

          {Array.from({ length: totalQuadrados }, (_, i) => (
            <View key={i} style={styles.quadradin}>
              <Text style={styles.numeroQuadrado}>{i + 1}</Text>
            </View>
          ))}
        </View>

        {/* Horários */}
        <View style={styles.rowLines}>
          <View style={styles.line}>
            <Text style={styles.lineText}>08:00 Matemática discreta</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.lineText}>18:00 Inglês</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.line}></View>
        </View>
      </ScrollView>

      {/* Navbar fixa */}
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCronograma: {
    flex: 1,
    backgroundColor: '#770B1C',
    position: 'relative',
  },
  header: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
  },
  filter: {
    backgroundColor: '#770B1C',
    height: 35,
    width: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  quadradin: {
    height: 37,
    width: 37,
    backgroundColor: '#ABAAAA',
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroQuadrado: {
    fontSize: 10,
  },
  rowLines: {
    marginTop: 20,
    flexDirection: 'column',
    gap: 5,
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: '#ABAAAA',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 5,
  },
  lineText: {
    color: 'whitesmoke',
    paddingLeft: 5,
  },
});
