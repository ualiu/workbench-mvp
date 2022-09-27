const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  secondTitle: {
    type: String,
    default: 'shoes',
    enum: ['shoes', 'boots', 'sneakers', 'bag', 'other']
  },
  status: {
    type: String,
    default: 'open',
    enum: ['select one', 'open', 'working', 'completed']
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  cost : {
    type: Number,
    required: true
  },
  likes: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
