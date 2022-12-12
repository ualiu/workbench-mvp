const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

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

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
});

module.exports = mongoose.model("Post", PostSchema);
