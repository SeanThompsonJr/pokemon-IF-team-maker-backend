const express = require("express");
const cors = require("cors");
const trainer = require("./routes/trainer");
const app = express();
const port = 3001;
const connectDB = require("./connection/connect");
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://pokemon-IF-team-maker.onrender.com",
  ],
};
const path = require("path");
const dotenv = require("dotenv");
//makes process accessible
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use("/api/trainers", trainer);
app.use(
  "/pokemon/images",
  express.static(path.join(__dirname, "../client/src/pokemon/images"))
);
//test
//function to start the server and db
const start = async () => {
  try {
    //tries to connect using the hidden url with the connection function that was imported
    await connectDB(process.env.MONGO_URI);
    //start app server at specified port
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
    //if try block shoots an error then execute this block
  } catch (error) {
    console.log(error);
  }
};
start();
