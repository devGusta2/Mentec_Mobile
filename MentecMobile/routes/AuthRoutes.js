import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "../Screens/Inicio";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import VerifyCode from "../Screens/VerifyCode";
import Cronograma from "../Screens/Cronograma";
import Perfil from "../Screens/perfil";
import ListaMonitorias from "../Screens/listaMonitorias";
import AgendamentoMonitoria from "../Screens/agendamentoMonitoria";
import Forum from '../Screens/Forum'
import Servicos from "../Screens/Servicos";
const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Servicos" component={Servicos} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Cronograma" component={Cronograma} />
      <Stack.Screen name="perfil" component={Perfil} />
      <Stack.Screen name="listaMonitorias" component={ListaMonitorias} />
      <Stack.Screen name="agendamentoMonitoria" component={AgendamentoMonitoria} />
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>
  );
}
