import Servicos from "../Screens/Servicos";

import Cronograma from "../Screens/Cronograma";
import Perfil from "../Screens/Perfil";
import ListaMonitorias from "../Screens/ListaMonitorias";
import AgendamentoMonitoria from "../Screens/AgendamentoMonitoria";
// import Forum from "../Screens/Forum";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function EstudanteRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Servicos" component={Servicos} />
      <Stack.Screen name="ListaMentorias" component={ListaMonitorias} />
      <Stack.Screen name="AgendamentoMonitoria" component={AgendamentoMonitoria} />
      <Stack.Screen name="Cronograma" component={Cronograma} />
      <Stack.Screen name="Perfil" component={Perfil} />
      {/* <Stack.Screen name="Forum" component={Forum} /> */}

    </Stack.Navigator>
  );
}
