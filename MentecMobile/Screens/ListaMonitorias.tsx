import { View, Text, ScrollView, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NavBar from '../components/Navbar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {
  CATEGORIAS,
  adicionarAoHistorico,
  mostrarAlerta,
  mostrarAlertaSempre,
} from '../Utils/notificacoes';
import { getApiUrl } from '../Utils/AuthRequestProvider';


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
  const API_URL = getApiUrl();

  const [data, setData] = useState<Monitoria[]>([]); 
  const [pesquisa, setPesquisa] = useState('');

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

  const monitoriasFiltradas = data.filter((monitoria) => {
    const termo = pesquisa.trim().toLowerCase();

    if (!termo) {
      return true;
    }

    const conteudoPesquisavel = [
      monitoria.titulo,
      monitoria.descricao,
      monitoria.monitor?.nome,
      monitoria.monitor?.sobrenome,
      monitoria.monitor?.especialidades,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return conteudoPesquisavel.includes(termo);
  });

  return (
    <View style={styles.tela}>
      <StatusBar style="light" />

   
      <View style={[styles.faixaTopo, { paddingTop: insets.top }]}>
        <Text style={styles.logoMentec}>Mentec</Text>
      </View>

 
      <View style={styles.buscaEnv}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#000" />

          <TextInput
            placeholder="Pesquisar monitoria..."
            style={styles.searchInput}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
        </View>
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

        {monitoriasFiltradas.length === 0 ? (
          <Text style={styles.semResultados}>
            Nenhuma monitoria encontrada
          </Text>
        ) : monitoriasFiltradas.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.containerInfo}>
              <Text style={styles.titulo}>{item.titulo}</Text>

              {/* <Text style={styles.descricao}>{item.descricao}</Text> */}

        
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
    paddingBottom: 14,
    minHeight: 64,
    alignItems: 'flex-end',
    justifyContent: 'center',
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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#6b0f1a',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  semResultados: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    elevation: 3,
  },

  containerInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },

  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#101010',
  },

  descricao: {
    fontSize: 13,
    color: '#1f1f1f',
    marginVertical: 4,
  },

  data: {
    fontSize: 12,
    color: '#202020',
  },

  botao: {
    marginTop: 8,
    backgroundColor: '#770B1C',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  imagem: {
    width: 100,
    height: '100%',
  },
});
