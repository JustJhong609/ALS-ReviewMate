import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import LearnerDashboard from './pages/learner/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import SubjectView from './pages/learner/SubjectView';
import QuizPage from './pages/learner/QuizPage';
import Progress from './pages/learner/Progress';
import PendingApproval from './pages/learner/PendingApproval';

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
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/pending-approval" component={PendingApproval} exact />
        <Route path="/dashboard" component={LearnerDashboard} exact />
        <Route path="/subject/:id" component={SubjectView} exact />
        <Route path="/quiz/:id" component={QuizPage} exact />
        <Route path="/progress" component={Progress} exact />
        <Route path="/teacher/dashboard" component={TeacherDashboard} exact />
        <Route path="/" exact render={() => {
          if (!user) return <Redirect to="/login" />;
          if (user.role === 'teacher') return <Redirect to="/teacher/dashboard" />;
          if (user.role === 'learner' && !user.approved) return <Redirect to="/pending-approval" />;
          return <Redirect to="/dashboard" />;
        }} />
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
