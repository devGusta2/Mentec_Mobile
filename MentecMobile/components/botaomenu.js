import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function BotaoMenu({ titulo, imagem, onPress }) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      {imagem}
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: 120,
    height: 120,
    backgroundColor: '#770B1C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
});