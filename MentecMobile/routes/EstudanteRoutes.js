import Servicos from "../Screens/Servicos";
import Cronograma from "../Screens/Cronograma";
import Perfil from "../Screens/Perfil";
import ListaMonitorias from "../Screens/ListaMonitorias";
import conf from "../Screens/Conf";
import ConfigConta from "../Screens/ConfigConta";
import RecuperarSenha from "../Screens/RecuperarSenha";
import Feedback from "../Screens/Feedback";
import HistoricoMonitorias from "../Screens/HistoricoMonitorias";
import SAC from "../Screens/Sac";
import Inicio from "../Screens/Inicio";
// import Forum from "../Screens/Forum";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function EstudanteRoutes() {
  return (
    <Stack.Navigator  initialRouteName="ListaMonitorias" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Servicos" component={Servicos} />
      <Stack.Screen name="ListaMonitorias" component={ListaMonitorias} />
      <Stack.Screen name="Cronograma" component={Cronograma} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="conf" component={conf} />
      <Stack.Screen name="ConfigConta" component={ConfigConta} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="HistoricoMonitorias" component={HistoricoMonitorias} />
      <Stack.Screen name="SAC" component={SAC} />
      <Stack.Screen name="Inicio" component={Inicio} />
      {/* <Stack.Screen name="Forum" component={Forum} /> */}

    </Stack.Navigator>
  );
}
