import mongoose from 'mongoose';

const userchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 10,
  },
  role: {
    type: Number,
    default: 1,
    minlength: 10,
  },
}, {timestamps: true});

export default mongoose.model("User", userchema, 'users')
