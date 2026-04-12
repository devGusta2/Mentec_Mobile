import { Text, View, StyleSheet, Image } from 'react-native';
import BotaoPadrao from "./BotaoPadrao";
import { useNavigation } from '@react-navigation/native';

export default function CaixaMonitoria({
  titulo,
  descricao,
  imagem,
  botoes = [], 
}) {

  const navigation = useNavigation();

  return (
    <View style={styles.containerCaixa}>

      <View style={styles.textoContainer}>
        
        <Text style={styles.titulo}>{titulo}</Text>

        <Text style={styles.descricao}>{descricao}</Text>

        
        <View style={styles.containerBotoes}>
          {botoes.map((botao, index) => (
            <BotaoPadrao
              key={index}
              title={botao.texto}
              onPress={() => {
                if (botao.onPress) return botao.onPress();
                if (botao.rota) return navigation.navigate(botao.rota);
              }}
            />
          ))}
        </View>

      </View>

      <Image
        source={imagem}
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
  },

  textoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  descricao: {
    fontSize: 11,
  },

  containerBotoes: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    gap: 8,
    marginTop: 10,
  },

  imgMonitoria: {
    width: 110,
    height: '100%',
  },
});