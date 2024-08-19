const connectDB = require("./db/connect.js");

import mongoose from "mongoose";
//function to connect to db
const connectDB = (url) => {
  mongoose
    //connect with given url
    .connect(url)
    //if successful then execute
    .then(() => console.log("database connected"))
    //if not successful then execute
    .catch((error) => console.error("Database connection failed:", error));
};
//export the connection function
export default connectDB;
