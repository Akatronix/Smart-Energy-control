const express = require("express");
require("dotenv").config();
const cors = require("cors");
const myRouter = require("./src/routes/data.route");
const { default: mongoose } = require("mongoose");
// const connectDB = require("./src/config/connectDB");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", myRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the server ");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error connecting to database", error);
  });
