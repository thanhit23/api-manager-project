import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  area: {
    type: String,
    require: true,
  },
}, {timestamps: true});

export default mongoose.model("Employee", employeeSchema, 'employee')
