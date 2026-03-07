import { useState, useEffect } from 'react';
import API from '../api';
import '../styles/Dashboard.css';

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(task);

  const [comments, setComments] = useState(task.comments || []);
  const [commentText, setCommentText] = useState("");

  const [assignedUser, setAssignedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resUsers = await API.get('/users'); // all users
        setAllUsers(resUsers.data);

        if (task.assignedTo) {
          const resAssigned = await API.get(`/users/${task.assignedTo}`);
          setAssignedUser(resAssigned.data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [task.assignedTo]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/tasks/${task._id}`, form);
      onUpdate(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert('Error updating task');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await API.delete(`/tasks/${task._id}`);
      onDelete(task._id);
    } catch (err) {
      console.error(err);
      alert('Error deleting task');
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await API.post(`/tasks/${task._id}/comments`, {
        user: "You",
        text: commentText
      });
      setComments(res.data);
      setCommentText("");
    } catch (err) {
      console.error(err);
      alert('Error adding comment');
    }
  };

  const statusColors = { Pending: '#ffc107', 'In Progress': '#17a2b8', Completed: '#28a745' };
  const priorityColors = { Low: '#6c757d', Medium: '#007bff', High: '#dc3545' };

  return (
    <div className="task-card professional">
      {editing ? (
        <div className="task-edit">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title"/>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"/>
          <div className="task-edit-row">
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input type="date" name="dueDate" value={form.dueDate ? form.dueDate.split('T')[0] : ""} onChange={handleChange}/>
            <select name="assignedTo" value={form.assignedTo || ""} onChange={handleChange}>
              <option value="">Unassigned</option>
              {allUsers.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>
          <div className="task-edit-buttons">
            <button className="btn-save" onClick={handleUpdate}>Save</button>
            <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="task-view">
          <div className="task-header">
            <h3>{task.title}</h3>
            <div className="task-buttons">
              <button className="btn-edit" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn-delete" onClick={handleDelete}>Delete</button>
            </div>
          </div>

          <p className="task-desc">{task.description || "No description"}</p>

          <div className="task-meta">
            <span className="status" style={{ background: statusColors[task.status] }}>{task.status}</span>
            <span className="priority" style={{ background: priorityColors[task.priority] }}>{task.priority}</span>
            <span className="due-date">Due: {task.dueDate ? task.dueDate.split('T')[0] : "N/A"}</span>
            <span className="assigned">Assigned: {assignedUser ? assignedUser.name : "Unassigned"}</span>
          </div>

          <div className="comments-section">
            <h4>Comments</h4>
            {comments.length === 0 ? <p className="no-comments">No comments yet</p> : (
              comments.map((c, idx) => (
                <div key={idx} className="comment">
                  <b>{c.user}:</b> {c.text} <i>({c.date ? new Date(c.date).toLocaleString() : "Just now"})</i>
                </div>
              ))
            )}
            <div className="add-comment">
              <input type="text" placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key==="Enter" && handleAddComment()} />
              <button onClick={handleAddComment}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}