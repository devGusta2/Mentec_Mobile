import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import NavBar from '../components/Navbar';
import OptionCard from '../components/OptionCard';
import AvatarModal from '../components/AvatarModal';


import defaultAvatar from '../assets/psi.jpg';

export default function ProfileScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
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
          <Text style={styles.name}>Paulo Henrique</Text>
          <Text style={styles.company}>Mentec</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>

      <OptionCard
          icon={<Ionicons name="settings-sharp" size={28} color="#800010" />}
          title="Conta"
          subtitle="Alteração de número, Atualização de email"
          onPress={() => alert('Configurações')}
        />

        <OptionCard
          icon={<Ionicons name="notifications-outline" size={30} color="#800010" />}
          title="Notificações"
          subtitle="Notificações"
          onPress={() => alert("Notificações")}
        />

        <OptionCard
          icon={<FontAwesome5 name="font" size={30} color="#800010" />}
          title="Fonte"
          subtitle="Tamanho, Estilo da fonte"
          onPress={() => alert("Fonte")}
        />

        <OptionCard
          icon={<MaterialIcons name="help-outline" size={30} color="#800010" />}
          title="Ajuda e avaliação"
          subtitle="Fale conosco, Política de privacidade"
          onPress={() => navigation.navigate("Feedback")}
        />

      </View>

      <AvatarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        avatar={avatar}
        defaultAvatar={defaultAvatar}
        onChangePhoto={pickImage}
      />
      <NavBar navigation={navigation} />

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
    fontSize: 20,
    fontWeight: "bold",
  },

  company: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },

  /* CARDS */
  cardsContainer: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
});
