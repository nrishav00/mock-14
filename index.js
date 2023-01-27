const wordListPath = require("word-list");
const fs = require("fs");
const express = require("express");
const env = require("dotenv");
const dbconnect = require("./Configs/db");
const puzzUserModel = require("./Models/User.model");
env.config();
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  const wordArray = fs.readFileSync(wordListPath, "utf8").split("\n");
  const randomWordIndex = Math.floor(Math.random() * wordArray.length);
  res.status(200).send({ word: wordArray[randomWordIndex] });
});

app.get("/alluser", async (req, res) => {
  res
    .status(200)
    .send(await puzzUserModel.aggregate([{ $sort: { user_score: -1 } }]));
});
app.use(express.json());
app.post("/create", async (req, res) => {
  try {
    await puzzUserModel.create(req.body);
    res.status(200).send({ msg: "Data Saved" });
  } catch (error) {
    res.status(400).send({ msg: "Try again" });
  }
});

app.listen(port, () => {
  dbconnect;
  console.log(`listening to http://localhost:${port}`);
});
