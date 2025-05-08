import React from 'react';

function Review({ questions, answers, correctAnswers, onRestart }) {
  return (
    <div style={styles.wrapper}>
      <h2>Review Answers</h2>
      {questions.map((q, idx) => {
        const selected = answers[q.quizId];
        const correct = correctAnswers[q.quizId];
        const isCorrect = selected === correct;

        return (
          <div key={q.quizId} style={{ marginBottom: 25, textAlign: 'left' }}>
            <h4 style={{ marginBottom: 8 }}>Question {idx + 1}: {q.text}</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['A', 'B', 'C', 'D'].map(opt => {
                const label = q[`option${opt}`];
                const isChosen = selected === opt;
                const isAnswer = correct === opt;

                let border = '1px solid #ccc';
                if (isAnswer) border = '2px solid green';
                if (isChosen && !isCorrect && !isAnswer) border = '2px solid red';

                return (
                  <li key={opt} style={{
                    padding: '10px 14px',
                    border,
                    marginBottom: 10,
                    borderRadius: 6
                  }}>
                    <strong>{opt}.</strong> {label}
                    {isChosen && ' (Your choice)'}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <button style={styles.button} onClick={onRestart}>Try Again</button>
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

export default Review;
