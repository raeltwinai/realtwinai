import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// צור לקוח של supabase עם משתנים מהסביבה
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*');

      if (!error) setUsers(data);
      else console.error(error);
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>
      <p>List of users registered in the system:</p>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
