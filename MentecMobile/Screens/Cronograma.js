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

export default function Cronograma({ navigation }) {

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const TOKEN = "eyJhbGciOiJSUzI1NiJ9.eyJpZFVzZXIiOiI2ZmFhYTRlMi02Y…xIZn3qUkpD6jITBfYmaOnSqocclwWR37SPyrpTwBk-RAkRmSg";

  // const getToken = async () => {
  //   return await AsyncStorage.getItem('@mentec_token');
  // }
  // const TOKEN = getToken();
  

  const [selectedDate, setSelectedDate] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  // Buscar agendamentos
  const fetchAgendamentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/agendamentos/listar`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      return response.data;
    } catch (e) {
      console.log("Erro agendamentos", e);
      return [];
    }
  };

  // Buscar monitorias
  const fetchMonitorias = async () => {
    try {
      const response = await axios.get(`${API_URL}/monitorias/listar`, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      return response.data;
    } catch (e) {
      console.log("Erro monitorias", e);
      return [];
    }
  };

  // Carregar e juntar os dados
  useEffect(() => {
    const carregarDados = async () => {
      const agendamentosData = await fetchAgendamentos();
      const monitoriasData = await fetchMonitorias();

      const combinado = agendamentosData.map((agendamento) => {
        const monitoria = monitoriasData.find(
          (m) => m.id === agendamento.monitoriaId
        );

        return {
          id: agendamento.id,
          data: agendamento.dataAgendamento.split("T")[0],
          monitoria: {
            titulo: monitoria?.titulo || "Monitoria",
            horario: monitoria?.horario || "--:--",
            link: monitoria?.link || "https://teams.microsoft.com/"
          }
        };
      });

      setAgendamentos(combinado);
    };

    carregarDados();
  }, []);

  // Marcação dos dias no calendário
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

  // Filtrar os eventos
  const eventosDoDia = agendamentos.filter(
    (a) => a.data === selectedDate
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Cronograma</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* CALENDÁRIO */}
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
        />

        {/* LISTA */}
        {selectedDate && (
          <Text style={styles.subtitulo}>
            Monitorias do dia {selectedDate}
          </Text>
        )}

        {eventosDoDia.length > 0 ? (
          eventosDoDia.map((item) => (
            <View key={item.id} style={styles.card}>

              <View>
                <Text style={styles.titulo}>
                  {item.monitoria.titulo}
                </Text>
                <Text style={styles.horario}>
                  {item.monitoria.horario}
                </Text>
              </View>

              <Pressable
                style={styles.botao}
                onPress={() =>
                  Linking.openURL(item.monitoria.link)
                }
              >
                <Text style={styles.textBotao}>Entrar</Text>
              </Pressable>

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
  },

  vazio: {
    marginTop: 10,
    textAlign: 'center',
    color: '#777',
  },
});