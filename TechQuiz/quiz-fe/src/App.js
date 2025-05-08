import React, { useEffect, useState } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import Review from './components/Review';

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5115/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error('Error loading questions:', err));
  }, []);

  const startQuiz = () => {
    setStartTime(Date.now());
  };

  const handleAnswer = (quizId, answer) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [quizId]: answer }));
    }
  };

  const checkAnswer = async () => {
    const current = questions[index];
    const res = await fetch('http://localhost:5115/questions/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId: current.quizId,
        userAnswer: answers[current.quizId]
      })
    });

    const data = await res.json();
    setCorrectAnswers(prev => ({ ...prev, [current.quizId]: data.correctAnswer }));
    setSubmitted(true);
  };

  const nextQuestion = () => {
    setIndex(prev => prev + 1);
    setSubmitted(false);
  };

  const submitQuiz = async () => {
    let correct = 0;
    const newCorrectAnswers = {};

    for (let q of questions) {
      const res = await fetch('http://localhost:5115/questions/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: q.quizId,
          userAnswer: answers[q.quizId]
        })
      });
      const data = await res.json();
      newCorrectAnswers[q.quizId] = data.correctAnswer;
      if (data.isCorrect) correct++;
    }

    const duration = Math.floor((Date.now() - startTime) / 1000);
    const res = await fetch('http://localhost:5115/questions/submit-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        totalCorrect: correct,
        totalQuestions: questions.length,
        durationSeconds: duration
      })
    });

    const finalResult = await res.json();
    setCorrectAnswers(newCorrectAnswers);
    setResult(finalResult);
    setQuizSubmitted(true);
  };

  const handleRestart = () => {
    handleResetQuiz();
    startQuiz();
  };

  const handleResetQuiz = () => {
    setIndex(0);
    setAnswers({});
    setCorrectAnswers({});
    setStartTime(null);
    setSubmitted(false);
    setQuizSubmitted(false);
    setResult(null);
    setReviewMode(false);
  }

  const handleReview = () => {
    setReviewMode(true);
  };

  if (!startTime) {
    return (
      <div style={styles.wrapper}>
        <h1>Math Quiz</h1>
        <p style={{ marginBottom: 20 }}>You need at least 8/11 correct answers to pass.</p>
        <button style={styles.button} onClick={startQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (quizSubmitted && reviewMode) {
    return (
      <Review
        questions={questions}
        answers={answers}
        correctAnswers={correctAnswers}
        onRestart={handleRestart}
      />
    );
  }

  if (quizSubmitted) {
    return <Result result={result} onRestart={handleRestart} onReview={handleReview} onExit={handleResetQuiz} />;
  }

  const current = questions[index] || {};
  const isLast = index === questions.length - 1;

  return (
    <div style={{...styles.wrapper, minHeight: 420}}>
      <div style={styles.counter}>Question {index + 1} / {questions.length}</div>

      <Question
        question={current}
        selected={answers[current.quizId]}
        correctAnswer={correctAnswers[current.quizId]}
        onSelect={handleAnswer}
        submitted={submitted}
      />

      <div style={styles.buttonContainer}>
        {!submitted && (
          <button
            style={styles.button}
            onClick={checkAnswer}
            disabled={!answers[current.quizId]}>
            Submit
          </button>
        )}
        {submitted && !isLast && (
          <button style={styles.button} onClick={nextQuestion}>Next</button>
        )}
        {submitted && isLast && (
          <button style={styles.button} onClick={submitQuiz}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: '#f4f4f4',
    padding: 30,
    maxWidth: 700,
    margin: '40px auto',
    borderRadius: 8,
    textAlign: 'center'
  },
  counter: {
    fontSize: '18px',
    marginBottom: 10,
    color: '#333'
  },
  buttonContainer: {
    marginTop: 30
  },
  button: {
    padding: '12px 28px',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: 'pointer'
  }
};

export default App;
