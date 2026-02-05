import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import msIcon from '../assets/microsoft.png';

import { login } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  const handleLogin = async () => {
    let temErro = false;

    if (email.trim() === '') {
      setErroEmail('Por favor, preencha o e-mail.');
      temErro = true;
    } else {
      setErroEmail('');
    }

    if (senha.trim() === '') {
      setErroSenha('Por favor, preencha a senha.');
      temErro = true;
    } else {
      setErroSenha('');
    }

    const credentials = {
      email: email,
      senha: senha
    }

    if (!temErro) {
      const result = await login(credentials);

      if (!result) {
        alert("Email ou senha inválidos");
      }
    }
  };

  const handleMicrosoftLogin = () => {
    console.log('Entrar com Microsoft');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre na sua conta!</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#ddd"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {erroEmail !== '' && <Text style={styles.errorText}>{erroEmail}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ddd"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {erroSenha !== '' && <Text style={styles.errorText}>{erroSenha}</Text>}

      <TouchableOpacity>
        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.microsoftButton}
        onPress={handleMicrosoftLogin}
      >
        <Image style={{ height: 25, width: 25 }} source={msIcon} />
        <Text style={styles.microsoftText}>Entrar com Microsoft</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7a0019',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    paddingVertical: 8,
  },
  forgot: {
    color: '#fff',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    backgroundColor: '#a00026',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  microsoftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
  },
  microsoftText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
  errorText: {
    color: '#ffaaaa',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
