import express from "express";
import Gemini from "./gemini.js";

const app = express();
const encoding = "utf8";
const port = 2423;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/greeting", (req, res) => {
  res.send("oi koile");
});
app.post("/prompt", (req, res) => {
  Gemini(req.body.prompt).then((response) => {
    res.send(response);
  });
});

app.use("*", (_, res) => {
  res.send("<h1>Schäm dich!</h1>Hab deinen Endpunkt oder Pfad nicht gefunden.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
