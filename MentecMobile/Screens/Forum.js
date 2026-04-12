import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Header from '../components/header';
import NavBar from '../components/Navbar';

export default function Forum() {
  return (
    <View style={styles.container}>

      <Header titulo="Fórum" />

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>
          Conectando mentes, moldando futuros
        </Text>

        <Text style={styles.subtitle}>
          Um espaço para compartilhar conhecimento, trocar ideias e impulsionar a inovação tecnológica.
        </Text>

          <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#000" />
          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
          />
        </View>

        
        <View style={styles.postCard}>

          <View style={styles.containerAvatar}>
            <View style={styles.avatarCircle}>
              <Image
                source={require('../assets/logo_perfil.png')}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.userName}>
              Lorem ipsum eu tristique
            </Text>
          </View>

          <Text style={styles.postTitle}>
            Ajuda, meu mentor virou coach motivacional!
          </Text>

          <Text style={styles.postText}>
            Gente, preciso de ajuda URGENTE 😭 Eu entrei nesse sistema de mentorias achando que ia aprender sobre JavaScript, React...
          </Text>

        </View>

      </ScrollView>

      
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <NavBar />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },

  content: {
    padding: 20,
    paddingBottom: 120,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#6b0f1a',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginTop: 20,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },

  postCard: {
    backgroundColor: '#d9d9d9',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
  },

  containerAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },

  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: 25,
    height: 25,
  },

  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  postTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },

  postText: {
    fontSize: 13,
    color: '#333',
  },

  fab: {
    position: 'absolute',
    bottom: 90,
    right: 25,
    backgroundColor: '#6b0f1a',
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

});