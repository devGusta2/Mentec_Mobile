import { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

import AuthRoutes from './AuthRoutes';
import { EstudanteRoutes } from './EstudanteRoutes';
import { MentorRoutes } from './MentorRoutes';
import { ProfessorRoutes } from './ProfessorRoutes';

export default function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!user || !user.role) {
    return <AuthRoutes />;
  }

  switch (user.role) {
    case 'ESTUDANTEFATEC':
      return <EstudanteRoutes />;

    case 'MENTOR':
      return <MentorRoutes />;

    case 'PROFESSOR':
      return <ProfessorRoutes />;

    default:
      return <AuthRoutes />;
  }
}
