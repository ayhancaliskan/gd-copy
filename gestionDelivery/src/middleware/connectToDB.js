const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/myapp";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose connected to the database.");
  } catch (error) {
    console.error("Error connecting Mongoose to the database:", error);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log(new Date().toLocaleString() + " - DB disconnected.");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
};

module.exports = { connectDB, closeDB };
