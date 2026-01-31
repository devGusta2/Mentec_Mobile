import { StyleSheet, Text, View,} from 'react-native';

import HeaderChat from '../components/Sabrina/components/headerChat';
import CampoMensagem from '../components/Sabrina/components/CampoMensagem'
import BalaoMensagem from '../components/Sabrina/components/BalaoMensagem'

export default function TelaChat() {
  return (
    <View style={styles.container}>
      <HeaderChat/> 
        <View style={styles.containerMensagem}>
          <BalaoMensagem  background='#C4C4C4' style={{ alignSelf: 'flex-start'}}/>
          <BalaoMensagem background='#A6192E' style={{ alignSelf: 'flex-end'}}/>
        </View> 
      <CampoMensagem/>
    </View>
  
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  containerMensagem: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

});
