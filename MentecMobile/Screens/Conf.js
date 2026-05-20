import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NavBar from "../components/Navbar";
import OptionCard from "../components/OptionCard";
import AvatarModal from "../components/AvatarModal";

import defaultAvatar from "../assets/psi.jpg";
import {
  STORAGE_KEYS,
  carregarPreferencias,
  formatarDataHistorico,
  limparHistorico,
  obterHistorico,
  setAntecedencia,
  setCategoriaAtiva,
} from "../Utils/notificacoes";

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
  const [notifMonitorias, setNotifMonitorias] = useState(true);
  const [notifForum, setNotifForum] = useState(true);
  const [notifSac, setNotifSac] = useState(true);
  const [antecedencia, setAntecedenciaState] = useState("1h");
  const [historico, setHistorico] = useState([]);
  const [fonte, setFonte] = useState("medio");

  const scaleFont = (size) => Math.round(size * fonteEscala[fonte]);

  const loadAvatar = async () => {
    const avatarSalvo = await AsyncStorage.getItem("@mentec_avatar");
    if (avatarSalvo) {
      setAvatar(avatarSalvo);
    }
  };

  const loadPreferencias = async () => {
    const prefs = await carregarPreferencias();
    setNotificacoesAtivas(prefs.ativas);
    setNotifMonitorias(prefs.monitorias);
    setNotifForum(prefs.forum);
    setNotifSac(prefs.sac);
    setAntecedenciaState(prefs.antecedencia);

    const fonteSalva = await AsyncStorage.getItem("@mentec_fonte");
    if (fonteSalva) {
      setFonte(fonteSalva);
    }
  };

  const loadHistorico = async () => {
    const lista = await obterHistorico();
    setHistorico(lista);
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
    await AsyncStorage.setItem(STORAGE_KEYS.ativas, String(value));
  };

  const toggleCategoria = async (categoria, value, setter) => {
    setter(value);
    await setCategoriaAtiva(categoria, value);
  };

  const selecionarAntecedencia = async (value) => {
    setAntecedenciaState(value);
    await setAntecedencia(value);
  };

  const handleLimparHistorico = async () => {
    await limparHistorico();
    setHistorico([]);
  };

  const selecionarFonte = async (value) => {
    setFonte(value);
    await AsyncStorage.setItem("@mentec_fonte", value);
  };

  useEffect(() => {
    loadAvatar();
    loadPreferencias();
  }, []);

  useEffect(() => {
    if (configModal === "notificacoes") {
      loadHistorico();
    }
  }, [configModal]);

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
      const switchProps = {
        trackColor: { false: "#ddd", true: "#b04a58" },
        disabled: !notificacoesAtivas,
      };

      return (
        <ScrollView
          style={styles.modalScroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.modalTitle, textSize.modalTitle]}>
            Notificações
          </Text>

          <View style={styles.settingRow}>
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, textSize.settingTitle]}>
                Receber notificações
              </Text>
              <Text style={[styles.modalText, textSize.modalText]}>
                {notificacoesAtivas
                  ? "Avisos sobre monitorias, agenda e atualizações neste dispositivo."
                  : "Você não verá pop-ups de aviso neste dispositivo."}
              </Text>
            </View>
            <Switch
              value={notificacoesAtivas}
              onValueChange={toggleNotificacoes}
              trackColor={switchProps.trackColor}
              thumbColor={notificacoesAtivas ? "#800010" : "#f4f3f4"}
            />
          </View>

          <Text style={[styles.sectionLabel, textSize.settingTitle]}>
            Tipos de aviso
          </Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingTitle, textSize.settingTitle]}>
              Monitorias e cronograma
            </Text>
            <Switch
              value={notifMonitorias}
              onValueChange={(v) =>
                toggleCategoria("monitorias", v, setNotifMonitorias)
              }
              {...switchProps}
              thumbColor={notifMonitorias ? "#800010" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingTitle, textSize.settingTitle]}>
              Fórum
            </Text>
            <Switch
              value={notifForum}
              onValueChange={(v) => toggleCategoria("forum", v, setNotifForum)}
              {...switchProps}
              thumbColor={notifForum ? "#800010" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingTitle, textSize.settingTitle]}>
              SAC
            </Text>
            <Switch
              value={notifSac}
              onValueChange={(v) => toggleCategoria("sac", v, setNotifSac)}
              {...switchProps}
              thumbColor={notifSac ? "#800010" : "#f4f3f4"}
            />
          </View>

          <Text style={[styles.sectionLabel, textSize.settingTitle]}>
            Lembrete antes da monitoria
          </Text>
          <View style={styles.fontOptions}>
            <TouchableOpacity
              style={[
                styles.fontButton,
                antecedencia === "1h" && styles.fontButtonSelected,
                !notificacoesAtivas && styles.optionDisabled,
              ]}
              disabled={!notificacoesAtivas}
              onPress={() => selecionarAntecedencia("1h")}
            >
              <Text
                style={[
                  styles.fontButtonText,
                  textSize.fontOption,
                  antecedencia === "1h" && styles.fontButtonTextSelected,
                ]}
              >
                1 hora antes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.fontButton,
                antecedencia === "1d" && styles.fontButtonSelected,
                !notificacoesAtivas && styles.optionDisabled,
              ]}
              disabled={!notificacoesAtivas}
              onPress={() => selecionarAntecedencia("1d")}
            >
              <Text
                style={[
                  styles.fontButtonText,
                  textSize.fontOption,
                  antecedencia === "1d" && styles.fontButtonTextSelected,
                ]}
              >
                1 dia antes
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.hintText, textSize.modalText]}>
            Preferência salva para lembretes futuros no histórico.
          </Text>

          <Text style={[styles.sectionLabel, textSize.settingTitle]}>
            Últimos avisos
          </Text>
          {historico.length === 0 ? (
            <Text style={[styles.modalText, textSize.modalText]}>
              Nenhum aviso registrado ainda.
            </Text>
          ) : (
            historico.map((item) => (
              <View key={item.id} style={styles.historicoItem}>
                <Text style={[styles.historicoTitulo, textSize.settingTitle]}>
                  {item.titulo}
                </Text>
                {item.subtitulo ? (
                  <Text style={[styles.modalText, textSize.modalText]}>
                    {item.subtitulo}
                  </Text>
                ) : null}
                <Text style={styles.historicoData}>
                  {formatarDataHistorico(item.data)}
                </Text>
              </View>
            ))
          )}

          {historico.length > 0 && (
            <TouchableOpacity
              style={[styles.modalButton, styles.secondaryButton]}
              onPress={handleLimparHistorico}
            >
              <Text style={[styles.secondaryButtonText, textSize.button]}>
                Limpar histórico
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
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
    maxHeight: "85%",
    borderRadius: 16,
    padding: 20,
  },

  modalScroll: {
    maxHeight: 480,
  },

  sectionLabel: {
    color: "#111",
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 8,
  },

  hintText: {
    color: "#888",
    marginTop: 8,
  },

  historicoItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },

  historicoTitulo: {
    color: "#111",
    fontWeight: "bold",
  },

  historicoData: {
    color: "#888",
    fontSize: 11,
    marginTop: 4,
  },

  optionDisabled: {
    opacity: 0.45,
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
