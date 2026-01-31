import { Text, View, StyleSheet, Image, Pressable } from 'react-native';

export default function BotaoPadrao({ title, onPress }) {
  return (
    <View style={styles.containerBotao}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBotao: {
    flexDirection: 'center',
    backgroundColor: '#770B1C',
    width: 140,
    height: '22%',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent:'center',
    padding: 10,
    },
    
    text: {
      color:'white'
    },
  });