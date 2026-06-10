import { Text, View, StyleSheet } from 'react-native';

export default function CaixaInform({ email, telefone }) {
  return (
    <View style={styles.containerCaixa}>
      <View style={styles.textoContainer}>
        <Text style={styles.titulo}>Informações</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.valor}>
            {email || 'Não informado'}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Telefone</Text>
          <Text style={styles.valor}>
            {telefone || 'Não informado'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCaixa: {
    backgroundColor: '#fff',
    width: 300,
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 16,
    paddingVertical: 10,

    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  textoContainer: {
    padding: 18,
  },

  titulo: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,

    borderLeftWidth: 4,
    borderLeftColor: '#770B1C',
  },

  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#770B1C',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  valor: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
});