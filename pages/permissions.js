// pages/permissions.js

import { useState } from 'react';

export default function Permissions() {
  const [granted, setGranted] = useState(false);

  const handleGrant = () => {
    setGranted(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Permissions</h1>
      {!granted ? (
        <>
          <p>We need your permission to access certain parts of your account and provide the best service.</p>
          <button onClick={handleGrant}>Grant Permissions</button>
        </>
      ) : (
        <p>Thank you! Permissions granted.</p>
      )}
    </div>
  );
}
