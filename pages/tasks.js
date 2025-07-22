import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://tpurhxsjrndzmmrmxobw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdXJoeHNqcm5kem1tcm14b2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MjU2MjgsImV4cCI6MjA2ODAwMTYyOH0.F05tTpuQs-cTHx4tg1wJ7j284hwFYmo4lJ7QVhK2_i0'
)

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      alert("You must be logged in.")
      return
    }
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })
    if (error) console.error(error)
    else setTasks(data)
  }

  const addTask = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { error } = await supabase
      .from('tasks')
      .insert([{ user_id: user.id, task: newTask }])
    if (!error) {
      setNewTask('')
      fetchTasks()
    }
  }

  const toggleTask = async (task) => {
    await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', task.id)
    fetchTasks()
  }

  const deleteTask = async (taskId) => {
    await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
    fetchTasks()
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">My Tasks</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="p-2 border rounded flex justify-between items-center bg-white">
            <div onClick={() => toggleTask(task)} className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.task}
            </div>
            <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-800">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}