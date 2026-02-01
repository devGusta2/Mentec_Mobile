import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import msIcon from '../assets/microsoft.png';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [repeteSenha, setRepeteSenha] = useState('');

  const [erros, setErros] = useState({});

  const handleCadastro = () => {
    let novosErros = {};

    if (!nome.trim()) novosErros.nome = 'Preencha o nome.';
    if (!sobrenome.trim()) novosErros.sobrenome = 'Preencha o sobrenome.';
    if (!email.trim()) novosErros.email = 'Preencha o e-mail.';
    if (!cpf.trim()) novosErros.cpf = 'Preencha o CPF.';
    if (!senha.trim()) novosErros.senha = 'Preencha a senha.';
    if (!repeteSenha.trim()) novosErros.repeteSenha = 'Repita a senha.';
    if (senha && repeteSenha && senha !== repeteSenha) {
      novosErros.repeteSenha = 'As senhas não coincidem.';
    }
    if (senha && senha.length < 8) {
      novosErros.senha = 'A senha deve ter pelo menos 8 caracteres.';
    }

    // Verificação se as senhas coincidem
    if (senha && repeteSenha && senha !== repeteSenha) {
      novosErros.repeteSenha = 'As senhas não coincidem.';
    }

    // Validação de email (simples: contém @ e .)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novosErros.email = 'Digite um e-mail válido.';
    }
    setErros(novosErros);

    
    if (Object.keys(novosErros).length === 0) {
      const payload = {
        nome,
        sobrenome,
        email,
        senha,
        cpf
      };
      navigation.navigate("VerifyCode", { data: payload });
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.title_box}>
        <Text style={styles.title}>Preencha os dados para criar sua conta!</Text>
      </View>

      <View style={styles.inpts_box}>
        <View style={styles.inpt_field}>
          <TextInput
            placeholder="Nome:"
            placeholderTextColor="white"
            style={styles.inpt_text}
            value={nome}
            onChangeText={setNome}
          />
          {erros.nome && <Text style={styles.errorText}>{erros.nome}</Text>}
        </View>
        <View style={styles.inpt_field}>
          <TextInput
            placeholder="Sobrenome:"
            placeholderTextColor="white"
            style={styles.inpt_text}
            value={sobrenome}
            onChangeText={setSobrenome}
          />
          {erros.sobrenome && <Text style={styles.errorText}>{erros.sobrenome}</Text>}
        </View>

        <View style={styles.inpt_field}>
          <TextInput
            placeholder="Digite seu e-mail:"
            placeholderTextColor="white"
            style={styles.inpt_text}
            value={email}
            onChangeText={setEmail}
          />
          {erros.email && <Text style={styles.errorText}>{erros.email}</Text>}
        </View>

        <View style={styles.inpt_field}>
          <TextInput
            placeholder="Digite seu Cpf:"
            placeholderTextColor="white"
            style={styles.inpt_text}
            value={cpf}
            onChangeText={setCpf}
          />
          {erros.cpf && <Text style={styles.errorText}>{erros.cpf}</Text>}
        </View>

        <View style={styles.inpt_field}>
          <TextInput
            placeholder="Digite sua senha:"
            placeholderTextColor="white"
            style={styles.inpt_text}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          {erros.senha && <Text style={styles.errorText}>{erros.senha}</Text>}
        </View>

        <View style={styles.inpt_field}>
          <TextInput
            placeholder="Confirme sua senha:"
            placeholderTextColor="white"
            style={styles.inpt_text}
            secureTextEntry
            value={repeteSenha}
            onChangeText={setRepeteSenha}
          />
          {erros.repeteSenha && <Text style={styles.errorText}>{erros.repeteSenha}</Text>}
        </View>
      </View>

      <View style={styles.btn_box}>
        <TouchableOpacity style={styles.btn_cadastro} onPress={handleCadastro}>
          <Text style={styles.btn_text}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={{ color: 'white' }}>Ou</Text>

        <TouchableOpacity style={styles.btn_cad_microsoft}>
          <Image style={styles.ms_icon} source={msIcon} />
          <Text>Cadastrar-se com Microsoft</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#770B1C",
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  title_box: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  title: {
    color: 'white',
    fontSize: 30,
    textAlign: 'left',
  },
  inpts_box: {
    height: '50%',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btn_box: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15
  },
  btn_cadastro: {
    height: '25%',
    width: '80%',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  btn_cad_microsoft: {
    height: '25%',
    width: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 30
  },
  btn_text: {
    color: 'white'
  },
  ms_icon: {
    height: 25,
    width: 25
  },
  inpt_field: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  inpt_text: {
    borderBottomWidth: 3,
    borderColor: 'white',
    height: '50%',
    width: '90%',
    color: 'white'
  },
  errorText: {
    color: '#ffaaaa',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: 5,
  },
});
