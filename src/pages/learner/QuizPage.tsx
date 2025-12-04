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
  IonButtons,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonAlert,
  IonBadge
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Quiz, Question } from '../../lib/supabase';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExitAlert, setShowExitAlert] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    try {
      // Load quiz
      const { data: quizData, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', id)
        .single();

      if (quizError) throw quizError;
      setQuiz(quizData);

      // Load questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', id)
        .order('order_number');

      if (questionsError) throw questionsError;
      setQuestions(questionsData || []);
    } catch (error) {
      console.error('Error loading quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? (currentQuestionIndex + 1) / questions.length : 0;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const checkAnswer = () => {
    const userAnswer = answers[currentQuestion.id];
    const correct = userAnswer === currentQuestion.correct_answer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    // Calculate score
    let totalScore = 0;
    let totalPoints = 0;

    questions.forEach((q) => {
      totalPoints += q.points;
      if (answers[q.id] === q.correct_answer) {
        totalScore += q.points;
      }
    });

    const percentage = (totalScore / totalPoints) * 100;
    setScore(percentage);

    // Save quiz attempt
    try {
      const { error } = await supabase.from('quiz_attempts').insert({
        user_id: user!.id,
        quiz_id: id,
        score: totalScore,
        total_points: totalPoints,
        percentage: percentage,
        completed_at: new Date().toISOString(),
        answers: answers
      });

      if (error) throw error;

      // Update progress
      await supabase.from('progress').upsert({
        user_id: user!.id,
        subject_id: quiz!.subject_id,
        mastery_level: Math.min(100, percentage),
        last_accessed: new Date().toISOString()
      }, {
        onConflict: 'user_id,subject_id,topic_id'
      });

    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }

    setQuizCompleted(true);
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="ion-text-center ion-margin-top">
            <p>Loading quiz...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (quizCompleted) {
    const passed = score >= (quiz?.passing_score || 60);
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color={passed ? 'success' : 'danger'}>
            <IonTitle>Quiz Completed!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ maxWidth: '600px', margin: '40px auto' }}>
            <IonCard>
              <IonCardHeader>
                <div style={{ fontSize: '64px', textAlign: 'center' }}>
                  {passed ? '🎉' : '📚'}
                </div>
                <IonCardTitle className="ion-text-center">
                  <h2>{passed ? 'Congratulations!' : 'Keep Practicing!'}</h2>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="ion-text-center">
                  <h1 style={{ fontSize: '48px', margin: '20px 0' }}>
                    {score.toFixed(1)}%
                  </h1>
                  <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                    {passed 
                      ? `Great job! You passed with a score above ${quiz?.passing_score}%`
                      : `You need ${quiz?.passing_score}% to pass. Review the materials and try again!`
                    }
                  </p>
                  
                  <IonButton expand="block" onClick={() => navigate(-1)}>
                    Back to Subject
                  </IonButton>
                  <IonButton expand="block" fill="outline" onClick={() => window.location.reload()}>
                    Retake Quiz
                  </IonButton>
                  <IonButton expand="block" fill="clear" onClick={() => navigate('/progress')}>
                    View Progress
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={() => setShowExitAlert(true)}>
              Exit
            </IonButton>
          </IonButtons>
          <IonTitle>{quiz?.title}</IonTitle>
          <IonButtons slot="end">
            <IonBadge color="light">
              {currentQuestionIndex + 1} / {questions.length}
            </IonBadge>
          </IonButtons>
        </IonToolbar>
        <IonProgressBar value={progress} />
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {currentQuestion && (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Question {currentQuestionIndex + 1}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <h3 style={{ marginBottom: '20px' }}>{currentQuestion.question_text}</h3>

                {currentQuestion.question_type === 'multiple_choice' && (
                  <IonRadioGroup
                    value={answers[currentQuestion.id]}
                    onIonChange={(e: any) => handleAnswer(e.detail.value)}
                  >
                    {currentQuestion.options?.map((option, index) => (
                      <IonItem key={index}>
                        <IonLabel>{option}</IonLabel>
                        <IonRadio slot="start" value={option} disabled={showFeedback} />
                      </IonItem>
                    ))}
                  </IonRadioGroup>
                )}

                {currentQuestion.question_type === 'true_false' && (
                  <IonRadioGroup
                    value={answers[currentQuestion.id]}
                    onIonChange={(e: any) => handleAnswer(e.detail.value)}
                  >
                    <IonItem>
                      <IonLabel>True</IonLabel>
                      <IonRadio slot="start" value="True" disabled={showFeedback} />
                    </IonItem>
                    <IonItem>
                      <IonLabel>False</IonLabel>
                      <IonRadio slot="start" value="False" disabled={showFeedback} />
                    </IonItem>
                  </IonRadioGroup>
                )}

                {showFeedback && (
                  <IonCard color={isCorrect ? 'success' : 'danger'} style={{ marginTop: '20px' }}>
                    <IonCardContent>
                      <h4>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</h4>
                      {currentQuestion.explanation && (
                        <p style={{ marginTop: '10px' }}>{currentQuestion.explanation}</p>
                      )}
                      {!isCorrect && (
                        <p style={{ marginTop: '10px' }}>
                          <strong>Correct answer:</strong> {currentQuestion.correct_answer}
                        </p>
                      )}
                    </IonCardContent>
                  </IonCard>
                )}

                <div style={{ marginTop: '20px' }}>
                  {!showFeedback ? (
                    <IonButton
                      expand="block"
                      onClick={checkAnswer}
                      disabled={!answers[currentQuestion.id]}
                    >
                      Submit Answer
                    </IonButton>
                  ) : (
                    <IonButton expand="block" onClick={nextQuestion}>
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </IonButton>
                  )}
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>

        <IonAlert
          isOpen={showExitAlert}
          onDidDismiss={() => setShowExitAlert(false)}
          header="Exit Quiz?"
          message="Your progress will not be saved. Are you sure?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Exit',
              role: 'confirm',
              handler: () => navigate(-1)
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default QuizPage;
