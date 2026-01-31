import {TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export default function BotaoMenu ({titulo,imagem, onPress}) {
  return(
  <TouchableOpacity onPress={onPress}>  
    <View style={styles.container}>
    {imagem}
    <Text style={styles.text}>{titulo}</Text>
    
    </View>
</TouchableOpacity>    
  )
} 

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginTop:10,
        
  },

  container: {
    backgroundColor: '#770B1C',
    width: 130,
    height:130,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
    padding: 20,
  },  

   
})

