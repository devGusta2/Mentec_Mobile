import React, { useEffect, useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Modal } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Header from '../components/header';
import NavBar from '../components/Navbar';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CATEGORIAS,
  adicionarAoHistorico,
  mostrarAlerta,
  mostrarAlertaSempre,
} from '../Utils/notificacoes';
import { getApiUrl } from '../Utils/AuthRequestProvider';

export default function Forum({ navigation }) {

  const API_URL = getApiUrl();

  const [topicos, setTopicos] = useState([]);

  const [pesquisa, setPesquisa] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const [comentarios, setComentarios] = useState({});

  const fetchTopicos = async () => {

    try {

      const TOKEN = await AsyncStorage.getItem('@mentec_token');

      const response = await axios.get(
        `${API_URL}/topicos/listarSeguro`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      setTopicos(response.data);

    } catch (error) {

      console.log('Erro ao buscar tópicos', error);

    }
  };

  useEffect(() => {
    fetchTopicos();
  }, []);

  const criarTopico = async () => {
    try {

      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const idUser = await AsyncStorage.getItem('@mentec_userid');

      const response = await axios.post(
        `${API_URL}/topicos/criar`,
        {
          titulo,
          descricao,
          idUser,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      console.log('Resposta:', response.data);

      const status = response.data.status;

      await adicionarAoHistorico(
        'Novo tópico',
        titulo
      );

      // Fecha e limpa o modal
      setTitulo('');
      setDescricao('');
      setModalVisible(false);

      if (status === 'SEGURO') {

        await mostrarAlerta(
          'Sucesso',
          'Tópico publicado com sucesso!',
          CATEGORIAS.FORUM
        );

        fetchTopicos();

      } else if (status === 'SUSPEITO') {

        await mostrarAlerta(
          'Em análise',
          'Seu tópico foi enviado para análise da moderação.',
          CATEGORIAS.FORUM
        );

      } else if (status === 'PERIGOSO') {

        await mostrarAlertaSempre(
          'Conteúdo bloqueado',
          'Seu tópico foi removido por violar as políticas da plataforma.'
        );

      } else {

        // Caso o backend não esteja retornando status
        await mostrarAlerta(
          'Sucesso',
          'Tópico enviado.',
          CATEGORIAS.FORUM
        );

        fetchTopicos();
      }

    } catch (error) {

      console.log(
        'Erro ao criar tópico:',
        error?.response?.data || error
      );

      mostrarAlertaSempre(
        'Erro',
        'Não foi possível criar o tópico'
      );

    }
  };

  const comentar = async (idTopico) => {

    try {

      const TOKEN = await AsyncStorage.getItem('@mentec_token');
      const usuario = await AsyncStorage.getItem('@mentec_userid');

      const response = await axios.post(
        `${API_URL}/topicos/comentar`,
        {
          comentario: comentarios[idTopico],
          usuario,
          topico: idTopico,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      console.log('Resposta comentário:', response.data);

      const status = response.data.status;

      setComentarios({
        ...comentarios,
        [idTopico]: '',
      });

      if (status === 'SEGURO') {

        await adicionarAoHistorico(
          'Comentário publicado',
          'No fórum'
        );

        await mostrarAlerta(
          'Sucesso',
          'Comentário publicado com sucesso!',
          CATEGORIAS.FORUM
        );

        fetchTopicos();

      } else if (status === 'SUSPEITO') {

        await mostrarAlerta(
          'Em análise',
          'Seu comentário foi enviado para análise da moderação.',
          CATEGORIAS.FORUM
        );

      } else if (status === 'PERIGOSO') {

        await mostrarAlertaSempre(
          'Comentário bloqueado',
          'Seu comentário foi removido por violar as políticas da plataforma.'
        );

      } else {

        console.log('Status desconhecido:', status);

        await mostrarAlerta(
          'Comentário enviado',
          'Seu comentário foi processado.',
          CATEGORIAS.FORUM
        );
      }

    } catch (error) {

      console.log(
        'Erro ao comentar:',
        error?.response?.data || error
      );

      mostrarAlertaSempre(
        'Erro',
        'Não foi possível comentar'
      );

    }
  };

  const topicosFiltrados = topicos.filter((topico) =>
    topico.titulo?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (

    <View style={styles.container}>

      <Header titulo="Fórum" />

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>
          Conectando mentes, moldando futuros
        </Text>

        <Text style={styles.subtitle}>
          Um espaço para compartilhar conhecimento,
          trocar ideias e impulsionar a inovação tecnológica.
        </Text>

        <View style={styles.searchContainer}>

          <Ionicons name="search" size={22} color="#000" />

          <TextInput
            placeholder="Pesquisar..."
            style={styles.searchInput}
            value={pesquisa}
            onChangeText={setPesquisa}
          />

        </View>

        {topicosFiltrados.map((topico, index) => (

          <View
            key={index}
            style={styles.postCard}
          >

            <View style={styles.containerAvatar}>

              <View style={styles.avatarCircle}>

                <Image
                  source={require('../assets/logo_perfil.png')}
                  style={styles.avatar}
                />

              </View>

              <Text style={styles.userName}>
                {topico.criador}
              </Text>

            </View>

            <Text style={styles.postTitle}>
              {topico.titulo}
            </Text>

            <Text style={styles.postText}>
              {topico.descricao}
            </Text>

            {topico.mensagens?.length > 0 && (
              <View style={styles.commentsContainer}>
                <Text style={styles.commentTitle}>
                  Comentários
                </Text>

                {topico.mensagens.map((msg, i) => (
                  <View key={i} style={styles.commentBox}>
                    <Text style={styles.commentUser}>
                      {msg.usuario}
                    </Text>

                    <Text style={styles.commentText}>
                      {msg.mensagem}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.commentInputContainer}>

              <TextInput
                placeholder="Digite um comentário..."
                style={styles.commentInput}
                value={comentarios[topico.id] || ''}
                onChangeText={(text) =>
                  setComentarios({
                    ...comentarios,
                    [topico.id]: text,
                  })
                }
              />

              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => comentar(topico.id)}
              >

                <Ionicons
                  name="send"
                  size={18}
                  color="#fff"
                />

              </TouchableOpacity>

            </View>

          </View>

        ))}

      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >

        <Ionicons
          name="add"
          size={28}
          color="#fff"
        />

      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >

        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>

            <Text style={styles.modalTitle}>
              Criar tópico
            </Text>

            <TextInput
              placeholder="Título"
              style={styles.input}
              value={titulo}
              onChangeText={setTitulo}
            />

            <TextInput
              placeholder="Descrição"
              multiline
              numberOfLines={5}
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
            />

            <TouchableOpacity
              style={styles.publishButton}
              onPress={criarTopico}
            >

              <Text style={styles.publishButtonText}>
                Publicar
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >

              <Text style={styles.cancelText}>
                Cancelar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

      <NavBar navigation={navigation} />

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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    lineHeight: 20,
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
    borderRadius: 12,
    marginTop: 20,
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
    fontSize: 16,
  },

  postText: {
    fontSize: 13,
    color: '#333',
  },

  commentsContainer: {
    marginTop: 15,
  },

  commentTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6b0f1a',
  },

  commentBox: {
    backgroundColor: '#efefef',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },

  commentUser: {
    fontWeight: 'bold',
    fontSize: 12,
  },

  commentText: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },

  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },

  commentInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },

  commentButton: {
    backgroundColor: '#6b0f1a',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  publishButton: {
    backgroundColor: '#6b0f1a',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  publishButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  cancelButton: {
    marginTop: 15,
    alignItems: 'center',
  },

  cancelText: {
    color: '#777',
  },

});