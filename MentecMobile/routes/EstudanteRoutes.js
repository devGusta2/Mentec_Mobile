import Servicos from "../Screens/Servicos";

import Cronograma from "../Screens/Cronograma";
import Perfil from "../Screens/Perfil";
import ListaMonitorias from "../Screens/ListaMonitorias";
// import Forum from "../Screens/Forum";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoricoMonitorias from "../Screens/HistoricoMonitorias";
import Forum from "../Screens/Forum";
import SAC from "../Screens/Sac";
import Conf from '../Screens/Conf'
import Feedback from "../Screens/Feedback";
import Inicio from "../Screens/Inicio";
import LoginScreen from "../Screens/Login";
import Cadastro from "../Screens/Cadastro";
const Stack = createNativeStackNavigator();

export function EstudanteRoutes() {
  return (
    <Stack.Navigator  initialRouteName="Servicos" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Servicos" component={Servicos} />
      <Stack.Screen name="ListaMonitorias" component={ListaMonitorias} />
      <Stack.Screen name="Cronograma" component={Cronograma} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Conf" component={Conf} />
      <Stack.Screen name="HistoricoMonitorias" component={HistoricoMonitorias} />
      <Stack.Screen name="Forum" component={Forum} />
      <Stack.Screen name="SAC" component={SAC} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
}
