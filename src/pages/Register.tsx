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

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role] = useState<'learner' | 'teacher'>('learner'); // Always learner, teachers added manually
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { signUp } = useAuth();
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName || fullName.trim().length < 3) {
      setError('Full name must be at least 3 characters');
      setShowToast(true);
      return;
    }

    if (!username || username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      setShowToast(true);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setShowToast(true);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowToast(true);
      return;
    }

    try {
      // Use username directly for email
      const fakeEmail = `${username.toLowerCase()}@gmail.com`;
      await signUp(fakeEmail, password, fullName, role, username);
      setSuccess('Registration successful! Your account is pending teacher approval.');
      setShowToast(true);
      setTimeout(() => {
        history.push('/login');
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
                  <IonLabel position="stacked">Full Name *</IonLabel>
                  <IonInput
                    type="text"
                    value={fullName}
                    onIonChange={(e: any) => setFullName(e.detail.value!)}
                    placeholder="Enter your full name"
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Username *</IonLabel>
                  <IonInput
                    type="text"
                    value={username}
                    onIonChange={(e: any) => setUsername(e.detail.value!)}
                    placeholder="Choose a unique username"
                    required
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Password *</IonLabel>
                  <IonInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onIonChange={(e: any) => setPassword(e.detail.value!)}
                    placeholder="At least 6 characters"
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

                <IonItem>
                  <IonLabel position="stacked">Confirm Password *</IonLabel>
                  <IonInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onIonChange={(e: any) => setConfirmPassword(e.detail.value!)}
                    placeholder="Re-enter your password"
                    required
                  />
                  <IonButton
                    fill="clear"
                    slot="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <IonIcon icon={showConfirmPassword ? eyeOff : eye} />
                  </IonButton>
                </IonItem>

                <IonButton expand="block" type="submit" className="ion-margin-top">
                  Register
                </IonButton>
              </form>

              <div className="ion-text-center ion-margin-top">
                <p>Already have an account?</p>
                <IonButton fill="clear" onClick={() => history.push('/login')}>
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
