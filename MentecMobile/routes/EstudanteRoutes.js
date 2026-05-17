import Servicos from "../Screens/Servicos";

import Cronograma from "../Screens/Cronograma";
import Perfil from "../Screens/Perfil";
import ListaMonitorias from "../Screens/ListaMonitorias";
// import Forum from "../Screens/Forum";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoricoMonitorias from "../Screens/HistoricoMonitorias";
import Forum from "../Screens/Forum";

const Stack = createNativeStackNavigator();

export function EstudanteRoutes() {
  return (
    <Stack.Navigator  initialRouteName="Servicos" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Servicos" component={Servicos} />
      <Stack.Screen name="ListaMonitorias" component={ListaMonitorias} />
      <Stack.Screen name="Cronograma" component={Cronograma} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="HistoricoMonitorias" component={HistoricoMonitorias} />
      <Stack.Screen name="Forum" component={Forum} />

    </Stack.Navigator>
  );
}
