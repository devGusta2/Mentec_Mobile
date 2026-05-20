import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/header';
import NavBar from '../components/Navbar';
import StarRating from '../components/StarRating';
import { PERGUNTAS_FEEDBACK } from '../constants/feedbackPerguntas';
import {
  feedbackJaEnviado,
  montarPayload,
  obterFeedbackMonitoria,
  salvarFeedbackLocal,
} from '../Utils/feedbackStorage';
import {
  adicionarAoHistorico,
  mostrarAlerta,
  mostrarAlertaSempre,
} from '../Utils/notificacoes';

export default function Feedback({ navigation, route }) {
  const monitoriaId = route.params?.monitoriaId ?? route.params?.id;
  const tituloMonitoria = route.params?.titulo ?? 'Monitoria';
  const monitorNome = route.params?.monitor ?? '';

  const [notas, setNotas] = useState({});
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [jaEnviado, setJaEnviado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function verificar() {
      if (!monitoriaId) {
        setCarregando(false);
        return;
      }

      const alunoId = await AsyncStorage.getItem('@mentec_userid');
      const existe = await feedbackJaEnviado(monitoriaId, alunoId);
      setJaEnviado(existe);

      if (existe) {
        const salvo = await obterFeedbackMonitoria(monitoriaId, alunoId);
        if (salvo?.respostas) {
          const mapa = {};
          salvo.respostas.forEach((r) => {
            mapa[r.perguntaId] = r.nota;
          });
          setNotas(mapa);
          setComentario(salvo.comentario || '');
        }
      }
      setCarregando(false);
    }
    verificar();
  }, [monitoriaId]);

  const todasRespondidas = PERGUNTAS_FEEDBACK.every((p) => notas[p.id] >= 1);

  const handleNota = (perguntaId, valor) => {
    if (jaEnviado) return;
    setNotas((prev) => ({ ...prev, [perguntaId]: valor }));
  };

  const handleEnviar = async () => {
    if (!monitoriaId) {
      mostrarAlertaSempre(
        'Monitoria não identificada',
        'Acesse o feedback pelo histórico de monitorias concluídas.'
      );
      return;
    }

    if (!todasRespondidas) {
      mostrarAlertaSempre(
        'Formulário incompleto',
        'Responda todas as perguntas usando as estrelas (1 a 5).'
      );
      return;
    }

    setEnviando(true);
    try {
      const alunoId = await AsyncStorage.getItem('@mentec_userid');
      const payload = montarPayload({
        monitoriaId,
        alunoId,
        titulo: tituloMonitoria,
        respostas: notas,
        comentario,
      });

      await salvarFeedbackLocal(payload);
      console.log('Feedback (pronto para API):', JSON.stringify(payload, null, 2));

      await adicionarAoHistorico(
        'Feedback enviado',
        tituloMonitoria
      );
      await mostrarAlerta(
        'Sucesso',
        'Seu feedback foi registrado. Obrigado pela avaliação!'
      );

      setJaEnviado(true);
      navigation.goBack();
    } catch (e) {
      console.log(e);
      mostrarAlertaSempre('Erro', 'Não foi possível enviar o feedback.');
    } finally {
      setEnviando(false);
    }
  };

  if (carregando) {
    return (
      <View style={[styles.containerTela, styles.centered]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.containerTela}>
      <Header titulo="Feedback" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>Avaliação da Monitoria</Text>

        {monitoriaId ? (
          <View style={styles.monitoriaInfo}>
            <Text style={styles.monitoriaTitulo}>{tituloMonitoria}</Text>
            {monitorNome ? (
              <Text style={styles.monitoriaMeta}>Monitor: {monitorNome}</Text>
            ) : null}
            {jaEnviado ? (
              <Text style={styles.avisoEnviado}>
                Você já enviou feedback desta monitoria.
              </Text>
            ) : null}
          </View>
        ) : (
          <Text style={styles.avisoErro}>
            Selecione uma monitoria concluída no histórico para avaliar.
          </Text>
        )}

        {PERGUNTAS_FEEDBACK.map((pergunta, index) => (
          <View key={pergunta.id} style={styles.questionBlock}>
            <Text style={styles.question}>
              {index + 1}. {pergunta.texto}
            </Text>
            <StarRating
              value={notas[pergunta.id] || 0}
              onChange={(v) => handleNota(pergunta.id, v)}
              disabled={jaEnviado || !monitoriaId}
            />
          </View>
        ))}

        <Text style={styles.question}>Comentário adicional (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Deixe uma sugestão ou observação..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          value={comentario}
          onChangeText={setComentario}
          editable={!jaEnviado && !!monitoriaId}
        />

        {!jaEnviado && monitoriaId ? (
          <TouchableOpacity
            style={[styles.button, enviando && styles.buttonDisabled]}
            onPress={handleEnviar}
            disabled={enviando}
          >
            {enviando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <FontAwesome name="send" size={20} color="white" />
                <Text style={styles.buttonText}>Enviar feedback</Text>
              </>
            )}
          </TouchableOpacity>
        ) : null}
      </ScrollView>

      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerTela: {
    flex: 1,
    backgroundColor: '#770B1C',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
    marginBottom: 12,
  },
  monitoriaInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  monitoriaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#770B1C',
  },
  monitoriaMeta: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  avisoEnviado: {
    marginTop: 8,
    fontSize: 13,
    color: '#2e7d32',
    fontWeight: '600',
  },
  avisoErro: {
    textAlign: 'center',
    color: '#c0392b',
    marginBottom: 16,
  },
  questionBlock: {
    marginBottom: 18,
  },
  question: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    marginBottom: 20,
    minHeight: 90,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#770B1C',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
