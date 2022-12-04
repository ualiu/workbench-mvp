const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  // customerName: {
  //   type: String,
  //   required: true
  // },
  // customerPhone: {
  //   type: String,
  //   required: true
  // },
  // customerEmail: {
  //   type: String,
  //   required: true
  // },
  itemType: {
    type: String,
    default: 'Shoes'
  },
  brand: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'open'
  },
  date: {
    type: Date,
    default: Date.now
  },
    image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  // title: {
  //   type: String,
  //   required: true,
  // },
  // secondTitle: {
  //   type: String,
  //   default: 'shoes',
  //   enum: ['shoes', 'boots', 'sneakers', 'bag', 'other']
  // },
  // status: {
  //   type: String,
  //   default: 'open',
  //   enum: ['select one', 'open', 'working', 'completed']
  // },
  // name: {
  //   type: String,
  //   required: true
  // },
  // phone: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // image: {
  //   type: String,
  //   require: true,
  // },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  // caption: {
  //   type: String,
  //   required: true,
  // },
  // cost : {
  //   type: Number,
  //   required: true
  // },
  // likes: {
  //   type: String,
  //   required: true,
  // },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("Post", PostSchema);
