import express from "express";
import cors from "cors";
import patientsRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(
  (cors as (options: cors.CorsOptions) => express.RequestHandler)(options)
); // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/43909

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/patients", patientsRouter);

app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
