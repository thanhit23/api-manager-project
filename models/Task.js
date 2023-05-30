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
    type: Boolean,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
}, {timestamps: true});

export default mongoose.model("Task", taskSchema, 'task')
