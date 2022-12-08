const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({

  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
})

module.exports = mongoose.model("Customer", CustomerSchema);