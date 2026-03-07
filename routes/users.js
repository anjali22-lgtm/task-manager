// routes/users.js
import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Protect all user routes
router.use(authMiddleware);

// ---------------- GET ALL USERS ----------------
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id name email'); // return only id, name, email
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- GET SINGLE USER ----------------
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '_id name email');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;