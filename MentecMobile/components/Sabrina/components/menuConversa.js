import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function MenuConversa({ nome, mensagem, data, hora, imagem }) {
  return (
    <View style={styles.card}>
      <Image source={imagem} style={styles.img} />

      <View style={styles.info}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.msg}>{mensagem}</Text>
      </View>

      <View style={styles.dataHora}>
        <Text style={styles.data}>{data}</Text>
        <Text style={styles.hora}>{hora}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#770B1C',
    width: '100%',
    height: 75,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  img: {
    width: 55,
    height: 55,
    borderRadius: 999,
    resizeMode: 'cover',
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  nome: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  msg: {
    color: 'white',
    opacity: 0.8,
    fontSize: 12,
  },

  dataHora: {
    alignItems: 'flex-end',
  },

  data: {
    color: 'white',
    fontSize: 12,
  },

  hora: {
    color: 'white',
    fontSize: 12,
  },
});
