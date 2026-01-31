import { StyleSheet, Text, View } from 'react-native';

export default function Header () {
  return(
    <View style={styles.container}>
    <View style={styles.containerMentec}> 
      <Text style={styles.textMentec}>
        Mentec      
      </Text>
    </View>  
    <Text style={styles.text}>Serviço</Text>
    </View>
  )
} 

const styles = StyleSheet.create({
    text:{
      color: 'white',
      fontSize: 30,
      
    },
    textMentec:{
      color:'white',
      paddingRight:20,
      fontSize:18,
    },
    container:{
      backgroundColor: '#770B1C',
      width: '100%',
      height: '25%',
      justifyContent: 'space-between',
      alignItems:'center',
      borderBottomLeftRadius: 45,
      borderBottomRightRadius: 45,
      paddingVertical: 50,
    },    
  containerMentec:{
    backgroundColor:'#770B1C',
    width:'100%',
    alignItems:'flex-end',

  },
    
})