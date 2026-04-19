import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

export default function RecuperarSenha() {

  const [email, setEmail] = useState("loremipsum@fatec.sp.gov.br");

  const handleRecuperar = () => {
    if (!email) {
      alert("Digite seu e-mail");
      return;
    }

    alert("E-mail de recuperação enviado!");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Mentec</Text>
        <Text style={styles.titulo}>Recuperar senha</Text>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>

        <Text style={styles.texto}>
          Para recuperar sua senha, confirme o seu e-mail no campo abaixo.
        </Text>

        <Text style={styles.texto}>
          Você receberá um e-mail para realizar a alteração.
        </Text>

        {/* INPUT */}
        <Text style={styles.label}>e-mail:</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* BOTÃO */}
        <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },

  /* HEADER */
  header: {
    backgroundColor: "#800010",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  logo: {
    color: "#fff",
    alignSelf: "flex-end",
    fontSize: 16,
  },

  titulo: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },

  /* CONTEÚDO */
  content: {
    padding: 25,
  },

  texto: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },

  label: {
    marginTop: 20,
    marginBottom: 5,
    color: "#800010",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#800010",
    borderRadius: 15,
    padding: 15,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#A6192E",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

});