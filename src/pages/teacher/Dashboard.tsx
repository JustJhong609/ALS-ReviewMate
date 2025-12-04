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
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { logOutOutline, peopleOutline, statsChartOutline, schoolOutline } from 'ionicons/icons';

interface StudentStats {
  id: string;
  full_name: string;
  email: string;
  totalAttempts: number;
  averageScore: number;
  weakSubjects: string[];
}

interface SubjectAnalytics {
  subjectName: string;
  icon: string;
  totalAttempts: number;
  averageScore: number;
  studentCount: number;
}

const TeacherDashboard: React.FC = () => {
  const [segment, setSegment] = useState<'overview' | 'students' | 'pending' | 'subjects'>('pending');
  const [students, setStudents] = useState<StudentStats[]>([]);
  const [pendingStudents, setPendingStudents] = useState<any[]>([]);
  const [subjectAnalytics, setSubjectAnalytics] = useState<SubjectAnalytics[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const history = useHistory();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load ALL students (approved and pending)
      const { data: studentsData, error: studentsError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'learner');

      if (studentsError) throw studentsError;
      setTotalStudents(studentsData?.filter(s => s.approved).length || 0);
      
      // Load pending students
      const pending = studentsData?.filter(s => !s.approved) || [];
      setPendingStudents(pending);

      // Load quizzes count
      const { count, error: quizzesError } = await supabase
        .from('quizzes')
        .select('*', { count: 'exact', head: true });

      if (quizzesError) throw quizzesError;
      setTotalQuizzes(count || 0);

      // Load student statistics
      const studentStats = await Promise.all(
        (studentsData || []).map(async (student) => {
          const { data: attempts } = await supabase
            .from('quiz_attempts')
            .select(`
              *,
              quizzes (
                subject_id,
                subjects (
                  name
                )
              )
            `)
            .eq('user_id', student.id);

          const totalAttempts = attempts?.length || 0;
          const averageScore = totalAttempts > 0
            ? attempts!.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts
            : 0;

          // Find weak subjects (below 60%)
          const subjectScores: Record<string, number[]> = {};
          attempts?.forEach((attempt: any) => {
            const subjectName = attempt.quizzes?.subjects?.name;
            if (subjectName) {
              if (!subjectScores[subjectName]) {
                subjectScores[subjectName] = [];
              }
              subjectScores[subjectName].push(attempt.percentage);
            }
          });

          const weakSubjects = Object.entries(subjectScores)
            .filter(([_, scores]) => {
              const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
              return avg < 60;
            })
            .map(([name, _]) => name);

          return {
            id: student.id,
            full_name: student.full_name,
            email: student.email,
            totalAttempts,
            averageScore,
            weakSubjects
          };
        })
      );

      setStudents(studentStats);

      // Load subject analytics
      const { data: subjects } = await supabase
        .from('subjects')
        .select('*');

      const analytics = await Promise.all(
        (subjects || []).map(async (subject) => {
          const { data: attempts } = await supabase
            .from('quiz_attempts')
            .select(`
              *,
              quizzes!inner(subject_id)
            `)
            .eq('quizzes.subject_id', subject.id);

          const totalAttempts = attempts?.length || 0;
          const averageScore = totalAttempts > 0
            ? attempts!.reduce((sum, a) => sum + a.percentage, 0) / totalAttempts
            : 0;

          // Count unique students
          const uniqueStudents = new Set(attempts?.map(a => a.user_id) || []);

          return {
            subjectName: subject.name,
            icon: subject.icon,
            totalAttempts,
            averageScore,
            studentCount: uniqueStudents.size
          };
        })
      );

      setSubjectAnalytics(analytics);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveStudent = async (studentId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          approved: true,
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', studentId);

      if (error) throw error;
      
      // Reload dashboard data
      await loadDashboardData();
    } catch (error) {
      console.error('Error approving student:', error);
      alert('Failed to approve student');
    }
  };

  const handleRejectStudent = async (studentId: string) => {
    try {
      // Delete the user profile and auth user
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', studentId);

      if (error) throw error;
      
      // Reload dashboard data
      await loadDashboardData();
    } catch (error) {
      console.error('Error rejecting student:', error);
      alert('Failed to reject student');
    }
  };

  const handleLogout = async () => {
    await signOut();
    history.push('/login');
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Teacher Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={segment} onIonChange={(e: any) => setSegment(e.detail.value as any)}>
            <IonSegmentButton value="pending">
              <IonLabel>
                Pending {pendingStudents.length > 0 && `(${pendingStudents.length})`}
              </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="overview">
              <IonLabel>Overview</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="students">
              <IonLabel>Students</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="subjects">
              <IonLabel>Subjects</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div className="ion-text-center ion-margin-top">
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <>
              {segment === 'pending' && (
                <>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>⏳ Pending Student Approvals</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {pendingStudents.length === 0 ? (
                        <p className="ion-text-center" style={{ color: '#666', padding: '20px' }}>
                          No pending student registrations
                        </p>
                      ) : (
                        <IonList>
                          {pendingStudents.map((student) => (
                            <IonItem key={student.id}>
                              <IonLabel>
                                <h2>{student.full_name}</h2>
                                <p>{student.email}</p>
                                <p style={{ fontSize: '12px', color: '#999' }}>
                                  Registered: {new Date(student.created_at).toLocaleDateString()}
                                </p>
                              </IonLabel>
                              <IonButton 
                                color="success" 
                                onClick={() => handleApproveStudent(student.id)}
                                slot="end"
                              >
                                Approve
                              </IonButton>
                              <IonButton 
                                color="danger" 
                                fill="outline"
                                onClick={() => {
                                  if (window.confirm(`Reject ${student.full_name}? This will delete their account.`)) {
                                    handleRejectStudent(student.id);
                                  }
                                }}
                                slot="end"
                              >
                                Reject
                              </IonButton>
                            </IonItem>
                          ))}
                        </IonList>
                      )}
                    </IonCardContent>
                  </IonCard>
                </>
              )}

              {segment === 'overview' && (
                <>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Welcome, {user?.full_name}! 👋</IonCardTitle>
                    </IonCardHeader>
                  </IonCard>

                  <IonGrid>
                    <IonRow>
                      <IonCol size="12" sizeMd="4">
                        <IonCard color="primary">
                          <IonCardContent className="ion-text-center">
                            <IonIcon icon={peopleOutline} style={{ fontSize: '48px' }} />
                            <h2>{totalStudents}</h2>
                            <p>Total Students</p>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                      <IonCol size="12" sizeMd="4">
                        <IonCard color="secondary">
                          <IonCardContent className="ion-text-center">
                            <IonIcon icon={schoolOutline} style={{ fontSize: '48px' }} />
                            <h2>{totalQuizzes}</h2>
                            <p>Total Quizzes</p>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                      <IonCol size="12" sizeMd="4">
                        <IonCard color="tertiary">
                          <IonCardContent className="ion-text-center">
                            <IonIcon icon={statsChartOutline} style={{ fontSize: '48px' }} />
                            <h2>
                              {students.length > 0
                                ? (students.reduce((sum, s) => sum + s.averageScore, 0) / students.length).toFixed(1)
                                : 0}%
                            </h2>
                            <p>Class Average</p>
                          </IonCardContent>
                        </IonCard>
                      </IonCol>
                    </IonRow>
                  </IonGrid>

                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle>Students Needing Attention</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {students.filter(s => s.weakSubjects.length > 0 || s.averageScore < 60).length > 0 ? (
                        <IonList>
                          {students
                            .filter(s => s.weakSubjects.length > 0 || s.averageScore < 60)
                            .map(student => (
                              <IonItem key={student.id}>
                                <IonLabel>
                                  <h3>{student.full_name}</h3>
                                  <p>Average: {student.averageScore.toFixed(1)}%</p>
                                  {student.weakSubjects.length > 0 && (
                                    <p style={{ color: '#eb445a' }}>
                                      Weak in: {student.weakSubjects.join(', ')}
                                    </p>
                                  )}
                                </IonLabel>
                                <IonBadge color={getPerformanceColor(student.averageScore)} slot="end">
                                  {student.totalAttempts} attempts
                                </IonBadge>
                              </IonItem>
                            ))}
                        </IonList>
                      ) : (
                        <p className="ion-text-center" style={{ color: '#666' }}>
                          All students are performing well! 🎉
                        </p>
                      )}
                    </IonCardContent>
                  </IonCard>
                </>
              )}

              {segment === 'students' && (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Student Performance</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {students.length > 0 ? (
                      <IonList>
                        {students.map(student => (
                          <IonItem key={student.id}>
                            <IonLabel>
                              <h3>{student.full_name}</h3>
                              <p>{student.email}</p>
                              <p style={{ fontSize: '12px', color: '#666' }}>
                                {student.totalAttempts} quiz attempts
                              </p>
                              {student.weakSubjects.length > 0 && (
                                <p style={{ fontSize: '12px', color: '#eb445a' }}>
                                  Focus areas: {student.weakSubjects.join(', ')}
                                </p>
                              )}
                            </IonLabel>
                            <IonBadge color={getPerformanceColor(student.averageScore)} slot="end">
                              {student.averageScore.toFixed(1)}%
                            </IonBadge>
                          </IonItem>
                        ))}
                      </IonList>
                    ) : (
                      <p className="ion-text-center" style={{ color: '#666' }}>
                        No students enrolled yet.
                      </p>
                    )}
                  </IonCardContent>
                </IonCard>
              )}

              {segment === 'subjects' && (
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Subject Analytics</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      {subjectAnalytics.map((subject, index) => (
                        <IonItem key={index}>
                          <div slot="start" style={{ fontSize: '32px' }}>
                            {subject.icon}
                          </div>
                          <IonLabel>
                            <h3>{subject.subjectName}</h3>
                            <p>{subject.studentCount} students • {subject.totalAttempts} attempts</p>
                            <p style={{ fontSize: '12px', color: '#666' }}>
                              Class average: {subject.averageScore.toFixed(1)}%
                            </p>
                          </IonLabel>
                          <IonBadge color={getPerformanceColor(subject.averageScore)} slot="end">
                            {subject.averageScore.toFixed(1)}%
                          </IonBadge>
                        </IonItem>
                      ))}
                    </IonList>
                  </IonCardContent>
                </IonCard>
              )}
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TeacherDashboard;
