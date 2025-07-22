// pages/questionnaire.js

import { useState } from 'react';
import questions from '../public/questions.json';

export default function Questionnaire() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, question) => {
    setAnswers({ ...answers, [question]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers);
    setSubmitted(true);
  };

  if (submitted) {
    return <h2>Thank you for completing the questionnaire!</h2>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h1>Personal Questionnaire</h1>
      {questions.map((q, idx) => (
        <div key={idx}>
          <label>{q}</label><br />
          <input
            type="text"
            onChange={(e) => handleChange(e, q)}
          /><br /><br />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
