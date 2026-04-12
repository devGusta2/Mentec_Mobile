import React from "react";
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AvatarModal({ visible, onClose, avatar, defaultAvatar, onChangePhoto }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>

          {/* Fechar modal */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={30} color="#800010" />
          </TouchableOpacity>

          {/* Foto ampliada */}
          <Image
            source={avatar ? { uri: avatar } : defaultAvatar}
            style={styles.bigAvatar}
          />

          {/* Botão trocar foto */}
          <TouchableOpacity style={styles.button} onPress={onChangePhoto}>
            <Text style={styles.buttonText}>Alterar foto</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
  bigAvatar: {
    width: 180,
    height: 180,
    borderRadius: 200,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#800010",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
