import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext({});

const STORAGE_KEYS = {
  nome: '@mentec_user_nome',
  telefone: '@mentec_user_telefone',
  email: '@mentec_user_email',
};

export function UserProvider({ children }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  const loadDados = useCallback(async () => {
    const [nomeSalvo, telefoneSalvo, emailSalvo] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.nome),
      AsyncStorage.getItem(STORAGE_KEYS.telefone),
      AsyncStorage.getItem(STORAGE_KEYS.email),
    ]);

    setNome(nomeSalvo || '');
    setTelefone(telefoneSalvo || '');
    setEmail(emailSalvo || '');
  }, []);

  async function salvarDados(novoNome, novoTelefone) {
    setNome(novoNome);
    setTelefone(novoTelefone);

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.nome, novoNome],
      [STORAGE_KEYS.telefone, novoTelefone],
    ]);
  }

  async function setEmailUsuario(emailUsuario) {
    setEmail(emailUsuario);
    await AsyncStorage.setItem(STORAGE_KEYS.email, emailUsuario);
  }

  useEffect(() => {
    loadDados();
  }, [loadDados]);

  return (
    <UserContext.Provider
      value={{ nome, telefone, email, salvarDados, setEmailUsuario, loadDados }}
    >
      {children}
    </UserContext.Provider>
  );
}
