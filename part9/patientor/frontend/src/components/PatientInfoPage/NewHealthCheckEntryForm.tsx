import { useState } from "react";
import { NewEntry } from "../../types";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

interface Props {
  onSubmit: (newEntry: NewEntry) => void;
  onCancel: () => void;
}

const NewHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [specialist, setSpecialist] = useState<string>();
  const [healthCheckRating, setHealthCheckRating] = useState<string>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>();

  const resetForm = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: diagnosisCodes?.replace(" ", "").split(","),
    } as NewEntry;

    onSubmit(newEntry);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ borderStyle: "dotted", padding: 2 }}>
        <Typography variant="h5" fontWeight={"bold"} marginY={2}>
          New HealthCheck entry
        </Typography>
        <TextField
          variant="standard"
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          variant="standard"
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          variant="standard"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          type="number"
          variant="standard"
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          variant="standard"
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Grid marginTop={2} container justifyContent="space-between">
          <Grid item>
            <Button
              color="error"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default NewHealthCheckEntryForm;
