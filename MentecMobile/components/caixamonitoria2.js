import { Text, View, StyleSheet, Image } from 'react-native';



export default function CaixaMonitoria() {
  return (
    <View style={styles.containerCaixa}>
      <View style={styles.textoContainer}>
        <Text style={styles.titulo}>Informações</Text>
        <Text style={styles.descricao}>
         E-mail: loremipsumeutristique@fatec.sp.gov.br
        </Text>
        <Text style={styles.descricao}>
         Telefone: (11) 900000000
        </Text>
       
      </View>

     </View>
  );
}

const styles = StyleSheet.create({
  containerCaixa: {
    flexDirection: 'row',   
    backgroundColor: 'white',
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',    
    elevation: 3,         
    shadowColor: '#000',   
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  textoContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  titulo: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  descricao: {
    color: 'black',
    fontSize: 11,
    marginBottom: 15,
  },
  
});