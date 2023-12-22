const mongoose = require("mongoose");
const { DATABASE_URI } = process.env;

mongoose.set("strictQuery", true);
mongoose.connect(DATABASE_URI);

mongoose.connection
  .on("open", () => console.log("You are connected."))
  .on("close", () => console.log("Connection closed."))
  .on("error", (error) => console.log(error));