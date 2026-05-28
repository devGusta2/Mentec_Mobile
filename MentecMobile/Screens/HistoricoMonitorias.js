import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

import Header from '../components/header';
import NavBar from '../components/Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoricoMonitorias({ navigation }) {

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchHistorico = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const idUser = await AsyncStorage.getItem('@mentec_userid');

      const response = await axios.get(
        `${API_URL}/agendamentos/historico/${idUser}`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` }
        }
      );

      const historicoComFeedback = await Promise.all(
        response.data.map(async (item) => {
          try {
            const feedbackResponse = await axios.get(
              `${API_URL}/feedback/monitoria/${item.id}/aluno/${idUser}/existe`,
              {
                headers: { Authorization: `Bearer ${TOKEN}` }
              }
            );

            return {
              ...item,
              feedbackEnviado: feedbackResponse.data === true,
            };
          } catch (error) {
            console.log("Erro ao verificar feedback:", error);
            return {
              ...item,
              feedbackEnviado: false,
            };
          }
        })
      );

      setHistorico(historicoComFeedback);

    } catch (e) {
      console.log("Erro histórico:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);


  const formatarData = (data) => {
    if (!data) return "Data não disponível";


    const partes = data.split('-');
    const d = new Date(partes[0], partes[1] - 1, partes[2]);

    return d.toLocaleDateString('pt-BR');
  };


  const getStatus = (dataInicio) => {
    if (!dataInicio) return "AGENDADA";

    const hoje = new Date();
    const data = new Date(dataInicio);

    hoje.setHours(0, 0, 0, 0);
    data.setHours(0, 0, 0, 0);

    if (data.getTime() === hoje.getTime()) {
      return "EM_ANDAMENTO";
    } else if (data < hoje) {
      return "CONCLUIDA";
    } else {
      return "AGENDADA";
    }
  };

  const abrirMaterial = async (linkMaterial) => {

    if (!linkMaterial) {
      Alert.alert(
        'Material indisponível',
        'Essa monitoria ainda não possui link de material.'
      );
      return;
    }

    try {

      let url = linkMaterial.trim();

      // adiciona https:// automaticamente
      if (
        !url.startsWith('http://') &&
        !url.startsWith('https://')
      ) {
        url = `https://${url}`;
      }

      const suportado =
        await Linking.canOpenURL(url);

      if (!suportado) {
        Alert.alert(
          'Link inválido',
          'Não foi possível abrir o link do material.'
        );
        return;
      }

      await Linking.openURL(url);

    } catch (error) {

      console.log(
        'Erro ao abrir material:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível abrir o material.'
      );
    }
  };

  return (
    <View style={styles.containerTela}>

      <Header titulo="Histórico de Monitorias" />

      <View style={styles.container}>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

          {loading ? (
            <Text style={styles.info}>Carregando...</Text>

          ) : historico.length === 0 ? (
            <Text style={styles.info}>
              Nenhuma monitoria encontrada
            </Text>

          ) : (
            historico.map((item, index) => {

              const status = getStatus(item.dataInicio);

              return (
                <View key={index} style={styles.card}>

                  <Text style={styles.titulo}>
                    {item.titulo}
                  </Text>

                  <Text style={styles.descricao}>
                    Monitoria em {formatarData(item.dataInicio)}
                  </Text>

                  <Text style={styles.monitor}>
                    Monitor: {item.monitor}
                  </Text>

                  <Text style={[
                    styles.status,
                    status === "EM_ANDAMENTO" && { color: "#f1c40f" },
                    status === "CONCLUIDA" && { color: "green" },
                    status === "AGENDADA" && { color: "#3498db" },
                  ]}>
                    {status === "EM_ANDAMENTO" && "🟡 Em andamento"}
                    {status === "CONCLUIDA" && "🟢 Concluída"}
                    {status === "AGENDADA" && "🔵 Agendada"}
                  </Text>

                  <View style={styles.botoes}>

                    <TouchableOpacity
                      style={styles.botao}
                      onPress={() => abrirMaterial(item.linkMaterial)}
                    >
                      <Text style={styles.textBotao}>
                        Material
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.botao,
                        styles.botaoSecundario,
                        item.feedbackEnviado && styles.botaoDesabilitado,
                      ]}
                      onPress={() =>
                        navigation.navigate("Feedback", { id: item.id })
                      }
                      disabled={item.feedbackEnviado}
                    >
                      <Text style={styles.textBotao}>
                        {item.feedbackEnviado ? "Feedback enviado" : "Feedback"}
                      </Text>
                    </TouchableOpacity>

                  </View>

                </View>
              );
            })
          )}

        </ScrollView>

      </View>

      <NavBar navigation={navigation} />

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

  info: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },

  card: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  descricao: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },

  monitor: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },

  status: {
    marginTop: 5,
    fontWeight: 'bold',
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  botao: {
    backgroundColor: '#770B1C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  botaoSecundario: {
    backgroundColor: '#999',
  },

  botaoDesabilitado: {
    backgroundColor: '#4CAF50',
  },

  textBotao: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

});
