import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // creator
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assignee
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' },
  priority: { type: String, default: 'Medium' },
  dueDate: { type: Date },
  comments: [{ user: String, text: String, date: { type: Date, default: Date.now } }]
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);