// Importação de hooks do React
import React, { useState, useContext } from 'react';

// Importação de componentes do React Native
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

// Componente de seleção (dropdown)
import { Picker } from '@react-native-picker/picker';
// Componentes e serviços externos
import NavBar from '../components/Navbar';
import axios from 'axios';

// Contexto de autenticação (dados do usuário logado)
import { AuthContext } from '../contexts/AuthContext';

// Componente principal da tela SAC
export default function SAC({ navigation }) {

  // Pegando dados do usuário logado
  const { user } = useContext(AuthContext);

  // Estados da tela
  const [tipo, setTipo] = useState('OUTROS'); // Tipo da sugestão
  const [descricao, setDescricao] = useState(''); // Texto digitado pelo usuário
  const [loading, setLoading] = useState(false); // Controle de carregamento

  // URL da API (definida no .env)
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  // Função chamada ao clicar no botão "Enviar"
  const handleEnviar = async () => {

    // Validação: impede envio vazio
    if (!descricao.trim()) {
      Alert.alert("Erro", "Por favor, descreva sua sugestão.");
      return;
    }

    setLoading(true); // Ativa loading

    try {
      // Dados que serão enviados para o backend
      const payload = {
        tipo: tipo,
        descricao: descricao,
        usuarioId: user.id || 1 // fallback caso não exista
      };

      // Requisição POST para API
      await axios.post(`${API_URL}/sac`, payload, {
        headers: { Authorization: `Bearer ${user.token}` } // autenticação
      });

      // Feedback de sucesso
      Alert.alert("Sucesso", "Sua mensagem foi enviada ao gestor com sucesso!");

      // Reset dos campos
      setDescricao('');
      setTipo('OUTROS');

    } catch (error) {
      // Tratamento de erro
      console.error("Erro ao enviar SAC:", error);
      Alert.alert("Erro", "Não foi possível enviar sua mensagem.");

    } finally {
      // Sempre executa (erro ou sucesso)
      setLoading(false);
    }
  };

  return (

      <View style={styles.containerTela}>

        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <Text style={styles.mentecText}>Mentec</Text>
          <Text style={styles.sacTitle}>SAC</Text>
        </View>

        {/* ================= CONTEÚDO PRINCIPAL ================= */}
        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Nome da instituição */}
            <Text style={styles.fatecTitle}>
              Fatec{"\n"}Ferraz de Vasconcelos
            </Text>

            {/* ===== CARD DE CONTATO ===== */}
            <View style={styles.contactCard}>
              <Text style={styles.contactTitle}>Informações para contato:</Text>
              
              <Text style={styles.contactItem}>
                <Text style={styles.bold}>E-mail:</Text> f292ti@cps.sp.gov.br
              </Text>
              
              <Text style={styles.contactItem}>
                <Text style={styles.bold}>Telefone:</Text> (11) 4674 – 2594
              </Text>
              
              <Text style={styles.contactItem}>
                <Text style={styles.bold}>Endereço:</Text> Rua Carlos de Carvalho, 200...
              </Text>
            </View>

            {/* ===== FORMULÁRIO DE SUGESTÃO ===== */}
            <View style={styles.suggestionSection}>
              <Text style={styles.suggestionTitle}>Deixe sua sugestão</Text>
              
              {/* Seleção do tipo de sugestão */}
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
                    <Picker.Item label="Matéria" value="MATERIA" />
                    <Picker.Item label="Conteúdo" value="CONTEUDO" />
                    <Picker.Item label="Reclamações" value="RECLAMACAO" />
                    <Picker.Item label="Outros" value="OUTROS" />
                  </Picker>
                </View>
              </View>

              {/* Campo de texto da descrição */}
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

              {/* Botão de envio */}
              <TouchableOpacity 
                style={styles.btnEnviar} 
                onPress={handleEnviar}
                disabled={loading} // evita múltiplos cliques
              >
                {loading ? (
                  // Mostra loading enquanto envia
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text style={styles.btnText}>Enviar</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* ===== NAVBAR INFERIOR ===== */}
        <NavBar navigation={navigation} />
      </View>
  );
}

// ================= ESTILOS =================
const styles = StyleSheet.create({
  // Área segura do app (evita notch/status bar)
  safeArea: {
    flex: 1,
    backgroundColor: '#770B1C',
  },

  containerTela: {
    flex: 1,
    backgroundColor: '#770B1C',
  },

  // Cabeçalho superior
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

  // Área principal (conteúdo)
  mainContent: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingBottom: 120,
    alignItems: 'center',
  },

  // Título da instituição
  fatecTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    color: '#000',
  },

  // Card de contato
  contactCard: {
    backgroundColor: '#E0E0E0',
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
  },

  contactItem: {
    fontSize: 16,
    marginBottom: 10,
  },

  bold: {
    fontWeight: 'bold',
  },

  // Formulário
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

  // Campo de texto
  textArea: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#AAA',
    padding: 10,
    height: 100,
    marginBottom: 15,
  },

  // Botão
  btnEnviar: {
    backgroundColor: '#770B1C',
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 5,
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});