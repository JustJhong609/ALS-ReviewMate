import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButtons
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Subject } from '../../lib/supabase';
import { logOutOutline, statsChartOutline } from 'ionicons/icons';

const LearnerDashboard: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const history = useHistory();

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name');

      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error('Error loading subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>ALS ReviewMate - Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/progress')}>
              <IonIcon icon={statsChartOutline} />
            </IonButton>
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <h2>Welcome, {user?.full_name}! 👋</h2>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  Choose a subject to start reviewing
                </p>
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>

          {loading ? (
            <div className="ion-text-center ion-margin-top">
              <p>Loading subjects...</p>
            </div>
          ) : (
            <IonGrid>
              <IonRow>
                {subjects.map((subject) => (
                  <IonCol size="12" sizeMd="6" sizeLg="4" key={subject.id}>
                    <IonCard
                      button
                      onClick={() => history.push(`/subject/${subject.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <IonCardHeader>
                        <div style={{ fontSize: '48px', textAlign: 'center' }}>
                          {subject.icon}
                        </div>
                        <IonCardTitle className="ion-text-center">
                          {subject.name}
                        </IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent className="ion-text-center">
                        <p style={{ fontSize: '14px', color: '#666' }}>
                          {subject.description}
                        </p>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LearnerDashboard;
