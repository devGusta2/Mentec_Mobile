import { Text, View, StyleSheet, Image, TextInput, Pressable} from 'react-native';

// import Entypo from '@expo/vector-icons/Entypo';
import BotaoPadrao from "./BotaoPadrao";

export default function CampoMensagem({ title, onPress }) {
  return (

    <View style={styles.container}> 
      <TextInput 
        style={styles.containerTexto} placeholder = 'Digite uma mensagem...'>
      </TextInput>
      <Pressable onPress={onPress}>
       { /*<Entypo name="attachment" size={28} color="white" />*/}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#770B1C',
    width: '95%',
    height: 63,
    borderRadius: 9,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  containerTexto: {
    flexDirection: 1,
    backgroundColor: '#D9D9D9',
    width: '85%',
    height: 38,
    borderRadius: 9,
    paddingHorizontal: 10,
  }
})