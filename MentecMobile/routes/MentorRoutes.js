export function MentorRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaMentorias" component={ListaMonitorias} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
}
