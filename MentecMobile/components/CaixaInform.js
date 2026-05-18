import { Text, View, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function CaixaInform() {
  const { nome, email, telefone } = useContext(UserContext);

  return (
    <View style={styles.containerCaixa}>
      <View style={styles.textoContainer}>
        <Text style={styles.titulo}>Informações</Text>
        {nome ? <Text style={styles.descricao}>Nome: {nome}</Text> : null}
        <Text style={styles.descricao}>
          E-mail: {email || 'Não informado'}
        </Text>
        <Text style={styles.descricao}>
          Telefone: {telefone || 'Não informado'}
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
    minHeight: 100,
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
    marginBottom: 4,
  },
});
