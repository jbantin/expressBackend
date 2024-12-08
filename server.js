import express from "express";

const app = express();
const encoding = "utf8";
const port = 2423;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/greeting", (req, res) => {
  res.send("oi koile");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
