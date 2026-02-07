import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


import AuthRoutes from './AuthRoutes';
import { EstudanteRoutes } from './EstudanteRoutes';
import { MentorRoutes } from './MentorRoutes';
import { ProfessorRoutes } from './ProfessorRoutes';


export default function AppRoutes() {
  console.log("AuthRoutes:", AuthRoutes);
console.log("EstudanteRoutes:", EstudanteRoutes);
console.log("MentorRoutes:", MentorRoutes);
console.log("ProfessorRoutes:", ProfessorRoutes);

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
