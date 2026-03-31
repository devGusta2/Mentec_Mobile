import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import NavBar from '../components/Navbar';

export default function Feedback() {

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
        onPress={() =>
          setAnswers(prev => ({ ...prev, [questionKey]: item }))
        }
      >
        <View style={styles.radioCircle}>
          {answers[questionKey] === item && <View style={styles.selectedCircle} />}
        </View>
        <Text style={styles.optionText}>{item}</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      
      <ScrollView 
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        <View style={styles.header}>
          <Text style={styles.title}>Feedback</Text>
        </View>

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

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log(answers);
              alert("Feedback enviado com sucesso!");
            }}
          >
            <FontAwesome name="send" size={20} color="white" />
            <Text style={styles.buttonText}>Enviar Feedback</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Navbar corrigida */}
      <NavBar />

    </View>
  );
}