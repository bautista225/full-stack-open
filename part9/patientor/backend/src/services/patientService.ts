import patientData from "../../data/patients";
import { NonSensitivePatient } from "./types";

const getEntries = () => {
  return patientData;
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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
};
