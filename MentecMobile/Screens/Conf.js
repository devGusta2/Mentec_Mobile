import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NavBar from "../components/Navbar";
import OptionCard from "../components/OptionCard";
import AvatarModal from "../components/AvatarModal";

import defaultAvatar from "../assets/psi.jpg";

const fonteLabels = {
  pequeno: "Pequena",
  medio: "Média",
  grande: "Grande",
};

const fonteEscala = {
  pequeno: 0.9,
  medio: 1,
  grande: 1.18,
};

export default function ProfileScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [configModal, setConfigModal] = useState(null);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [fonte, setFonte] = useState("medio");

  const scaleFont = (size) => Math.round(size * fonteEscala[fonte]);

  const loadAvatar = async () => {
    const avatarSalvo = await AsyncStorage.getItem("@mentec_avatar");
    if (avatarSalvo) {
      setAvatar(avatarSalvo);
    }
  };

  const loadPreferencias = async () => {
    const notificacoes = await AsyncStorage.getItem("@mentec_notificacoes");
    const fonteSalva = await AsyncStorage.getItem("@mentec_fonte");

    if (notificacoes !== null) {
      setNotificacoesAtivas(notificacoes === "true");
    }

    if (fonteSalva) {
      setFonte(fonteSalva);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const avatarUri = result.assets[0].uri;
      await AsyncStorage.setItem("@mentec_avatar", avatarUri);
      setAvatar(avatarUri);
    }
  };

  const toggleNotificacoes = async (value) => {
    setNotificacoesAtivas(value);
    await AsyncStorage.setItem("@mentec_notificacoes", String(value));
  };

  const selecionarFonte = async (value) => {
    setFonte(value);
    await AsyncStorage.setItem("@mentec_fonte", value);
  };

  useEffect(() => {
    loadAvatar();
    loadPreferencias();
  }, []);

  const textSize = {
    name: { fontSize: scaleFont(20) },
    company: { fontSize: scaleFont(14) },
    cardTitle: { fontSize: scaleFont(16) },
    cardSubtitle: { fontSize: scaleFont(13) },
    modalTitle: { fontSize: scaleFont(20) },
    modalText: { fontSize: scaleFont(14), lineHeight: scaleFont(20) },
    settingTitle: { fontSize: scaleFont(16) },
    button: { fontSize: scaleFont(15) },
    fontOption: { fontSize: scaleFont(14) },
  };

  const renderModalContent = () => {
    if (configModal === "conta") {
      return (
        <>
          <Text style={[styles.modalTitle, textSize.modalTitle]}>Conta</Text>
          <Text style={[styles.modalText, textSize.modalText]}>
            Gerencie sua foto de perfil e acompanhe seus dados cadastrados.
          </Text>

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setConfigModal(null);
              setModalVisible(true);
            }}
          >
            <Text style={[styles.modalButtonText, textSize.button]}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, styles.secondaryButton]}
            onPress={() => {
              setConfigModal(null);
              navigation.navigate("Perfil");
            }}
          >
            <Text style={[styles.secondaryButtonText, textSize.button]}>
              Ver perfil
            </Text>
          </TouchableOpacity>
        </>
      );
    }

    if (configModal === "notificacoes") {
      return (
        <>
          <Text style={[styles.modalTitle, textSize.modalTitle]}>
            Notificações
          </Text>
          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, textSize.settingTitle]}>
                Receber notificações
              </Text>
              <Text style={[styles.modalText, textSize.modalText]}>
                Avisos sobre monitorias, agenda e atualizações.
              </Text>
            </View>

            <Switch
              value={notificacoesAtivas}
              onValueChange={toggleNotificacoes}
              trackColor={{ false: "#ddd", true: "#b04a58" }}
              thumbColor={notificacoesAtivas ? "#800010" : "#f4f3f4"}
            />
          </View>
        </>
      );
    }

    if (configModal === "fonte") {
      return (
        <>
          <Text style={[styles.modalTitle, textSize.modalTitle]}>Fonte</Text>
          <Text style={[styles.modalText, textSize.modalText]}>
            Escolha o tamanho de fonte preferido para a interface.
          </Text>

          <View style={styles.fontOptions}>
            {Object.entries(fonteLabels).map(([value, label]) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.fontButton,
                  fonte === value && styles.fontButtonSelected,
                ]}
                onPress={() => selecionarFonte(value)}
              >
                <Text
                  style={[
                    styles.fontButtonText,
                    textSize.fontOption,
                    fonte === value && styles.fontButtonTextSelected,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={avatar ? { uri: avatar } : defaultAvatar}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View>
          <Text style={[styles.name, textSize.name]}>Paulo Henrique</Text>
          <Text style={[styles.company, textSize.company]}>Mentec</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <OptionCard
          icon={<Ionicons name="settings-sharp" size={28} color="#800010" />}
          title="Conta"
          subtitle="Alteração de foto e dados do perfil"
          titleStyle={textSize.cardTitle}
          subtitleStyle={textSize.cardSubtitle}
          onPress={() => setConfigModal("conta")}
        />

        <OptionCard
          icon={
            <Ionicons
              name="notifications-outline"
              size={30}
              color="#800010"
            />
          }
          title="Notificações"
          subtitle={notificacoesAtivas ? "Ativadas" : "Desativadas"}
          titleStyle={textSize.cardTitle}
          subtitleStyle={textSize.cardSubtitle}
          onPress={() => setConfigModal("notificacoes")}
        />

        <OptionCard
          icon={<FontAwesome5 name="font" size={30} color="#800010" />}
          title="Fonte"
          subtitle={`Tamanho: ${fonteLabels[fonte]}`}
          titleStyle={textSize.cardTitle}
          subtitleStyle={textSize.cardSubtitle}
          onPress={() => setConfigModal("fonte")}
        />

        <OptionCard
          icon={<MaterialIcons name="help-outline" size={30} color="#800010" />}
          title="Ajuda e avaliação"
          subtitle="Fale conosco, política de privacidade"
          titleStyle={textSize.cardTitle}
          subtitleStyle={textSize.cardSubtitle}
          onPress={() => navigation.navigate("Feedback")}
        />
      </View>

      <Modal visible={!!configModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setConfigModal(null)}
            >
              <Ionicons name="close" size={28} color="#800010" />
            </TouchableOpacity>

            {renderModalContent()}
          </View>
        </View>
      </Modal>

      <AvatarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        avatar={avatar}
        defaultAvatar={defaultAvatar}
        onChangePhoto={pickImage}
      />

      <View style={styles.navFooter}>
        <NavBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
  },

  header: {
    backgroundColor: "#800010",
    height: 180,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrapper: {
    width: 75,
    height: 75,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#D9D9D9",
    marginRight: 20,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },

  name: {
    color: "#fff",
    fontWeight: "bold",
  },

  company: {
    color: "#fff",
    marginTop: 4,
  },

  cardsContainer: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 20,
  },

  navFooter: {
    paddingHorizontal: 10,
    paddingBottom: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalBox: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 360,
    borderRadius: 16,
    padding: 20,
  },

  closeBtn: {
    alignSelf: "flex-end",
  },

  modalTitle: {
    color: "#111",
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalText: {
    color: "#555",
  },

  modalButton: {
    backgroundColor: "#800010",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 18,
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "#fff",
    borderColor: "#800010",
    borderWidth: 1,
    marginTop: 10,
  },

  secondaryButtonText: {
    color: "#800010",
    fontWeight: "bold",
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  settingText: {
    flex: 1,
  },

  settingTitle: {
    color: "#111",
    fontWeight: "bold",
    marginBottom: 4,
  },

  fontOptions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },

  fontButton: {
    flex: 1,
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
  },

  fontButtonSelected: {
    backgroundColor: "#800010",
    borderColor: "#800010",
  },

  fontButtonText: {
    color: "#333",
    fontWeight: "bold",
  },

  fontButtonTextSelected: {
    color: "#fff",
  },
});
