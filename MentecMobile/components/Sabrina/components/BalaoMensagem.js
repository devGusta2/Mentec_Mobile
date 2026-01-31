import { Text, View, StyleSheet, Image, Pressable } from 'react-native';

export default function BalaoMensagem({background, style}) {
  return (
    <View style={[styles.containerBalao, {backgroundColor: background}, style]}>
      <Text style={styles.text}>Bom dia</Text>
      <Text style={styles.text}>11:47</Text>
    </View>
    
  );
}
  const styles = StyleSheet.create({
  containerBalao: {
    flexDirection: 'row',
    width: 180,
    height: 45,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent:'center',
    padding: 10,
    marginVertical: 22,
    },
    
    text: {
      color:'black',
      justifyContent:'space-between',
      paddingHorizontal: 18,
    },
  });