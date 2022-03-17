// Development stuff
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");

// Database setup
const db = mongoose.connection;
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

module.exports = db;
