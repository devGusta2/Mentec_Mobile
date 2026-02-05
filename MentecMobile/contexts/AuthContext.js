import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export const AuthContext = createContext({});



  const API_URL = "localhost:8082"

  export const login = async (credentials) =>{



    try{
      const payload = {
        senha: credentials.senha,
        email: credentials.email
      }
      respone = await axios.post(`${API_URL}/login`,payload)
    }catch(e){
      alert("Erro ao fazer login")
    }
  }



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = await AsyncStorage.getItem('@mentec_token');
    const role  = await AsyncStorage.getItem('@mentec_role');

    if (token && role) {
      setUser({ token, role });
    }
    setLoading(false);
  }

  async function login(token, role) {
    await AsyncStorage.setItem('@mentec_token', token);
    await AsyncStorage.setItem('@mentec_role', role);
    setUser({ token, role });
  }

  async function logout() {
    await AsyncStorage.clear();
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
