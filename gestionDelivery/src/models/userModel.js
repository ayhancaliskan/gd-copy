const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  userRole: {
    required: false,
    type: String,
    enum: ["admin", "driver", "vendor", null],
    default: null,
  },
  refId: { 
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    enum: ['Driver', 'Vendor']
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", dataSchema, "users");

module.exports = User;