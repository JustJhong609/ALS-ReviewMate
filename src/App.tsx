import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import LearnerDashboard from './pages/learner/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import SubjectView from './pages/learner/SubjectView';
import QuizPage from './pages/learner/QuizPage';
import Progress from './pages/learner/Progress';

setupIonicReact();

const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {user && user.role === 'learner' && (
          <>
            <Route path="/dashboard" element={<LearnerDashboard />} />
            <Route path="/subject/:id" element={<SubjectView />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/progress" element={<Progress />} />
          </>
        )}
        
        {user && user.role === 'teacher' && (
          <>
            <Route path="/dashboard" element={<TeacherDashboard />} />
          </>
        )}
        
        <Route path="/" element={
          user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </IonApp>
  );
};

export default App;
