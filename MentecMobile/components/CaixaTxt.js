import { View, Text, StyleSheet } from 'react-native';

export default function CaixaTxt() {
  return (
    <View style={styles.containerCaixa}>
      <Text style={styles.titulo}>Informações para contato:</Text>

      <Text style={styles.texto}>
        <Text style={styles.negrito}>E-mail:</Text> f292ti@cps.sp.gov.br
      </Text>

      <Text style={styles.texto}>
        <Text style={styles.negrito}>Telefone:</Text> (11) 4674 – 2594
      </Text>

      <Text style={styles.texto}>
        <Text style={styles.negrito}>Endereço:</Text> Rua Carlos de Carvalho, 200 – Jardim São João, 
        Ferraz de Vasconcelos – SP, 08545-120
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCaixa: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  titulo: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
  },

  texto: {
    fontSize: 14,
    marginBottom: 8,
  },

  negrito: {
    fontWeight: '700',
  },
});