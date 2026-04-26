import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Header from '../components/header';
import NavBar from '../components/Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoricoMonitorias({ navigation }) {

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 BUSCAR HISTÓRICO
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

      console.log(response.data);
      setHistorico(response.data);

    } catch (e) {
      console.log("Erro histórico:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  // 🔥 FORMATAR DATA
  const formatarData = (data) => {
    if (!data) return "Data não disponível";
    return new Date(data).toLocaleDateString('pt-BR');
  };

  // 🔥 STATUS DINÂMICO (BASEADO NA DATA DA MONITORIA)
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

                  {/* 🔥 STATUS */}
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
                      onPress={() => alert("Abrir material")}
                    >
                      <Text style={styles.textBotao}>
                        Material
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.botao, styles.botaoSecundario]}
                      onPress={() =>
                        navigation.navigate("Feedback", { id: item.id })
                      }
                    >
                      <Text style={styles.textBotao}>
                        Feedback
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

  textBotao: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

});