import { StyleSheet, Text, View, Image } from 'react-native';

export default function HeaderChat() {
  return (
    <View style={styles.container}>
      {/* topo do chat */}
      <View style={styles.containerChat}> 
        <Text style={styles.textMentec}>Mentec</Text>
      </View>

      {/* imagem + nome lado a lado */}
      <View style={styles.header}>
        <Image 
          source={require('./../../../assets/perfilFlat.png')}
          style={styles.img}    
        />  
        <Text style={styles.text}>Trevor Beraldo</Text>
      </View>
    </View>

    
  );
}


const styles = StyleSheet.create({
  text: {      
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textMentec: {
    color: 'white',
    paddingRight: 2,
    fontSize: 18,
  },
  container: {
    backgroundColor: '#770B1C',
    width: '100%',
    height: '16%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    paddingVertical: 50,
  },
  containerChat: {
    position: 'absolute',
    top: 5,
    right: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
  header: {
    flexDirection: 'row',     
    alignItems: 'center',     
    gap: 10,                  
    marginTop: -10,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 999,
    resizeMode: 'cover',
  },
});