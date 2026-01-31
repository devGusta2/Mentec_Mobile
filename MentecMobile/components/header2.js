import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Header2({ title }) {
  return (
    <View style={styles.containerVermelho}>
      <Text style={styles.paragraph}>Monitoria</Text>   
      <View style={styles.containerBranco}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerVermelho: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#770B1C',
    paddingTop: 90
  },
  paragraph: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "white"
  },
  containerBranco: {
    width: "100%",
    height: "80%",
    backgroundColor: "#E5E5E5",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  textMentec:{
      color:'white',
      paddingRight:20,
      fontSize:18,
    },
});
