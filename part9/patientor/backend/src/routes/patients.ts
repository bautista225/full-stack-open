import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
  const newPatient = toNewPatient(req.body);

  const addedPatient = patientService.addPatient(newPatient);

  res.json(addedPatient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const patientWithAddedEntry = patientService.addEntry(
      req.params.id,
      newEntry
    );

    if (patientWithAddedEntry) res.json(patientWithAddedEntry);
    else res.status(404).send({ Error: "patient not found" });
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ Error: `${e.message}` });
    } else {
      res.status(400).send({ Error: "unknown error" });
    }
  }
});

export default router;
