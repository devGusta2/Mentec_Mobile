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

export default function Cronograma({ navigation }) {

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

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

              <View>
                <Text style={styles.titulo}>
                  {item.titulo}
                </Text>
                <Text style={styles.horario}>
                  {item.horario}
                </Text>
              </View>

              <Pressable
                style={styles.botao}
                onPress={() =>
                  Linking.openURL(item.link || "https://teams.microsoft.com/")
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
    fontWeight: 'bold',
  },

  vazio: {
    marginTop: 10,
    textAlign: 'center',
    color: '#777',
  },
});