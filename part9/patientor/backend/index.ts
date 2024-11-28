import express from "express";
import cors from "cors";

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)(options));

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  console.log("someone called patients here");
  res.send();
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
