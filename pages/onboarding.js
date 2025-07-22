// pages/onboarding.js

import { useState } from 'react';
import onboardingQuestions from '../public/realtwin_onboarding_questions.json';

export default function Onboarding() {
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
    return <h2>Thank you for completing onboarding!</h2>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h1>Onboarding</h1>
      {onboardingQuestions.map((q, idx) => (
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
