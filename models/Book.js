import mongoose from 'mongoose';

const postchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
  },
  images: {
    type: Array,
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
}, {timestamps: true});

export default mongoose.model("Posts", postchema, 'posts')
