import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";
import { ActivityIndicator } from "react-native";
export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalCodigoVisible, setModalCodigoVisible] = useState(false);
  const [modalSenhaVisible, setModalSenhaVisible] = useState(false);

  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const handleRecuperar = async () => {
    if (!email) {
      alert("Digite seu e-mail");
      return;
    }

    setLoading(true); // Inicia loading
    try {
      await axios.post(`${API_URL}/email/esqueciMinhaSenha`, { email });
      setModalCodigoVisible(true);
    } catch (e) {
      alert("Erro ao enviar código: " + (e.message || ""));
    } finally {
      setLoading(false); // Para loading
    }
  };

  const handleCodigoSubmit = async () => {
    if (!codigo) {
      alert("Digite o código recebido por email");
      return;
    }
    // Aqui você poderia validar o código no backend, mas vamos abrir o modal de senha
    setModalCodigoVisible(false);
    setModalSenhaVisible(true);
  };

  const handleAtualizarSenha = async () => {
    if (!novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      alert("Senhas não coincidem");
      return;
    }

    try {
      await axios.post(`${API_URL}/email/redefinirSenha`, {
        email,
        codigo: parseInt(codigo, 10),
        novaSenha
      });
      alert("Senha atualizada com sucesso!");
      setModalSenhaVisible(false);
      setEmail("");
      setCodigo("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (e) {
      alert("Erro ao atualizar senha: " + (e.message || ""));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Mentec</Text>
        <Text style={styles.titulo}>Recuperar senha</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.texto}>
          Para recuperar sua senha, confirme o seu e-mail no campo abaixo.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
          <Text style={styles.buttonText}>Enviar Código</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para digitar código */}
      <Modal visible={modalCodigoVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Digite o código recebido por email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Código"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleCodigoSubmit}>
              <Text style={styles.buttonText}>Confirmar Código</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={loading} transparent animationType="fade">
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)"
        }}>
          <View style={{
            backgroundColor: "#fff",
            padding: 30,
            borderRadius: 20,
            alignItems: "center"
          }}>
            <ActivityIndicator size="large" color="#800010" />
            <Text style={{ marginTop: 10, color: "#800010", fontWeight: "bold" }}>Carregando...</Text>
          </View>
        </View>
      </Modal>

      {/* Modal para digitar nova senha */}
      <Modal visible={modalSenhaVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Nova senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nova senha"
              secureTextEntry
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <Text style={styles.label}>Confirmar senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity style={styles.button} onPress={handleAtualizarSenha}>
              <Text style={styles.buttonText}>Atualizar Senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EAEAEA" },
  header: { backgroundColor: "#800010", paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  logo: { color: "#fff", alignSelf: "flex-end", fontSize: 16 },
  titulo: { color: "#fff", fontSize: 26, fontWeight: "bold", textAlign: "center", marginTop: 20 },
  content: { padding: 25 },
  texto: { textAlign: "center", fontSize: 16, marginBottom: 15, color: "#333" },
  label: { marginTop: 20, marginBottom: 5, color: "#800010", fontWeight: "bold" },
  input: { backgroundColor: "#fff", borderWidth: 1.5, borderColor: "#800010", borderRadius: 15, padding: 15, marginBottom: 10 },
  button: { marginTop: 20, backgroundColor: "#A6192E", padding: 18, borderRadius: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "85%", backgroundColor: "#fff", borderRadius: 20, padding: 20 },
});