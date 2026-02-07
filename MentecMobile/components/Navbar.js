import { Text, View, StyleSheet, Image, Pressable, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useContext } from 'react';

import { AuthContext  } from '../contexts/AuthContext'

export default function NavBar({ navigation }) {

  const handlePress = (message) => {
    alert(message);
  };

const { logout } = useContext(AuthContext );
  const handleLogout = async () => {
    await logout();
    // opcional: se quiser garantir que vai voltar pro login
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: "Inicio" }],
    // });
  };
  return (
    <View style={styles.containerNavBar}>

      <Pressable onPress={() => navigation.navigate('Inicio')} >
        <MaterialCommunityIcons name="home-outline" size={30} color="white" />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Servicos')} >
        <Fontisto name="nav-icon-grid" size={22} color="white" />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('perfil')} >
        <Octicons name="person" size={26} color="white" />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Feedback')} >
        <Ionicons name="chatbox-ellipses-outline" size={27} color="white" />
      </Pressable>

      <Pressable onPress={handleLogout} >
        <Ionicons name="chatbox-ellipses-outline" size={27} color="white" />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  containerNavBar: {
    position: 'fixed',
    bottom: 25,
    // distância do rodapé (pode ajustar)
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#770B1C',
    padding: 8,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 15,
    marginHorizontal: 20, // deixará ele com bordas laterais
    elevation: 5, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },

});
