import {
  NewPatient,
  Gender,
  NewEntry,
  Diagnose,
  HealthCheckRating,
  SickLeave,
} from "./services/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => !isNaN(Number(text));

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error("Incorrect or missing name");

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth))
    throw new Error("Incorrect or missing dateOfBirth");

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error("Incorrect or missing ssn");

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error("Incorrect or missing gender");

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error("Incorrect or missing occupation");

  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSsn(object.ssn),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

const parseString = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error("Incorrect or missing data");
  }

  return data;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error("Incorrect or missing dateOfBirth");

  return date;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating)) {
    throw new Error("Health check rating is not a number");
  }
  if (rating < 0 || rating > 3) {
    throw new Error("Health check rating is out of range");
  }
  return rating;
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (
    object &&
    typeof object === "object" &&
    "sickLeave" in object &&
    object.sickLeave !== null &&
    typeof object.sickLeave === "object" &&
    "startDate" in object.sickLeave &&
    "endDate" in object.sickLeave
  ) {
    return {
      startDate: parseDate(object.sickLeave.startDate),
      endDate: parseDate(object.sickLeave.endDate),
    };
  }
  return undefined;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const newEntry = {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch (object.type) {
      case "HealthCheck":
        if ("healthCheckRating" in object)
          return {
            ...newEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        break;
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          return {
            ...newEntry,
            type: "OccupationalHealthcare",
            employerName: parseString(object.employerName),
            sickLeave: parseSickLeave(object),
          };
        }
        break;
      case "Hospital":
        if (
          "discharge" in object &&
          typeof object.discharge === "object" &&
          object.discharge !== null &&
          "date" in object.discharge &&
          "criteria" in object.discharge
        )
          return {
            ...newEntry,
            type: "Hospital",
            discharge: {
              date: parseDate(object.discharge.date),
              criteria: parseString(object.discharge.criteria),
            },
          };
        break;
    }
  }

  throw new Error("Incorrect data: some fields are missing");
};
