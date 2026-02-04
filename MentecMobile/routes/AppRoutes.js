import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return <AuthRoutes />;
  }

  switch (user.role) {
    case 'STUDENT_FATEC':
      return <EstudanteRoutes />;

    case 'MENTOR':
      return <MentorRoutes />;

    case 'PROFESSOR':
      return <ProfessorRoutes />;

    default:
      return <AuthRoutes />;
  }
}
