// routes/tasks.js
import express from 'express';
import Task from '../models/Task.js';          // Task model
import authMiddleware from '../middleware/auth.js'; // Auth middleware

const router = express.Router();

// -------------------- PROTECT ROUTES --------------------
// All routes below require authentication
router.use(authMiddleware);

// -------------------- CREATE TASK --------------------
router.post('/', async (req, res) => {
  try {
    const { assignedTo, ...rest } = req.body; // allow assignment
    const task = new Task({ ...rest, user: req.user.id, assignedTo });
    await task.save();
    // populate assigned user info
    await task.populate('assignedTo', 'name email');
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET ALL TASKS FOR USER --------------------
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .populate('assignedTo', 'name email') // populate assigned user's info
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- UPDATE TASK --------------------
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignedTo', 'name email'); // populate assigned info
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DELETE TASK --------------------
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- ADD COMMENT TO TASK --------------------
router.post('/:id/comments', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { user, text } = req.body; // Comment data
    task.comments.push({ user, text });
    await task.save();

    res.status(201).json(task.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET COMMENTS FOR A TASK --------------------
router.get('/:id/comments', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;