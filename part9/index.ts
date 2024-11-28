import express from "express";
import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    res.status(400).send({ error: "malformed parameters" });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBmi(height, weight);

    res.send({
      weight,
      height,
      bmi,
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
