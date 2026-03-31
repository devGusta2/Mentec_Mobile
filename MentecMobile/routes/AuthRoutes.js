import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "../Screens/Inicio";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import VerifyCode from "../Screens/VerifyCode";
import Cronograma from "../Screens/Cronograma";
import Perfil from '../Screens/Perfil';
import ListaMonitorias from "../Screens/ListaMonitorias";
import AgendamentoMonitoria from "../Screens/AgendamentoMonitoria";
import Forum from '../Screens/Forum';
import Servicos from "../Screens/Servicos";
import Feedback from '../Screens/Feedback';
import HistoricoMonitorias from '../Screens/HistoricoMonitorias';
import SAC from '../Screens/SAC';
import conf from '../Screens/conf';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Servicos" component={Servicos} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Cronograma" component={Cronograma} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="ListaMonitorias" component={ListaMonitorias} />
      <Stack.Screen name="AgendamentoMonitoria" component={AgendamentoMonitoria} />
      <Stack.Screen name="HistoricoMonitorias" component={HistoricoMonitorias} />
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="SAC" component={SAC} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="conf" component={conf} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>
  );
}