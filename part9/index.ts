import express from "express";
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!bmiCalculator.checkArguments(req.query.height, req.query.weight)) {
    res.status(400).send({ error: "malformed parameters" });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = bmiCalculator.calculateBmi(height, weight);

    res.json({
      weight,
      height,
      bmi,
    });
  }
});

app.post("/exercises", (req, res) => {
  if (!req.body) {
    res.status(400).send({ error: "parameters missing" });
  } else {
    const { daily_exercises, target } = req.body as {
      daily_exercises: number[];
      target: number;
    };
    
    if (!exerciseCalculator.checkArguments(daily_exercises, target))
      res.status(400).send({ error: "malformatted parameters" });
    else
      res.json(exerciseCalculator.calculateExercises(daily_exercises, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
