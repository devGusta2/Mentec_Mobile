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


  //   [
  //     {
  //         "aulaId": 9,
  //         "tituloMonitoria": "Estatistica aplicada",
  //         "tituloAula": "123",
  //         "descricaoAula": "123",
  //         "data": "2026-12-12",
  //         "inicio": "12:00",
  //         "fim": "17:00",
  //         "link": "2312312"
  //     },
  //     {
  //         "aulaId": 10,
  //         "tituloMonitoria": "Estatistica aplicada",
  //         "tituloAula": "1234",
  //         "descricaoAula": "13414123",
  //         "data": "2026-12-19",
  //         "inicio": "14:00",
  //         "fim": "17:00",
  //         "link": "2312312"
  //     }
  // ]

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Cronograma</Text>
      </View>

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
                  onPress={() =>
                    Linking.openURL(
                      item.link || "https://teams.microsoft.com/"
                    )
                  }
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

      <NavBar navigation={navigation} />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  header: {
    backgroundColor: '#770B1C',
    padding: 20,
    alignItems: 'center',
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