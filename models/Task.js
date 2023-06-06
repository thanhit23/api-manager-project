import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  projectId: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  priority: {
    type: Number,
    require: true,
  },
  status: {
    type: Number,
    require: true,
  },
}, {timestamps: true});

export default mongoose.model("Task", taskSchema, 'task')
