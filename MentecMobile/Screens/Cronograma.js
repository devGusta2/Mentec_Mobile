import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import NavBar from '../components/Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registrarLembretesMonitoria } from '../Utils/notificacoes';
import { getApiUrl } from '../Utils/AuthRequestProvider';

export default function Cronograma({ navigation }) {

  const API_URL = getApiUrl();

  const [selectedDate, setSelectedDate] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);


  const fetchCronograma = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const idUser = await AsyncStorage.getItem('@mentec_userid');

      const response = await axios.get(
        `${API_URL}/agendamentos/buscar/${idUser}`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` }
        }
      );

      setAgendamentos(response.data);
      await registrarLembretesMonitoria(response.data);

    } catch (e) {
      console.log("Erro cronograma", e);
    }
  };

  useEffect(() => {
    fetchCronograma();
  }, []);

  const registrarAcessoAula = async (aulaId) => {
    try {
      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const idUser = await AsyncStorage.getItem('@mentec_userid');

      await axios.post(
        `${API_URL}/frequencia/registrar`,
        {
          idAula: aulaId,
          idAluno: idUser,
        },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
    } catch (e) {
      console.log('Erro ao registrar acesso da aula', e);
    }
  };

  const acessarAula = async (item) => {
    await registrarAcessoAula(item.aulaId);
    Linking.openURL(item.link || "https://teams.microsoft.com/");
  };

  const markedDates = {};

  agendamentos.forEach((item) => {
    markedDates[item.data] = {
      marked: true,
      dotColor: '#770B1C',
    };
  });

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: '#770B1C',
    };
  }


  const eventosDoDia = agendamentos.filter(
    (a) => a.data === selectedDate
  );


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Cronograma</Text>
      </View>

      <View style={styles.conteudo}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
        />

        {selectedDate && (
          <Text style={styles.subtitulo}>
            Monitorias do dia {selectedDate}
          </Text>
        )}

        {eventosDoDia.length > 0 ? (
          eventosDoDia.map((item, index) => (
            <View key={index} style={styles.card}>

              <View style={styles.cardContent}>

                <View style={styles.topInfo}>
                  <Text style={styles.monitoriaTitulo}>
                    {item.tituloMonitoria}
                  </Text>

                  <Text style={styles.aulaTitulo}>
                    {item.tituloAula}
                  </Text>
                </View>

                <Text style={styles.descricao}>
                  {item.descricaoAula}
                </Text>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Data:</Text>
                  <Text style={styles.value}>{item.data}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.label}>Horário:</Text>
                  <Text style={styles.value}>
                    {item.inicio} às {item.fim}
                  </Text>
                </View>

                <Pressable
                  style={styles.botao}
                  onPress={async () => {

                    try {

                      const TOKEN = await AsyncStorage.getItem('@mentec_token');
                      const idUser = await AsyncStorage.getItem('@mentec_userid');

                      await axios.post(
                        `${API_URL}/frequencia/registrar`,
                        {
                          idAula: item.aulaId,
                          idAluno: idUser
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${TOKEN}`
                          }
                        }
                      );

                      await Linking.openURL(
                        item.link || "https://teams.microsoft.com/"
                      );

                    } catch (error) {

                      console.log("Erro ao registrar presença", error);
                    }
                  }}
                >
                  <Text style={styles.textBotao}>
                    Entrar na Aula
                  </Text>
                </Pressable>

              </View>

            </View>
          ))
        ) : (
          selectedDate && (
            <Text style={styles.vazio}>
              Nenhuma monitoria nesse dia
            </Text>
          )
        )}
      </ScrollView>
      </View>

      <NavBar navigation={navigation} />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#770B1C',
  },

  header: {
    backgroundColor: '#770B1C',
    padding: 20,
    alignItems: 'center',
  },

  conteudo: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -6,
    paddingHorizontal: 10,
    paddingTop: 18,
    paddingBottom: 10,
  },

  tituloHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  subtitulo: {
    marginTop: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  horario: {
    fontSize: 12,
    color: '#666',
  },

  botao: {
    backgroundColor: '#770B1C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  textBotao: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  vazio: {
    marginTop: 10,
    textAlign: 'center',
    color: '#777',
  },
  cardContent: {
    width: '100%',
  },

  topInfo: {
    marginBottom: 10,
  },

  monitoriaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#770B1C',
  },

  aulaTitulo: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },

  descricao: {
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },

  value: {
    color: '#444',
  },

  botao: {
    backgroundColor: '#770B1C',
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  textBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
