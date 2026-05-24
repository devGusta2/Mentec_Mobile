import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import NavBar from '../components/Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../services/api';

export default function Feedback({ route }) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const { id } = route.params;

  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const [comentario, setComentario] = useState('');
  const [nota, setNota] = useState(0);

  const options = {
    q1: ['Muito fácil', 'Fácil', 'Médio', 'Difícil', 'Muito difícil'],
    q2: ['Muito fácil', 'Fácil', 'Razoável', 'Confuso', 'Muito confuso'],
    q3: ['Excelente', 'Boa', 'Regular', 'Ruim', 'Muito ruim'],
    q4: ['Sim', 'Talvez', 'Não'],
    q5: ['Sim', 'Não'],
  };

  const renderOptions = (questionKey) =>
    options[questionKey].map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.optionRow}
        onPress={() => {

          setAnswers((prev) => ({
            ...prev,
            [questionKey]: item,
          }));

          // nota baseada na primeira pergunta
          if (questionKey === 'q1') {
            setNota(5 - index);
          }
        }}
      >
        <View style={styles.radioCircle}>
          {answers[questionKey] === item && (
            <View style={styles.selectedCircle} />
          )}
        </View>

        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    ));

  async function enviarFeedback() {
    const TOKEN = await AsyncStorage.getItem('@mentec_token');
    const idUser = await AsyncStorage.getItem('@mentec_userid');
    const feedbackDTO = {
      monitoriaId: id, // trocar pelo id correto
      nota: nota,
      comentario: comentario,
      idAluno: idUser
    };

    try {

      console.log('DTO enviado:', feedbackDTO);


      await axios.post(
        `${API_URL}/feedback/enviar`,
        feedbackDTO,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );


      alert('Feedback enviado com sucesso!');

    } catch (error) {

      console.log(error);
      alert('Erro ao enviar feedback');
    }
  }

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.headerTitle}>Mentec</Text>

          <Text style={styles.title}>FeedBack</Text>

        </View>

        {/* CARD */}
        <View style={styles.mainContainer}>

          <Text style={styles.subtitle}>Avaliação do App</Text>

          {/* QUESTÃO 1 */}
          <Text style={styles.question}>
            1 - O sistema foi fácil de usar?
          </Text>

          {renderOptions('q1')}

          {/* QUESTÃO 2 */}
          <Text style={styles.question}>
            2 - O fluxo entre as telas é fácil de entender?
          </Text>

          {renderOptions('q2')}

          {/* QUESTÃO 3 */}
          <Text style={styles.question}>
            3 - Como você avalia a experiência geral?
          </Text>

          {renderOptions('q3')}

          {/* QUESTÃO 4 */}
          <Text style={styles.question}>
            4 - Você recomendaria o sistema para outra pessoa?
          </Text>

          {renderOptions('q4')}

          {/* QUESTÃO 5 */}
          <Text style={styles.question}>
            5 - Deseja deixar algum comentário ou sugestão?
          </Text>

          {renderOptions('q5')}

          {/* INPUT COMENTÁRIO */}
          {answers.q5 === 'Sim' && (
            <TextInput
              style={styles.input}
              placeholder="Escreva aqui..."
              placeholderTextColor="#777"
              multiline
              value={comentario}
              onChangeText={setComentario}
            />
          )}

          {/* BOTÃO */}
          <TouchableOpacity
            style={styles.button}
            onPress={enviarFeedback}
          >
            <FontAwesome
              name="send"
              size={18}
              color="#fff"
            />

            <Text style={styles.buttonText}>
              Enviar feedback
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
    paddingHorizontal: 28,
    paddingTop: 35,
    paddingBottom: 40,
  },

  subtitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 30,
  },

  question: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
    marginTop: 10,
    fontWeight: '500',
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 8,
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
    marginTop: 15,
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

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

});