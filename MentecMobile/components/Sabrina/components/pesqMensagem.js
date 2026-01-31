import { Text, View, StyleSheet, TextInput } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

export default function PesquisarMensagem() {
  return (
    <View style={styles.containerPesq}> 
      <Octicons name="search" size={30} color="#770B1C"/>  
      <TextInput
        style={styles.containerTexto} placeholder = 'Pesquisar'>
      </TextInput>
    </View>
  );

}
  const styles = StyleSheet.create({
  containerPesq: {
    flexDirection: 'row',
    backgroundColor: '#C4C4C4',
    width: '100%',
    height: 60,
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 15,
    gap: 8,
  },
  
});