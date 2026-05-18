import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/header';
import NavBar from '../components/Navbar';
import { UserContext } from '../contexts/UserContext';

export default function ConfigConta() {
  const navigation = useNavigation();
  const { nome, telefone, email, salvarDados, loadDados } = useContext(UserContext);

  const [nomeInput, setNomeInput] = useState('');
  const [telefoneInput, setTelefoneInput] = useState('');

  useEffect(() => {
    loadDados();
  }, [loadDados]);

  useEffect(() => {
    setNomeInput(nome);
    setTelefoneInput(telefone);
  }, [nome, telefone]);

  const handleSalvar = () => {
    if (!nomeInput || !telefoneInput) {
      alert('Preencha todos os campos');
      return;
    }

    salvarDados(nomeInput, telefoneInput);
    alert('Dados salvos com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Configuração de Conta" />

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={nomeInput}
          onChangeText={setNomeInput}
          placeholder="Digite seu nome"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={telefoneInput}
          onChangeText={setTelefoneInput}
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={email}
          editable={false}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('RecuperarSenha')}
        >
          <Text style={styles.buttonText}>Restaurar senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar alterações</Text>
        </TouchableOpacity>
      </ScrollView>

      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  form: {
    padding: 20,
    paddingBottom: 100,
  },
  label: {
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  inputDisabled: {
    backgroundColor: '#ddd',
    color: '#666',
  },
  button: {
    marginTop: 25,
    backgroundColor: '#770B1C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
