import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getApiUrl } from '../Utils/AuthRequestProvider';
export const AuthContext = createContext({});



export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const API_URL = getApiUrl();

  
  async function loadUser() {
    const token = await AsyncStorage.getItem('@mentec_token');
    const role = await AsyncStorage.getItem('@mentec_role');
    const userid = await AsyncStorage.getItem('@mentec_userid');
    if (token && role) {
      setUser({
        token,
        role,
        userid
      });
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
      await AsyncStorage.setItem('@mentec_userid', response.data.idUser);
      console.log(response.data)
      setUser({
        token: response.data.accessToken,
        role: response.data.role,
        userid: response.data.idUser
      });

    } catch (e) {
      console.log(e);
      alert("Erro ao fazer login" + e.message);
    }
  }

  async function logout() {
    navigation.navigate('Inicio'); 
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
