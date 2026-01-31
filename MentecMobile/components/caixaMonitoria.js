import { Text, View, StyleSheet, Image } from 'react-native';
import BotaoPadrao from "./BotaoPadraos";
import { useNavigation } from '@react-navigation/native';

export default function CaixaMonitoria() {

  const navigation = useNavigation();

  return (
    
    <View style={styles.containerCaixa}>
      <View style={styles.textoContainer}>
        <Text style={styles.titulo}>Introdução ao Desenvolvimento Web</Text>
        <Text style={styles.descricao}>
          Aprenda o básico do desenvolvimento web, incluindo HTML, CSS e JavaScript. 
          Ideal para iniciantes que querem construir e estilizar suas primeiras páginas web.
        </Text>
        <BotaoPadrao
            title="Ver Mais"
           onPress={() => navigation.navigate('AgendamentoMonitoria')}
          />
      </View>

      <Image 
        source={require('../assets/monitoria1.jpg')}
        style={styles.imgMonitoria} 
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCaixa: {
    flexDirection: 'row',   
    backgroundColor: 'white',
    width: 330,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',    
    elevation: 3,         
    shadowColor: '#000',   
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  textoContainer: {
    flex: 1,
    padding: 10,
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
    marginBottom: 10,
  },
  imgMonitoria: {
    width: 110,    
    height: '100%',
  },
});
