import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Platform
} from 'react-native';

import NavBar from '../components/Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../Utils/AuthRequestProvider';

export default function HistoricoMonitorias({ navigation }) {

  const API_URL = getApiUrl();

  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelandoId, setCancelandoId] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("AGENDADA");


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
      console.log(response.data)
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

  const cancelarAgendamento = async (agendamentoId) => {
    if (!agendamentoId) {
      Alert.alert('Erro', 'Agendamento inválido para cancelamento.');
      return;
    }

    try {
      setCancelandoId(agendamentoId);
      const TOKEN = await AsyncStorage.getItem('@mentec_token');

      await axios.delete(`${API_URL}/agendamentos/cancelar/${agendamentoId}`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });

      await fetchHistorico();
      Alert.alert('Agendamento cancelado', 'A monitoria foi removida do seu histórico.');
    } catch (e) {
      console.log('Erro ao cancelar agendamento:', e?.response?.data || e?.message || e);
      Alert.alert(
        'Erro',
        e?.response?.data?.message || 'Não foi possível cancelar o agendamento.'
      );
    } finally {
      setCancelandoId(null);
    }
  };

  const confirmarCancelamento = (agendamentoId) => {
    if (Platform.OS === 'web') {
      const confirmou = window.confirm('Tem certeza que deseja cancelar esta monitoria?');
      if (confirmou) {
        cancelarAgendamento(agendamentoId);
      }
      return;
    }

    Alert.alert(
      'Cancelar agendamento',
      'Tem certeza que deseja cancelar esta monitoria?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: () => cancelarAgendamento(agendamentoId),
        },
      ]
    );
  };


  const formatarData = (data) => {
    if (!data) return "Data não disponível";


    const partes = data.split('-');
    const d = new Date(partes[0], partes[1] - 1, partes[2]);

    return d.toLocaleDateString('pt-BR');
  };


  const parseDataLocal = (data) => {
    if (!data) return null;

    const [ano, mes, dia] = data.split('-').map(Number);
    if (!ano || !mes || !dia) return null;

    return new Date(ano, mes - 1, dia);
  };

  const getStatus = (dataInicio, dataFim) => {
    if (!dataInicio) return "AGENDADA";

    const hoje = new Date();
    const inicio = parseDataLocal(dataInicio);
    const fim = parseDataLocal(dataFim || dataInicio);

    if (!inicio || !fim) return "AGENDADA";

    hoje.setHours(0, 0, 0, 0);
    inicio.setHours(0, 0, 0, 0);
    fim.setHours(23, 59, 59, 999);

    if (hoje < inicio) {
      return "AGENDADA";
    }

    if (hoje > fim) {
      return "CONCLUIDA";
    }

    return "EM_ANDAMENTO";
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
  const abas = [
    { status: "AGENDADA", label: "Agendadas" },
    { status: "EM_ANDAMENTO", label: "Em andamento" },
    { status: "CONCLUIDA", label: "Concluídas" },
  ];

  const historicoFiltrado = historico.filter(
    (item) => getStatus(item.dataInicio, item.dataFim) === abaAtiva
  );

  const abaSelecionada = abas.find(
    (aba) => aba.status === abaAtiva
  );

  const contarPorStatus = (status) => {
    return historico.filter(
      (item) => getStatus(item.dataInicio, item.dataFim) === status
    ).length;
  };
  return (
    <View style={styles.containerTela}>

      <View style={styles.header}>
        <Text style={styles.logoMentec}>Mentec</Text>
        <Text style={styles.headerTitulo}>Histórico de Monitorias</Text>
      </View>

      <View style={styles.container}>

        <View style={styles.tabs}>
          {abas.map((aba) => {
            const selecionada = abaAtiva === aba.status;

            return (
              <TouchableOpacity
                key={aba.status}
                style={[styles.tab, selecionada && styles.tabAtiva]}
                onPress={() => setAbaAtiva(aba.status)}
              >
                <Text style={[styles.tabTexto, selecionada && styles.tabTextoAtivo]}>
                  {aba.label}
                </Text>
                <Text style={[styles.tabContador, selecionada && styles.tabTextoAtivo]}>
                  {contarPorStatus(aba.status)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

          {loading ? (
            <Text style={styles.info}>Carregando...</Text>

          ) : historico.length === 0 ? (
            <Text style={styles.info}>
              Nenhuma monitoria encontrada
            </Text>

          ) : historicoFiltrado.length === 0 ? (
            <Text style={styles.info}>
              Nenhuma monitoria em {abaSelecionada?.label.toLowerCase()}
            </Text>

          ) : (
            historicoFiltrado.map((item, index) => {

              const status = getStatus(item.dataInicio, item.dataFim);

              return (
                <View key={index} style={styles.card}>

                  <Text style={styles.titulo}>
                    {item.titulo}
                  </Text>

                  <Text style={styles.descricao}>
                    Monitoria de {formatarData(item.dataInicio)} ate {formatarData(item.dataFim)}
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

                    {status === "AGENDADA" && (
                      <TouchableOpacity
                        style={[styles.botao, styles.botaoCancelar]}
                        onPress={() => confirmarCancelamento(item.id)}
                        disabled={cancelandoId === item.id}
                      >
                        <Text style={styles.textBotao}>
                          {cancelandoId === item.id ? 'Cancelando...' : 'Cancelar'}
                        </Text>
                      </TouchableOpacity>
                    )}

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

  header: {
    backgroundColor: '#770B1C',
    width: '100%',
    minHeight: 190,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    paddingTop: 22,
    paddingBottom: 42,
  },

  logoMentec: {
    color: 'white',
    alignSelf: 'flex-end',
    paddingRight: 20,
    fontSize: 18,
    fontWeight: '600',
  },

  headerTitulo: {
    color: 'white',
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 34,
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -18,
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 16,
  },

  info: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },

  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  tab: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },

  tabAtiva: {
    backgroundColor: '#770B1C',
    borderColor: '#770B1C',
  },

  tabTexto: {
    color: '#555',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  tabContador: {
    color: '#555',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 3,
  },

  tabTextoAtivo: {
    color: '#fff',
  },

  card: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    elevation: 3,
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#101010',
  },

  descricao: {
    fontSize: 13,
    color: '#1f1f1f',
    marginTop: 7,
    lineHeight: 18,
  },

  monitor: {
    fontSize: 13,
    color: '#1f1f1f',
    marginTop: 6,
  },

  status: {
    marginTop: 5,
    fontWeight: 'bold',
  },

  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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

  botaoCancelar: {
    backgroundColor: '#b30000',
  },

  textBotao: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

});
