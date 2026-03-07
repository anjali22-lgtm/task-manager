import React, { useState, useEffect } from "react";
import API from "../api"; // your axios instance

function TaskForm({ addTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    initialComment: "",
    assignedTo: "" // ✅ New field for assigned user
  });

  const [users, setUsers] = useState([]); // ✅ All users for dropdown

  // Fetch all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users"); // GET /api/users
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate,
      assignedTo: form.assignedTo, // ✅ Send assigned user
      comments: form.initialComment
        ? [{ user: "You", text: form.initialComment }]
        : [],
    };
    addTask(taskData);
    setForm({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
      initialComment: "",
      assignedTo: ""
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      {/* New: Assign to member */}
      <select
        name="assignedTo"
        value={form.assignedTo}
        onChange={handleChange}
        required
      >
        <option value="">Assign to member</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="initialComment"
        placeholder="Add initial comment (optional)"
        value={form.initialComment}
        onChange={handleChange}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;