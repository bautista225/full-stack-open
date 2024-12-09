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
      <div>
        <Box>
          <Typography variant="h4" marginY={3}>
            Patient not found
          </Typography>
        </Box>
      </div>
    );

  return (
    <div>
      <Box>
        <Typography variant="h4" fontWeight={"bold"} marginY={3}>
          {patient.name}{" "}
          {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
        </Typography>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
      </Box>
    </div>
  );
};

export default PatientInfoPage;
