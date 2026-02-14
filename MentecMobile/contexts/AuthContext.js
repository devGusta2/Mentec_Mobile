import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext({});



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  
  async function loadUser() {
    const token = await AsyncStorage.getItem('@mentec_token');
    const role = await AsyncStorage.getItem('@mentec_role');

    if (token && role) {
      setUser({ token, role });
    }

    setLoading(false);
  }

  const login = async (credentials) =>{
    try {
      const payload = {
        email: credentials.email,
        senha: credentials.senha

      };
 
      const response = await axios.post(`${API_URL}/login`, payload);

      await AsyncStorage.setItem('@mentec_token', response.data.accessToken);
      await AsyncStorage.setItem('@mentec_role', response.data.role);
      console.log(response.data)
      setUser({
        token: response.data.accessToken,
        role: response.data.role
      });

    } catch (e) {
      console.log(e);
      alert("Erro ao fazer login" + e.message);
    }
  }

  async function logout() {
    await AsyncStorage.clear();
    setUser(null);
  }



  const requireAuth = (navigation, redirectScreen) =>{
    if(!user){
      
      alert("Para continuar, é necessário estár logado em sua conta!")
         navigation.navigate("Login", {
        redirectTo: redirectScreen
      });
      return false
    }
    return true;
  }


  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
