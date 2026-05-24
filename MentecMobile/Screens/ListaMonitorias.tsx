import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Pesquisar from '../components/Pesquisa';
import NavBar from '../components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CATEGORIAS,
  adicionarAoHistorico,
  mostrarAlerta,
  mostrarAlertaSempre,
} from '../Utils/notificacoes';


type Monitor = {
  nome: string;
  sobrenome: string;
  especialidades: string;
};

type Monitoria = {
  id: number;
  titulo: string;
  descricao: string;
  horario: string;
  data: string;
  monitor: Monitor;
};

export default function ListaMonitorias() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [data, setData] = useState<Monitoria[]>([]); 

  const insets = useSafeAreaInsets();
  const paddingBottomLista = insets.bottom + 120;

  const matricular = async (monitoriaId: number) => {
    try {
    
      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const idUser = await AsyncStorage.getItem('@mentec_userid');

      const payload = {
        idAluno: idUser,
        monitoriaId: monitoriaId,
      };

      await axios.post(`${API_URL}/agendamentos/agendar`, payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      await adicionarAoHistorico('Monitoria agendada', 'Agendamento confirmado');
 mostrarAlertaSempre(
  'Sucesso',
  'Agendamento efetuado com sucesso!'
);
    } catch (e: any) {
      console.log(e);
      mostrarAlertaSempre(
        'Erro',
        'Erro ao agendar: ' + (e?.response?.data?.message || '')
      );
    }
  };


  const fetchMonitorias = async () => {
    try {
      const TOKEN = await AsyncStorage.getItem('@mentec_token');

      const response = await axios.get<Monitoria[]>(
        `${API_URL}/monitorias/listar`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      setData(response.data);
    } catch (e) {
      console.log(e);
      mostrarAlertaSempre('Erro', 'Erro ao buscar monitorias!');
    }
  };

  useEffect(() => {
    fetchMonitorias();
  }, []);

  return (
    <View style={styles.tela}>
      <StatusBar style="light" />

   
      <View style={[styles.faixaTopo, { paddingTop: insets.top }]}>
        <Text style={styles.logoMentec}>Mentec</Text>
      </View>

 
      <View style={styles.buscaEnv}>
        <Pesquisar />
      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: paddingBottomLista },
        ]}
      >
        <Text style={styles.secaoTitulo}>
          Monitorias que podem lhe interessar:
        </Text>

        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.containerInfo}>
              <Text style={styles.titulo}>{item.titulo}</Text>

              <Text style={styles.descricao}>{item.descricao}</Text>

        
              <Text style={styles.descricao}>
                Monitor: {item.monitor?.nome} {item.monitor?.sobrenome}
              </Text>

              <Text style={styles.descricao}>
                Especialidade: {item.monitor?.especialidades}
              </Text>

              <Text style={styles.descricao}>
                Horário: {item.horario}
              </Text>

              <Text style={styles.data}>
                Data: {item.data}
              </Text>

              <Pressable
                style={styles.botao}
                onPress={() => matricular(item.id)}
              >
                <Text style={styles.textoBotao}>Agendar</Text>
              </Pressable>
            </View>

            <Image
              source={require('../assets/monitoria1.jpg')}
              style={styles.imagem}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },

  faixaTopo: {
    backgroundColor: '#770B1C',
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignItems: 'flex-end',
  },

  logoMentec: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  buscaEnv: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },

  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
  },

  containerInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },

  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  descricao: {
    fontSize: 13,
    color: '#555',
    marginVertical: 6,
  },

  data: {
    fontSize: 12,
    color: '#777',
  },

  botao: {
    marginTop: 10,
    backgroundColor: '#770B1C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },

  imagem: {
    width: 120,
    height: '100%',
  },
});