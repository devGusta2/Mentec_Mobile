import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/Navbar';
export default function MaterialApoio({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Materiais de apoio</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color:'white', margin:'auto'}}>Baixar</Text>
          </TouchableOpacity>
          <Text style={styles.textbtn}>Matemática discreta</Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity style={styles.btn}>
        <Text style={{color:'white', margin:'auto'}}>Baixar</Text>
          </TouchableOpacity>
               <Text style={styles.textbtn}>Inglês</Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity style={styles.btn}>
                <Text style={{color:'white', margin:'auto'}}>Baixar</Text>
          </TouchableOpacity>
          <Text style={styles.textbtn}>Programação orientada...</Text>
        </View>
      </View>
  <NavBar navigation={navigation} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#770B1C',
  },
  header: {
    height: '25%',
    width: '100%',
  },
  mainContainer: {
    height: '75%',
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    display: 'flex',
    padding: 30,
    gap:20
  },
  title: {
    color: 'whitesmoke',
    fontSize: 25,
    textAlign: 'center',
    margin: 'auto',
  },
  card: {
    width: '100%',
    height: '70px',
    padding: 15,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    shadowColor: '#000',          // cor da sombra
    shadowOffset: { width: 0, height: 2 }, // deslocamento
    shadowOpacity: 0.25,          // opacidade (0 a 1)
    shadowRadius: 3.84,    
  },
  btn: {
    backgroundColor: '#770B1C',
    height: 45,
    width: 45,
    borderRadius: 5,
  },
  textbtn:{
    minWidth:'70%',
    fontWeight:500
  }
});
