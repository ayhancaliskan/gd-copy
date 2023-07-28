const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  tel: {
    type: String,
  },
  mail: {
    type: String,
  },
  type: {
    type: String,
    enum: ["grossiste", "marchand", "other"],
  },
  defaultDriver: {
    type: ObjectId,
    ref: "Driver",
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

const Client = mongoose.model("Client", dataSchema, "clients");

module.exports = Client;
