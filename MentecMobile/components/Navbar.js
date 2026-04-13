import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function NavBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.containerNavBar}>

      
      <Pressable onPress={() => navigation.navigate('Inicio')}>
        <MaterialCommunityIcons name="home-outline" size={30} color="white" />
      </Pressable>

      
      <Pressable onPress={() => navigation.navigate('Servicos')}>
        <Fontisto name="nav-icon-grid" size={22} color="white" />
      </Pressable>

      
      <Pressable onPress={() => navigation.navigate('Perfil')}>
        <Octicons name="person" size={26} color="white" />
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
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',

    position: 'absolute', //para manter a navbar fixa no final da pagina
    bottom: 0,
    left: 0,
    right: 0,

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});