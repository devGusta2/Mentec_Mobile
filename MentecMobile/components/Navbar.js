import { View, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { AuthContext } from '../contexts/AuthContext';
import React, { useContext } from 'react';
export default function NavBar() {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
    
  };
  return (
    <View style={[
      styles.containerNavBar,
      { paddingBottom: insets.bottom, height: 50 + insets.bottom }
    ]}>

      <Pressable onPress={() => navigation.navigate('Inicio')}>
        <MaterialCommunityIcons name="home-outline" size={30} color="white" />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Servicos')}>
        <Fontisto name="nav-icon-grid" size={22} color="white" />
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Perfil')}>
        <Octicons name="person" size={26} color="white" />
      </Pressable>

      {/* BOTÃO LOGOUT */}
      <Pressable onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={26} color="white" />
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  containerNavBar: {
    flexDirection: 'row',
    backgroundColor: '#770B1C',
    padding: 8,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
  },
});