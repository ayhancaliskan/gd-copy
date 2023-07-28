const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  tel: {
    type: String,
  },
  mail: {
    type: String,
  },
  isActif: {
    type: Boolean,
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }

});

const Driver = mongoose.model("Driver", dataSchema, "drivers");

module.exports = Driver;
