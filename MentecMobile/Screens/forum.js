import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/header';
import NavBar from '../components/Navbar';
export default function Forum({navigation}) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title = "Fórum">
        
      </Header>

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Conectando mentes, moldando futuros</Text>
        <Text style={styles.subtitle}>
          Um espaço para compartilhar conhecimento, trocar ideias e impulsionar a inovação tecnológica.
        </Text>

        {/* Barra de busca */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#000" />
          <TextInput placeholder="Pesquisar..." style={styles.searchInput} />
        </View>

        {/* Card de postagem */}
        <View style={styles.postCard}>
          <Text style={styles.postTitle}>Ajuda, meu mentor virou coach motivacional!</Text>
          <Text style={styles.postText}>
            Gente, preciso de ajuda URGENTE 😭 Eu entrei nesse sistema de mentorias achando que ia aprender sobre
            JavaScript, React, essas coisas...
          </Text>
        </View>
      </ScrollView>

      {/* Botão flutuante */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <NavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems:'center',
    justifyContent:'center'
  },
  header: {
    backgroundColor: '#6b0f1a',
    paddingVertical: 18,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    display:'flex',alignItems:'center',
    justifyContent:'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:200
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop:20

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#6b0f1a',
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginTop:50
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  postCard: {
    backgroundColor: '#d9d9d9',
    padding: 12,
    borderRadius: 6,
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postText: {
    fontSize: 13,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    bottom:150,
    right: 25,
    backgroundColor: '#6b0f1a',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6b0f1a',
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});