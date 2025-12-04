import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToast,
  IonIcon
} from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { signIn } = useAuth();
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let emailToUse = usernameOrEmail;
      
      // If it doesn't look like an email, convert username to email format
      if (!usernameOrEmail.includes('@')) {
        emailToUse = `${usernameOrEmail.toLowerCase()}@gmail.com`;
      }
      
      await signIn(emailToUse, password);
      
      // Get the user's profile to check their role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        // Redirect based on role
        if (profile?.role === 'teacher') {
          history.push('/teacher/dashboard');
        } else {
          history.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>ALS ReviewMate - Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '500px', margin: '40px auto' }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                <h1>🎓 Welcome Back</h1>
                <p style={{ fontSize: '14px', color: '#666' }}>Sign in to continue your learning journey</p>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleLogin}>
                <IonItem>
                  <IonLabel position="stacked">Username or Email</IonLabel>
                  <IonInput
                    type="text"
                    value={usernameOrEmail}
                    onIonChange={(e: any) => setUsernameOrEmail(e.detail.value!)}
                    placeholder="Enter your username or email"
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onIonChange={(e: any) => setPassword(e.detail.value!)}
                    required
                  />
                  <IonButton
                    fill="clear"
                    slot="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <IonIcon icon={showPassword ? eyeOff : eye} />
                  </IonButton>
                </IonItem>

                <IonButton expand="block" type="submit" className="ion-margin-top">
                  Login
                </IonButton>
              </form>

              <div className="ion-text-center ion-margin-top">
                <p>Don't have an account?</p>
                <IonButton fill="clear" onClick={() => history.push('/register')}>
                  Register Here
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={error}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
