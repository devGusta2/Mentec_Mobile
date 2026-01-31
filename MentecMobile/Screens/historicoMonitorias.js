import { View, StyleSheet, StatusBar, Alert, Pressable, Text, ScrollView } from 'react-native';
import Header from '../components/headerHistori';
import CaixaMonitoria from '../components/caixaMonitoria';
import NavBar from '../components/Navbar';

export default function HistoricoMonitorias({navigation}) {
  return (
    <View style={styles.containerTela}>
      <Header />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={()=>{navigation.navigate('MaterialApoio')}}>
          <CaixaMonitoria />
          </Pressable>
          <Pressable onPress={()=>{navigation.navigate('MaterialApoio')}}>
          <CaixaMonitoria />
          </Pressable>
          <Pressable onPress={()=>{navigation.navigate('MaterialApoio')}}>
          <CaixaMonitoria />
          </Pressable>
       
        </ScrollView>
      </View>

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#E5E5E5',
  },

  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  footer: {
    width: '100%',
    height: 30,
    backgroundColor: '#770B1C',
    marginTop: 20,
  },

  parteBranca: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 140,
  },
});