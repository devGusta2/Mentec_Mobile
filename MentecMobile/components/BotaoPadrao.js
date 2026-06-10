import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function BotaoPadrao({
  title,
  onPress,
  icon,
}) {
  return (
    <View style={styles.containerBotao}>
      <Pressable style={styles.botao} onPress={onPress}>
        <View style={styles.content}>
          {icon}

          <Text style={styles.text}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBotao: {

    height: 70,
  },

  botao: {
    flex: 1,
    backgroundColor: '#770B1C',
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 18,
    elevation: 3,
    width:170,
    shadowColor: '#0f0202',
    shadowOpacity: 0.12,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});