const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  tel: {
    type: String,
  },
  mail: {
    type: String,
  },
  orders: {
    type: Array,
    ref: "Order",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Vendor = mongoose.model("Vendor", dataSchema, "vendors");

module.exports = Vendor;
