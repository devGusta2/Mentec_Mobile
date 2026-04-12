import { View, StyleSheet, ScrollView } from 'react-native';

import Header from '../components/header';
import CaixaMonitoria from '../components/caixaMonitoria';
import NavBar from '../components/Navbar';

export default function HistoricoMonitorias() {
  return (
    <View style={styles.containerTela}>

      <Header titulo="Histórico de Monitorias" />

      <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false}>

          <CaixaMonitoria
            titulo="React Native"
            descricao="Monitoria concluída em 20/03"
            imagem={require('../assets/monitoria1.jpg')}
            botoes={[
              { texto: "Material de Apoio", onPress: () => alert("Abrir modal") },
              { texto: "Feedback", onPress: () => navigation.navigate("Feedback") }
            ]}
          />

          <CaixaMonitoria
            titulo="Banco de Dados"
            descricao="Monitoria concluída em 18/03"
            imagem={require('../assets/monitoria1.jpg')}
            botoes={[
              { texto: "Material", rota: "MaterialApoio" },
              { texto: "Feedback", onPress: () => navigation.navigate("Feedback") }
            ]}
          />

          <CaixaMonitoria
            titulo="Java"
            descricao="Monitoria concluída em 15/03"
            imagem={require('../assets/monitoria1.jpg')}
            botoes={[
              { texto: "Material de Apoio", onPress: () => alert("Abrir modal") },
              { texto: "Feedback", onPress: () => navigation.navigate("Feedback") }
            ]}
          />

        </ScrollView>

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

  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    padding: 10,
  },

});