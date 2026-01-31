import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Feedback({navigation}) {

  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
  });

  const options = {
    q1: ["Muito fácil", "Fácil", "Médio", "Difícil", "Muito difícil"],
    q2: ["Muito fácil", "Fácil", "Razoável", "Confuso", "Muito confuso"],
    q3: ["Excelente", "Boa", "Regular", "Ruim", "Muito ruim"],
    q4: ["Sim", "Talvez", "Não"],
    q5: ["Sim", "Não"],
  };

  const renderOptions = (questionKey) =>
    options[questionKey].map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.optionRow}
        onPress={() => setAnswers({ ...answers, [questionKey]: item })}
      >
        <View style={styles.radioCircle}>
          {answers[questionKey] === item && <View style={styles.selectedCircle} />}
        </View>
        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      
      {/* Scroll só do conteúdo */}
      <ScrollView 
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 120 }} // evita sobrepor navbar
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Feedback</Text>
        </View>

        {/* Conteúdo */}
        <View style={styles.mainContainer}>
          <Text style={styles.subtitle}>Avaliação do App</Text>

          <Text style={styles.question}>1. O sistema foi fácil de usar?</Text>
          {renderOptions("q1")}

          <Text style={styles.question}>2. O fluxo entre as telas é fácil de entender?</Text>
          {renderOptions("q2")}

          <Text style={styles.question}>3. Como você avalia a experiência geral?</Text>
          {renderOptions("q3")}

          <Text style={styles.question}>4. Você recomendaria o sistema para outra pessoa?</Text>
          {renderOptions("q4")}

          <Text style={styles.question}>5. Deseja deixar algum comentário ou sugestão?</Text>
          {renderOptions("q5")}

          {answers.q5 === "Sim" && (
            <TextInput
              style={styles.input}
              placeholder="Escreva aqui..."
              placeholderTextColor="#777"
              multiline
              numberOfLines={5}
            />
          )}

          <TouchableOpacity style={styles.button}>
            <FontAwesome name="send" size={20} color="white" />
            <Text style={styles.buttonText}>Enviar Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navbar fixa */}
 <Navbar navigation={navigation} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#770B1C',
    width: "100%",
  },
  header: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'whitesmoke',
    fontSize: 28,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  question: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 5,
  },
  optionText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#770B1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    width: 10,
    height: 10,
    backgroundColor: '#770B1C',
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textAlignVertical: 'top',
    color: '#333',
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#770B1C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 25,
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
