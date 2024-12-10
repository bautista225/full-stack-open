import { useEffect, useState } from "react";
import { NewEntry, Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Box, Button, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EntryDetails from "./EntryDetails";
import NewHealthCheckEntryForm from "./NewHealthCheckEntryForm";

const PatientInfoPage = () => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [showForm, setShowForm] = useState(false);
  const { id: patientId } = useParams<{ id: string }>();

  const handleError = (e: unknown) => {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data.replace(
          "Something went wrong. Error: ",
          ""
        );
        console.error(message);
        setError(message);
        setTimeout(() => setError(""), 5000);
      } else if (e?.response?.data && e?.response?.data.Error) {
        const message = e.response.data.Error;
        console.error(message);
        setError(message);
        setTimeout(() => setError(""), 5000);
      } else {
        setError("Unrecognized axios error");
        setTimeout(() => setError(""), 5000);
      }
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
      setTimeout(() => setError(""), 5000);
    }
  };

  useEffect(() => {
    try {
      patientService.get(patientId).then((patient) => setPatient(patient));
    } catch (e: unknown) {
      handleError(e);
    }
  }, [patientId]);

  if (!patient)
    return (
      <Box>
        <Typography variant="h4" marginY={3}>
          Patient not found
        </Typography>
      </Box>
    );

  const handleNewHealthCheckEntry = (newEntry: NewEntry) => {
    patientService
      .addEntry(patient.id, newEntry)
      .then((patient) => setPatient(patient))
      .catch((e) => {
        handleError(e);
      });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={"bold"} marginY={3}>
        {patient.name}{" "}
        {patient.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      {error && (
        <Box>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      <Box marginY={2}>
        {!showForm && (
          <Button
            color="success"
            variant="contained"
            type="button"
            onClick={() => setShowForm(true)}
          >
            Add entry
          </Button>
        )}
        {showForm && (
          <NewHealthCheckEntryForm
            onSubmit={handleNewHealthCheckEntry}
            onCancel={() => setShowForm(false)}
          />
        )}
      </Box>
      <Typography variant="h5" fontWeight={"bold"} marginY={3}>
        entries
      </Typography>
      {patient.entries.length === 0 ? (
        <Typography variant="body1">No entries added</Typography>
      ) : (
        patient.entries.map((e) => <EntryDetails key={e.id} entry={e} />)
      )}
    </Box>
  );
};

export default PatientInfoPage;
