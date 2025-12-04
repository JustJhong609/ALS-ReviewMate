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
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'learner' | 'teacher'>('learner');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setShowToast(true);
      return;
    }

    try {
      await signUp(email, password, fullName, role);
      setSuccess('Registration successful! Please check your email to verify your account.');
      setShowToast(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>ALS ReviewMate - Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '500px', margin: '40px auto' }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                <h1>📝 Create Account</h1>
                <p style={{ fontSize: '14px', color: '#666' }}>Join ALS ReviewMate today</p>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleRegister}>
                <IonItem>
                  <IonLabel position="stacked">Full Name</IonLabel>
                  <IonInput
                    type="text"
                    value={fullName}
                    onIonChange={(e: any) => setFullName(e.detail.value!)}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e: any) => setEmail(e.detail.value!)}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e: any) => setPassword(e.detail.value!)}
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">I am a...</IonLabel>
                  <IonSelect
                    value={role}
                    onIonChange={(e: any) => setRole(e.detail.value)}
                  >
                    <IonSelectOption value="learner">Learner</IonSelectOption>
                    <IonSelectOption value="teacher">Teacher</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonButton expand="block" type="submit" className="ion-margin-top">
                  Register
                </IonButton>
              </form>

              <div className="ion-text-center ion-margin-top">
                <p>Already have an account?</p>
                <IonButton fill="clear" onClick={() => navigate('/login')}>
                  Login Here
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={error || success}
          duration={3000}
          color={error ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};

export default Register;
