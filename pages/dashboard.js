// pages/dashboard.js

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user);
      } else {
        window.location.href = '/login';
      }
    });
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {user.email}</h1>
      <p>This is your personal dashboard.</p>
    </div>
  );
}
