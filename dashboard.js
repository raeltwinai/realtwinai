import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_ANON_KEY'
)

export default function Dashboard() {
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    fetchAnswers()
  }, [])

  async function fetchAnswers() {
    const { data, error } = await supabase
      .from('questionnaire_answers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setAnswers(data)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>RealTwinAI - Dashboard</h1>
      {answers.map((row) => (
        <div key={row.id} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
          <strong>{row.question}</strong>
          <p>{row.answer}</p>
        </div>
      ))}
    </div>
  )
}
