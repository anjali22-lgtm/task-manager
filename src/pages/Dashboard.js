import { useState, useEffect } from 'react';
import API from '../api';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get('/tasks');
        setTasks(res.data); // Make sure backend returns tasks with _id
      } catch (err) {
        console.error(err);
        alert('Error fetching tasks');
      }
    };
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (taskData) => {
    try {
      const res = await API.post('/tasks', taskData); // Save to backend
      setTasks([res.data, ...tasks]); // Use the backend response (_id included)
    } catch (err) {
      console.error(err);
      alert('Error adding task');
    }
  };

  // Update task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t._id !== taskId));
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <TaskForm addTask={addTask} />
      <div className="tasks-list">
        {tasks.map(task => (
          <TaskCard
            key={task._id} 
            task={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}