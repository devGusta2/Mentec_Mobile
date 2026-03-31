import { ScrollView, StyleSheet, View } from 'react-native';

import NavBar from '../components/Navbar';
import Pesquisar from '../components/Pesquisa';
import CaixaMonitoria from '../components/caixaMonitoria';
import Header from '../components/header';

export default function ListaMonitorias() {
  return (
    <View style={styles.containerTela}>

      <Header titulo="Monitorias" />

      <View style={styles.container}>

        <Pesquisar />

        <ScrollView showsVerticalScrollIndicator={false}>

          <CaixaMonitoria
            titulo="Introdução ao Desenvolvimento Web"
            descricao="Aprenda HTML, CSS e JavaScript para criar suas primeiras páginas."
            imagem={require('../assets/monitoria1.jpg')}
            botoes={[
              { texto: "Agendar", rota: "AgendamentoMonitoria" }
            ]}
          />

          <CaixaMonitoria
            titulo="React Native"
            descricao="Desenvolva aplicativos mobile utilizando React Native."
            imagem={require('../assets/monitoria1.jpg')}
            botoes={[
              { texto: "Agendar", rota: "AgendamentoMonitoria" }
            ]}
          />

          <CaixaMonitoria
            titulo="Banco de Dados"
            descricao="Aprenda SQL, modelagem e integração com sistemas."
            imagem={require('../assets/monitoria1.jpg')}
            botoes={[
              { texto: "Agendar", rota: "AgendamentoMonitoria" }
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
    backgroundColor: '#ecf0f1',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    padding: 10,
  },

});