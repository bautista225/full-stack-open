import patientData from "../../data/patients";
import {
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "./types";
import { v1 as uuid } from "uuid";

const getEntries = () => {
  return patientData;
};

const getPatient = (id: string) => {
  return patientData.find((p) => p.id === id);
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patientData.push(newPatient);

  return newPatient;
};

const addEntry = (
  patientId: Patient["id"],
  entry: NewEntry
): Patient | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patientData.find((p) => p.id === patientId);

  if (patient) patient.entries.push(newEntry);

  return patient;
};

export default {
  getEntries,
  getPatient,
  getNonSensitiveEntries,
  addPatient,
  addEntry,
};
