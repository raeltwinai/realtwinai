// pages/sendReminder.js

import { useState } from 'react';

export default function SendReminder() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    try {
      const res = await fetch('/api/sendReminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Reminder sent successfully!');
      } else {
        setMessage('Failed to send reminder.');
      }
    } catch (err) {
      setMessage('Error sending reminder.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Send Reminder</h1>
      <input
        type="email"
        placeholder="User email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <p>{message}</p>
    </div>
  );
}
