import React from 'react';

function Result({ result, onRestart, onReview }) {
  return (
    <div style={styles.wrapper}>
      <h2>Quiz Result</h2>
      <p><strong>Correct answers:</strong> {result.totalCorrect} / {result.totalQuestions}</p>
      <p><strong>Time taken:</strong> {result.durationSeconds} seconds</p>
      <h3 style={{ color: result.passed ? 'green' : 'red' }}>
        {result.passed ? 'Congratulations! You passed!' : 'Sorry, you did not pass.'}
      </h3>
      <button style={styles.button} onClick={onRestart}>Try Again</button>
      <button style={{ ...styles.button, marginLeft: 10 }} onClick={onReview}>Review Answers</button>
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
  button: {
    marginTop: 20,
    padding: '12px 28px',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    backgroundColor: '#1976d2',
    color: 'white',
    cursor: 'pointer'
  }
};

export default Result;
