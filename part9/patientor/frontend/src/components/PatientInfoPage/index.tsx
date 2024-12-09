import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Box, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const PatientInfoPage = () => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const { id: patientId } = useParams<{ id: string }>();

  useEffect(() => {
    try {
      patientService.get(patientId).then((patient) => setPatient(patient));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  }, [patientId]);

  if (error)
    return (
      <div>
        <Alert severity="error">{error}</Alert>
      </div>
    );

  if (!patient)
    return (
      <Box>
        <Typography variant="h4" marginY={3}>
          Patient not found
        </Typography>
      </Box>
    );

  return (
    <Box>
      <Typography variant="h4" fontWeight={"bold"} marginY={3}>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <Typography variant="h5" fontWeight={"bold"} marginY={3}>
        entries
      </Typography>
      {patient.entries.map((e) => (
        <Box key={e.id}>
          <Typography variant="body1">
            {e.date} <em>{e.description}</em>
          </Typography>
          <ul>
            {e.diagnosisCodes?.map((code) => (
              <li key={code}>
                <Typography variant="body1">{code}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default PatientInfoPage;
