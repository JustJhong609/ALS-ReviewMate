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
  IonBackButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonProgressBar
} from '@ionic/react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Subject } from '../../lib/supabase';

interface SubjectProgress {
  subject: Subject;
  averageScore: number;
  attemptCount: number;
  lastAttempt?: string;
  mastery: number;
}

const Progress: React.FC = () => {
  const { user } = useAuth();
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress[]>([]);
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [user]);

  const loadProgress = async () => {
    try {
      // Load all subjects
      const { data: subjects, error: subjectsError } = await supabase
        .from('subjects')
        .select('*')
        .order('name');

      if (subjectsError) throw subjectsError;

      // Load quiz attempts
      const { data: attempts, error: attemptsError } = await supabase
        .from('quiz_attempts')
        .select(`
          *,
          quizzes (
            title,
            subject_id,
            subjects (
              name,
              icon
            )
          )
        `)
        .eq('user_id', user!.id)
        .order('completed_at', { ascending: false })
        .limit(10);

      if (attemptsError) throw attemptsError;
      setRecentAttempts(attempts || []);

      // Calculate progress for each subject
      const progressData: SubjectProgress[] = await Promise.all(
        (subjects || []).map(async (subject) => {
          const { data: subjectAttempts } = await supabase
            .from('quiz_attempts')
            .select('*, quizzes!inner(subject_id)')
            .eq('user_id', user!.id)
            .eq('quizzes.subject_id', subject.id);

          const attemptCount = subjectAttempts?.length || 0;
          const averageScore = attemptCount > 0
            ? subjectAttempts!.reduce((sum, a) => sum + a.percentage, 0) / attemptCount
            : 0;

          const lastAttempt = subjectAttempts && subjectAttempts.length > 0
            ? subjectAttempts[0].completed_at
            : undefined;

          // Get mastery level from progress table
          const { data: progressData } = await supabase
            .from('progress')
            .select('mastery_level')
            .eq('user_id', user!.id)
            .eq('subject_id', subject.id)
            .maybeSingle();

          return {
            subject,
            averageScore,
            attemptCount,
            lastAttempt,
            mastery: progressData?.mastery_level || 0
          };
        })
      );

      setSubjectProgress(progressData);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'success';
    if (mastery >= 60) return 'warning';
    return 'danger';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not started';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>My Progress</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {loading ? (
            <div className="ion-text-center ion-margin-top">
              <p>Loading progress...</p>
            </div>
          ) : (
            <>
              {/* Overall Progress */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>📊 Subject Progress</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {subjectProgress.map((sp) => (
                      <IonItem key={sp.subject.id}>
                        <div slot="start" style={{ fontSize: '32px' }}>
                          {sp.subject.icon}
                        </div>
                        <IonLabel>
                          <h3>{sp.subject.name}</h3>
                          <p>
                            {sp.attemptCount} quiz{sp.attemptCount !== 1 ? 'zes' : ''} taken
                            {sp.attemptCount > 0 && ` • Avg: ${sp.averageScore.toFixed(1)}%`}
                          </p>
                          <p style={{ fontSize: '12px', color: '#666' }}>
                            Last attempt: {formatDate(sp.lastAttempt)}
                          </p>
                          <IonProgressBar
                            value={sp.mastery / 100}
                            color={getMasteryColor(sp.mastery)}
                            style={{ marginTop: '8px' }}
                          />
                        </IonLabel>
                        <IonBadge color={getMasteryColor(sp.mastery)} slot="end">
                          {sp.mastery.toFixed(0)}%
                        </IonBadge>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>

              {/* Recent Attempts */}
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>📝 Recent Quiz Attempts</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {recentAttempts.length > 0 ? (
                    <IonList>
                      {recentAttempts.map((attempt) => (
                        <IonItem key={attempt.id}>
                          <div slot="start" style={{ fontSize: '24px' }}>
                            {(attempt.quizzes as any)?.subjects?.icon}
                          </div>
                          <IonLabel>
                            <h3>{(attempt.quizzes as any)?.title}</h3>
                            <p>{(attempt.quizzes as any)?.subjects?.name}</p>
                            <p style={{ fontSize: '12px', color: '#666' }}>
                              {formatDate(attempt.completed_at)}
                            </p>
                          </IonLabel>
                          <IonBadge 
                            color={attempt.percentage >= 60 ? 'success' : 'danger'}
                            slot="end"
                          >
                            {attempt.percentage.toFixed(1)}%
                          </IonBadge>
                        </IonItem>
                      ))}
                    </IonList>
                  ) : (
                    <p className="ion-text-center" style={{ color: '#666' }}>
                      No quiz attempts yet. Start taking quizzes to track your progress!
                    </p>
                  )}
                </IonCardContent>
              </IonCard>

              {/* Study Tips */}
              <IonCard color="light">
                <IonCardHeader>
                  <IonCardTitle>💡 Study Tips</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li>Focus on subjects with lower mastery levels</li>
                    <li>Retake quizzes to improve your scores</li>
                    <li>Review explanations for incorrect answers</li>
                    <li>Practice regularly to maintain progress</li>
                    <li>Aim for at least 80% mastery in all subjects</li>
                  </ul>
                </IonCardContent>
              </IonCard>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Progress;
