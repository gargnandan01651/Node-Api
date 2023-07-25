const mongoose = require("mongoose");
const URI = process.env.MONGODB_URL || "mongodb://localhost:27017/EmployeeDB";

const abc =
  process.env.MONGODB_URL ||
  "mongodb+srv://csecec1803181:nikhil01651@cluster0.qwsgl1o.mongodb.net/EmployeeDB";
mongoose
  .connect(abc, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("no connectio " + e);
  });
