import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicio from './Screens/Inicio';
import Login from './Screens/Login';
import Cadastro from './Screens/Cadastro';
import VerifyCode from './Screens/VerifyCode';
import Cronograma from "./Screens/Cronograma";
import Perfil from "./Screens/Perfil";
import ListaMonitorias from "./Screens/ListaMonitorias";
import AgendamentoMonitoria from "./Screens/AgendamentoMonitoria";
import Forum from "./Screens/Forum";
import Servicos from "./Screens/Servicos";
import SAC from "./Screens/SAC";
import Conf from './Screens/conf';
import HistoricoMonitorias from './Screens/HistoricoMonitorias';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="VerifyCode" component={VerifyCode} />

        <Stack.Screen name="Servicos" component={Servicos} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="ListaMonitorias" component={ListaMonitorias} />
        <Stack.Screen name="Cronograma" component={Cronograma} />
        <Stack.Screen name="AgendamentoMonitoria" component={AgendamentoMonitoria} />
        <Stack.Screen name="Forum" component={Forum} />
        <Stack.Screen name="SAC" component={SAC} />
        <Stack.Screen name="Configuracao" component={Conf} />
        <Stack.Screen name="HistoricoMonitorias" component={HistoricoMonitorias} />
               

      </Stack.Navigator>
    </NavigationContainer>
  );
}