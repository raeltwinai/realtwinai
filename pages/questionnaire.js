import { useState, useEffect } from 'react';

export default function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (e) => {
    const val = e.target.value;
    setAnswers({ ...answers, [current]: val });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      console.log("Finished:", answers);
      alert("Thank you! Your answers are saved.");
    }
  };

  if (!questions.length) return <div>Loading…</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>שאלה {current + 1} / {questions.length}</h2>
      <p><b>English:</b> {questions[current].en}</p>
      <p><b>עברית:</b> {questions[current].he}</p>
      <input
        type="text"
        value={answers[current] || ""}
        onChange={handleAnswer}
        placeholder="Your answer…"
        style={{ width: "80%", padding: "0.5rem", margin: "1rem 0" }}
      />
      <br />
      <button onClick={nextQuestion}>Next</button>
    </div>
  );
}
