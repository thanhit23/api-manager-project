import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  budget: {
    type: Number,
    require: true,
  },
  spending: {
    type: Number,
    require: true,
  },
  date_start: {
    type: Date,
    require: true,
  },
  team_size: {
    type: Number,
    require: true,
  },
}, {timestamps: true});

export default mongoose.model("Project", projectSchema, 'project')
