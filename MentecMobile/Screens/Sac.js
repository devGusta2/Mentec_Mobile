import React, { useState, useContext } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NavBar from '../components/Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SAC({ navigation }) {

  const [tipo, setTipo] = useState('OUTROS');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;


  const handleEnviar = async () => {
    if (!descricao.trim()) {
      Alert.alert("Erro", "Por favor, descreva sua sugestão.");
      return;
    }

    setLoading(true);

    try {
      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const idUser = await AsyncStorage.getItem('@mentec_userid');
      const payload = {
        usuarioId: idUser,
        tipo: tipo,
        descricao: descricao,

      };
      console.log("Enviando payload para o backend:", payload);

      await axios.post(`${API_URL}/sac/criar`, payload, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });

      Alert.alert("Sucesso", "Sua mensagem foi enviada ao gestor com sucesso!");
      setDescricao('');
      setTipo('OUTROS');
    } catch (error) {
      console.error("Erro ao enviar SAC:", error);
      Alert.alert("Erro", "Não foi possível enviar sua mensagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.containerTela}>
        {/* Cabeçalho Bordô */}
        <View style={styles.header}>
          <Text style={styles.mentecText}>Mentec</Text>
          <Text style={styles.sacTitle}>SAC</Text>
        </View>

        {/* Conteúdo Principal Branco com Bordas Arredondadas no Topo */}
        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            <Text style={styles.fatecTitle}>Fatec{"\n"}Ferraz de Vasconcelos</Text>

            {/* Card de Informações de Contato */}
            <View style={styles.contactCard}>
              <Text style={styles.contactTitle}>Informações para contato:</Text>
              
              <Text style={styles.contactItem}>
                <Text style={styles.bold}>E-mail:</Text> f292ti@cps.sp.gov.br
              </Text>
              
              <Text style={styles.contactItem}>
                <Text style={styles.bold}>Telefone:</Text> (11) 4674 – 2594
              </Text>
              
              <Text style={styles.contactItem}>
                <Text style={styles.bold}>Endereço:</Text> Rua Carlos de Carvalho, 200 - Jardim Sao Joao, Ferraz de Vasconcelos - SP, 08545-120
              </Text>
            </View>

            {/* Seção de Sugestão */}
            <View style={styles.suggestionSection}>
              <Text style={styles.suggestionTitle}>Deixe sua sugestão</Text>
              
              <View style={styles.pickerRow}>
                <Text style={styles.pickerLabel}>Sugestão para:</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={tipo}
                    onValueChange={(itemValue) => setTipo(itemValue)}
                    style={styles.picker}
                    mode="dropdown"
                  >
                    <Picker.Item label="Monitoria" value="MONITORIA" />
                    <Picker.Item label="Material" value="MATERIAL" />
                    <Picker.Item label="Conteúdo" value="CONTEUDO" />
                    <Picker.Item label="Reclamações" value="RECLAMACAO" />
                    <Picker.Item label="Outros" value="OUTROS" />
                  </Picker>
                </View>
              </View>

              <TextInput
                style={styles.textArea}
                placeholder="Escreva a sua sugestão aqui"
                placeholderTextColor="#CCC"
                multiline={true}
                numberOfLines={4}
                value={descricao}
                onChangeText={setDescricao}
                textAlignVertical="top"
              />

              <TouchableOpacity 
                style={styles.btnEnviar} 
                onPress={handleEnviar}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.btnText}>Enviar</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* NavBar Inferior */}
        <NavBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#770B1C',
  },
  containerTela: {
    flex: 1,
    backgroundColor: '#770B1C',
  },
  header: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  mentecText: {
    position: 'absolute',
    top: 10,
    right: 20,
    color: 'white',
    fontSize: 16,
    opacity: 0.8,
  },
  sacTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#D9D9D9', // Cor de fundo cinza claro conforme imagem
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 120,
    alignItems: 'center',
  },
  fatecTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    color: '#000',
  },
  contactCard: {
    backgroundColor: '#E0E0E0', // Cinza um pouco mais escuro para o card
    width: '100%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  contactItem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  suggestionSection: {
    backgroundColor: '#E0E0E0',
    width: '100%',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    justifyContent: 'center',
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  pickerWrapper: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#AAA',
    width: 150,
    height: 35,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 35,
  },
  textArea: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#AAA',
    padding: 10,
    height: 100,
    fontSize: 14,
    marginBottom: 15,
    color: '#333',
  },
  btnEnviar: {
    backgroundColor: '#770B1C',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
