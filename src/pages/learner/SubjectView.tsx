import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonBadge
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { supabase, Subject, Topic, Quiz } from '../../lib/supabase';
import { bookOutline, trophyOutline } from 'ionicons/icons';

const SubjectView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    loadSubjectData();
  }, [id]);

  const loadSubjectData = async () => {
    try {
      // Load subject
      const { data: subjectData, error: subjectError } = await supabase
        .from('subjects')
        .select('*')
        .eq('id', id)
        .single();

      if (subjectError) throw subjectError;
      setSubject(subjectData);

      // Load topics
      const { data: topicsData, error: topicsError } = await supabase
        .from('topics')
        .select('*')
        .eq('subject_id', id)
        .order('order_number');

      if (topicsError) throw topicsError;
      setTopics(topicsData || []);

      // Load quizzes
      const { data: quizzesData, error: quizzesError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('subject_id', id)
        .order('title');

      if (quizzesError) throw quizzesError;
      setQuizzes(quizzesData || []);
    } catch (error) {
      console.error('Error loading subject data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'medium';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>{subject?.name || 'Loading...'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {loading ? (
            <div className="ion-text-center ion-margin-top">
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {/* Topics Section */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={bookOutline} /> Study Materials
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {topics.length > 0 ? (
                    <IonList>
                      {topics.map((topic) => (
                        <IonItem key={topic.id} button detail>
                          <IonLabel>
                            <h3>{topic.title}</h3>
                            <p style={{ 
                              maxHeight: '40px', 
                              overflow: 'hidden',
                              textOverflow: 'ellipsis' 
                            }}>
                              {topic.content.substring(0, 100)}...
                            </p>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
                  ) : (
                    <p className="ion-text-center" style={{ color: '#666' }}>
                      No study materials available yet.
                    </p>
                  )}
                </IonCardContent>
              </IonCard>

              {/* Quizzes Section */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    <IonIcon icon={trophyOutline} /> Practice Quizzes
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {quizzes.length > 0 ? (
                    <IonList>
                      {quizzes.map((quiz) => (
                        <IonItem
                          key={quiz.id}
                          button
                          onClick={() => history.push(`/quiz/${quiz.id}`)}
                        >
                          <IonLabel>
                            <h3>{quiz.title}</h3>
                            <p>{quiz.description}</p>
                          </IonLabel>
                          <IonBadge color={getDifficultyColor(quiz.difficulty)} slot="end">
                            {quiz.difficulty}
                          </IonBadge>
                        </IonItem>
                      ))}
                    </IonList>
                  ) : (
                    <p className="ion-text-center" style={{ color: '#666' }}>
                      No quizzes available yet.
                    </p>
                  )}
                </IonCardContent>
              </IonCard>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SubjectView;
