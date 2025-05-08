import React from 'react';

function Question({ question, selected, correctAnswer, onSelect, submitted }) {
  const getStyle = (opt) => {
    if (!submitted) return baseStyle;
    if (opt === correctAnswer) {
      return { ...baseStyle, border: '1px solid green' };
    }
    if (opt === selected && opt !== correctAnswer) {
      return { ...baseStyle, border: '1px solid red' };
    }
    return baseStyle;
  };

  const baseStyle = {
    padding: '10px 14px',
    marginBottom: 16,
    borderRadius: 20,
    border: '1px solid #ccc',
    display: 'block',
    textAlign: 'left'
  };

  return (
    <div>
      <h2 style={{ textAlign: 'left', marginBottom: 20 }}>{question.text}</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {['A', 'B', 'C', 'D'].map(opt => {
          const label = question[`option${opt}`];
          return (
            <li key={opt}>
              <label style={getStyle(opt)}>
                <input
                  type="radio"
                  name={`quiz-${question.quizId}`}
                  value={opt}
                  disabled={submitted}
                  checked={selected === opt}
                  onChange={() => onSelect(question.quizId, opt)}
                  style={{ marginRight: 10 }}
                />
                {`${opt}. ${label}`}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Question;
