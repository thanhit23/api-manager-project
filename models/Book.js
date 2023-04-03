import mongoose from 'mongoose';

const bookchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
  },
  images: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discount: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
}, {timestamps: true});

export default mongoose.model("Books", bookchema, 'books')
