import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Inicio from "../Screens/Inicio";
import Login from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
import VerifyCode from "../Screens/VerifyCode";
import Sac from '../Screens/Sac'
import Servicos from '../Screens/Servicos'
const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="Sac" component={Sac} />
      <Stack.Screen name="Servicos" component={Servicos} />
    </Stack.Navigator>
  );
}
