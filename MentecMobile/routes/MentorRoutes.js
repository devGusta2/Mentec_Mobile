import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaMonitorias from '../Screens/ListaMonitorias';
import Feedback from '../Screens/Feedback';
import Perfil from '../Screens/Perfil';
import conf from '../Screens/Conf';
import ConfigConta from '../Screens/ConfigConta';
import RecuperarSenha from '../Screens/RecuperarSenha';
import Servicos from '../Screens/Servicos';
import Inicio from '../Screens/Inicio';

const Stack = createNativeStackNavigator();

export function MentorRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaMentorias" component={ListaMonitorias} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Servicos" component={Servicos} />
      <Stack.Screen name="conf" component={conf} />
      <Stack.Screen name="ConfigConta" component={ConfigConta} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name="Inicio" component={Inicio} />
    </Stack.Navigator>
  );
}
