import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const CATEGORIAS = {
  MONITORIAS: 'monitorias',
  FORUM: 'forum',
  SAC: 'sac',
};

export const STORAGE_KEYS = {
  ativas: '@mentec_notificacoes',
  monitorias: '@mentec_notif_monitorias',
  forum: '@mentec_notif_forum',
  sac: '@mentec_notif_sac',
  historico: '@mentec_notif_historico',
  antecedencia: '@mentec_notif_antecedencia',
};

const CATEGORIA_KEYS = {
  [CATEGORIAS.MONITORIAS]: STORAGE_KEYS.monitorias,
  [CATEGORIAS.FORUM]: STORAGE_KEYS.forum,
  [CATEGORIAS.SAC]: STORAGE_KEYS.sac,
};

const MAX_HISTORICO = 5;

function parseBool(value, defaultValue = true) {
  if (value === null || value === undefined) return defaultValue;
  return value === 'true';
}

export async function notificacoesAtivas() {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.ativas);
  return parseBool(value, true);
}

export async function categoriaAtiva(categoria) {
  const key = CATEGORIA_KEYS[categoria];
  if (!key) return true;
  const value = await AsyncStorage.getItem(key);
  return parseBool(value, true);
}

export async function podeNotificar(categoria = null) {
  const geral = await notificacoesAtivas();
  if (!geral) return false;
  if (!categoria) return true;
  return categoriaAtiva(categoria);
}

export async function mostrarAlerta(titulo, mensagem, categoria = null) {
  if (!(await podeNotificar(categoria))) return;
  Alert.alert(titulo, mensagem);
}

export async function mostrarAlertaSempre(titulo, mensagem) {
  Alert.alert(titulo, mensagem);
}

export async function adicionarAoHistorico(titulo, subtitulo = '') {
  if (!(await notificacoesAtivas())) return;

  const raw = await AsyncStorage.getItem(STORAGE_KEYS.historico);
  const lista = raw ? JSON.parse(raw) : [];

  const duplicado = lista.some(
    (i) => i.titulo === titulo && i.subtitulo === subtitulo
  );
  if (duplicado) return lista;

  const item = {
    id: Date.now().toString(),
    titulo,
    subtitulo,
    data: new Date().toISOString(),
  };

  const novaLista = [item, ...lista].slice(0, MAX_HISTORICO);
  await AsyncStorage.setItem(STORAGE_KEYS.historico, JSON.stringify(novaLista));
  return novaLista;
}

export async function obterHistorico() {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.historico);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function limparHistorico() {
  await AsyncStorage.removeItem(STORAGE_KEYS.historico);
}

export async function getAntecedencia() {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.antecedencia);
  return value === '1d' ? '1d' : '1h';
}

export async function setAntecedencia(value) {
  await AsyncStorage.setItem(STORAGE_KEYS.antecedencia, value);
}

export async function setCategoriaAtiva(categoria, ativa) {
  const key = CATEGORIA_KEYS[categoria];
  if (key) {
    await AsyncStorage.setItem(key, String(ativa));
  }
}

export async function carregarPreferencias() {
  const [ativas, monitorias, forum, sac, antecedencia] = await Promise.all([
    AsyncStorage.getItem(STORAGE_KEYS.ativas),
    AsyncStorage.getItem(STORAGE_KEYS.monitorias),
    AsyncStorage.getItem(STORAGE_KEYS.forum),
    AsyncStorage.getItem(STORAGE_KEYS.sac),
    AsyncStorage.getItem(STORAGE_KEYS.antecedencia),
  ]);

  return {
    ativas: parseBool(ativas, true),
    monitorias: parseBool(monitorias, true),
    forum: parseBool(forum, true),
    sac: parseBool(sac, true),
    antecedencia: antecedencia === '1d' ? '1d' : '1h',
  };
}

function formatarData(iso) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatarDataHistorico(iso) {
  return formatarData(iso);
}

/** Registra lembretes no histórico com base na data YYYY-MM-DD do agendamento */
export async function registrarLembretesMonitoria(agendamentos = []) {
  if (!(await podeNotificar(CATEGORIAS.MONITORIAS))) return;

  const antecedencia = await getAntecedencia();
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  for (const item of agendamentos) {
    if (!item?.data) continue;

    const [ano, mes, dia] = item.data.split('-').map(Number);
    const dataEvento = new Date(ano, mes - 1, dia);
    dataEvento.setHours(0, 0, 0, 0);

    const diffDias = Math.round((dataEvento - hoje) / (1000 * 60 * 60 * 24));

    if (diffDias === 0) {
      await adicionarAoHistorico(
        'Monitoria hoje',
        item.titulo || item.data
      );
    } else if (diffDias === 1 && antecedencia === '1d') {
      await adicionarAoHistorico(
        'Monitoria amanhã',
        item.titulo || item.data
      );
    }
  }
}
