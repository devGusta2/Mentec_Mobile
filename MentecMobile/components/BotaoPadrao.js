import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function BotaoPadrao({ title, onPress }) {
  return (
    <View style={styles.containerBotao}>
      <Pressable style={styles.botao} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBotao: {
    width: 140,
    height: 40,
  },

  botao: {
    flex: 1, 
    backgroundColor: '#770B1C',
    borderRadius: 8,

   
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },

  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});