const wordListPath = require("word-list");
const fs = require("fs");
const express = require("express");
const env = require("dotenv");
env.config();
const app = express();
const port=process.env.PORT || 4000;
app.get("/", (req, res) => {
  const wordArray = fs.readFileSync(wordListPath, "utf8").split("\n");
  const randomWordIndex = Math.floor(Math.random() * wordArray.length);
  res.status(200).send({word:wordArray[randomWordIndex]});
});

app.listen(port,()=>{
    console.log(`listening to http://localhost:${port}`)
})