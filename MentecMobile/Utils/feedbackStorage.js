import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERGUNTAS_FEEDBACK } from '../constants/feedbackPerguntas';

const STORAGE_KEY = '@mentec_feedbacks_monitoria';

export function calcularMedia(respostas) {
  const notas = Object.values(respostas).filter((n) => typeof n === 'number' && n > 0);
  if (notas.length === 0) return 0;
  const soma = notas.reduce((acc, n) => acc + n, 0);
  return Math.round((soma / notas.length) * 10) / 10;
}

export function calcularMediaPorGrupo(respostas, grupo) {
  const ids = PERGUNTAS_FEEDBACK.filter((p) => p.grupo === grupo).map((p) => p.id);
  const notas = ids.map((id) => respostas[id]).filter((n) => n > 0);
  if (notas.length === 0) return 0;
  return Math.round((notas.reduce((a, b) => a + b, 0) / notas.length) * 10) / 10;
}

export function montarPayload({ monitoriaId, alunoId, titulo, respostas, comentario }) {
  const respostasLista = PERGUNTAS_FEEDBACK.map((p) => ({
    perguntaId: p.id,
    pergunta: p.texto,
    nota: respostas[p.id] ?? 0,
    grupo: p.grupo,
  }));

  return {
    monitoriaId,
    alunoId,
    tituloMonitoria: titulo || '',
    respostas: respostasLista,
    mediaGeral: calcularMedia(respostas),
    mediaMonitoria: calcularMediaPorGrupo(respostas, 'monitoria'),
    mediaApp: calcularMediaPorGrupo(respostas, 'app'),
    comentario: comentario?.trim() || null,
    criadoEm: new Date().toISOString(),
  };
}

async function obterTodos() {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function feedbackJaEnviado(monitoriaId, alunoId) {
  const todos = await obterTodos();
  const chave = `${monitoriaId}_${alunoId}`;
  return Boolean(todos[chave]);
}

export async function salvarFeedbackLocal(payload) {
  const todos = await obterTodos();
  const chave = `${payload.monitoriaId}_${payload.alunoId}`;
  todos[chave] = payload;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  return payload;
}

export async function obterFeedbackMonitoria(monitoriaId, alunoId) {
  const todos = await obterTodos();
  return todos[`${monitoriaId}_${alunoId}`] || null;
}
