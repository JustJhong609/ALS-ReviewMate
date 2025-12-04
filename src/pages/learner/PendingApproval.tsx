import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/react';
import { hourglassOutline, logOutOutline } from 'ionicons/icons';
import { useAuth } from '../../contexts/AuthContext';

const PendingApproval: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>ALS ReviewMate</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh' 
        }}>
          <IonCard style={{ maxWidth: '600px', width: '100%' }}>
            <IonCardContent className="ion-text-center ion-padding">
              <IonIcon 
                icon={hourglassOutline} 
                style={{ fontSize: '100px', color: '#ffc409' }}
              />
              <h1>Account Pending Approval</h1>
              <p style={{ fontSize: '16px', color: '#666', marginTop: '20px' }}>
                Welcome, <strong>{user?.full_name}</strong>!
              </p>
              <p style={{ fontSize: '16px', color: '#666' }}>
                Your registration has been received. Please wait for a teacher to approve your account 
                before you can access the learning materials and quizzes.
              </p>
              <p style={{ fontSize: '14px', color: '#999', marginTop: '20px' }}>
                You will receive access once your teacher approves your registration. 
                You can check back later or contact your teacher for updates.
              </p>
              
              <IonButton 
                expand="block" 
                fill="outline" 
                onClick={handleLogout}
                className="ion-margin-top"
              >
                <IonIcon slot="start" icon={logOutOutline} />
                Logout
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PendingApproval;
