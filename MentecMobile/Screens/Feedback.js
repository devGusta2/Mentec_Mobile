import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import NavBar from '../components/Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const perguntas = [
  'A monitoria atendeu suas necessidades?',
  'O monitor explicou o conteúdo de forma clara?',
  'O monitor demonstrou domínio do conteúdo?',
  'Você conseguiu tirar todas as suas dúvidas?',
  'O tempo da monitoria foi suficiente?',
  'Como você avalia o atendimento/acolhimento do monitor?',
  'A monitoria ajudou a melhorar seu entendimento da disciplina?',
  'Como você avalia sua satisfação geral com a monitoria?',
  'Você recomendaria esta monitoria para outros alunos?',
  'O Aplicativo Mentec atendeu às suas expectativas?',
  'Como você avalia sua satisfação geral com o Aplicativo Mentec?',
  'Como você avalia sua satisfação sobre a navegação no Aplicativo Mentec?',
];

const opcoes = ['Satisfeito', 'Neutro', 'Insatisfeito'];

const notaPorResposta = {
  Satisfeito: 3,
  Neutro: 2,
  Insatisfeito: 1,
};

export default function Feedback({ route }) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { id } = route.params;

  const [answers, setAnswers] = useState({});
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);

  const respostas = useMemo(
    () =>
      perguntas.map((pergunta, index) => ({
        pergunta,
        resposta: answers[`q${index + 1}`] || '',
      })),
    [answers]
  );

  const todasRespondidas = respostas.every((item) => item.resposta);

  function selecionarResposta(questionKey, resposta) {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: resposta,
    }));
  }

  function calcularNota() {
    if (!todasRespondidas) {
      return 0;
    }

    const total = respostas.reduce(
      (acc, item) => acc + notaPorResposta[item.resposta],
      0
    );

    return Math.round(total / respostas.length);
  }

  const renderOptions = (questionKey) =>
    opcoes.map((item) => (
      <TouchableOpacity
        key={item}
        style={styles.optionRow}
        onPress={() => selecionarResposta(questionKey, item)}
      >
        <View style={styles.radioCircle}>
          {answers[questionKey] === item && <View style={styles.selectedCircle} />}
        </View>

        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    ));

  async function enviarFeedback() {
    if (!todasRespondidas) {
      Alert.alert('Feedback incompleto', 'Responda todas as perguntas antes de enviar.');
      return;
    }

    const TOKEN = await AsyncStorage.getItem('@mentec_token');
    const idUser = await AsyncStorage.getItem('@mentec_userid');

    const feedbackDTO = {
      monitoriaId: id,
      nota: calcularNota(),
      comentario,
      idAluno: idUser,
      respostas,
    };

    try {
      setEnviando(true);

      await axios.post(`${API_URL}/feedback/enviar`, feedbackDTO, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      Alert.alert('Sucesso', 'Feedback enviado com sucesso!');
    } catch (error) {
      console.log(error);

      if (error.response?.status === 409) {
        Alert.alert('Feedback já enviado', 'Você já respondeu o feedback desta monitoria.');
        return;
      }

      Alert.alert('Erro', 'Erro ao enviar feedback.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mentec</Text>
          <Text style={styles.title}>Feedback</Text>
        </View>

        <View style={styles.mainContainer}>
          <Text style={styles.subtitle}>Avaliação da monitoria</Text>

          {perguntas.map((pergunta, index) => {
            const questionKey = `q${index + 1}`;

            return (
              <View key={questionKey} style={styles.questionBlock}>
                <Text style={styles.question}>
                  {index + 1}. {pergunta}
                </Text>

                {renderOptions(questionKey)}
              </View>
            );
          })}

          <Text style={styles.question}>Comentário ou sugestão</Text>

          <TextInput
            style={styles.input}
            placeholder="Escreva aqui..."
            placeholderTextColor="#777"
            multiline
            value={comentario}
            onChangeText={setComentario}
          />

          <TouchableOpacity
            style={[styles.button, enviando && styles.buttonDisabled]}
            onPress={enviarFeedback}
            disabled={enviando}
          >
            <FontAwesome name="send" size={18} color="#fff" />

            <Text style={styles.buttonText}>
              {enviando ? 'Enviando...' : 'Enviar feedback'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99061F',
  },

  scrollContainer: {
    paddingBottom: 120,
  },

  header: {
    width: '100%',
    height: 180,
    backgroundColor: '#99061F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },

  headerTitle: {
    position: 'absolute',
    top: 45,
    right: 20,
    color: '#fff',
    fontSize: 16,
  },

  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },

  mainContainer: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    marginTop: -20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 40,
  },

  subtitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 24,
  },

  questionBlock: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  question: {
    fontSize: 17,
    color: '#333',
    marginBottom: 12,
    marginTop: 4,
    fontWeight: '600',
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 4,
  },

  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#99061F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  selectedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#99061F',
  },

  optionText: {
    fontSize: 16,
    color: '#444',
  },

  input: {
    width: '100%',
    minHeight: 120,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15,
    marginTop: 4,
    textAlignVertical: 'top',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCC',
  },

  button: {
    width: '100%',
    height: 58,
    backgroundColor: '#99061F',
    borderRadius: 12,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
