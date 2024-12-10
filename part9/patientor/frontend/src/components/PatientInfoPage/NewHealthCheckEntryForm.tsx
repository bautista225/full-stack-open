import { useState } from "react";
import { EntryType, NewEntry } from "../../types";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  onSubmit: (newEntry: NewEntry) => void;
  onCancel: () => void;
}

const NewHealthCheckEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [typeOfEntry, setTypeOfEntry] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [specialist, setSpecialist] = useState<string>();
  const [healthCheckRating, setHealthCheckRating] = useState<string>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>();
  const [dischargeDate, setDischargeDate] = useState<string>();
  const [dischargeCriteria, setDischargeCriteria] = useState<string>();
  const [employerName, setEmployerName] = useState<string>();
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>();
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>();

  const resetForm = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
  };

  const onTypeOfEntryChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find((t) => t.toString() === value);
      if (type) {
        setTypeOfEntry(type);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEntryBase = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes?.replace(" ", "").split(","),
    };

    switch (typeOfEntry) {
      case EntryType.HealthCheck:
        onSubmit({
          ...newEntryBase,
          type: EntryType.HealthCheck,
          healthCheckRating: Number(healthCheckRating),
        } as NewEntry);
        break;
      case EntryType.Hospital:
        onSubmit({
          ...newEntryBase,
          type: EntryType.Hospital,
          discharge: {
            criteria: dischargeCriteria,
            date: dischargeDate,
          },
        } as NewEntry);
        break;
      case EntryType.OccupationalHealthcare:
        onSubmit({
          ...newEntryBase,
          type: EntryType.OccupationalHealthcare,
          employerName,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        } as NewEntry);
        break;
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ borderStyle: "dotted", padding: 2 }}>
        <Typography variant="h5" fontWeight={"bold"} marginY={2}>
          New entry
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="typeOfEntryLabel">Type of entry</InputLabel>
          <Select
            label="Type of entry"
            labelId="typeOfEntryLabel"
            fullWidth
            value={typeOfEntry}
            onChange={onTypeOfEntryChange}
          >
            {Object.values(EntryType).map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ my: 1 }}
          variant="standard"
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          sx={{ my: 1 }}
          variant="standard"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          sx={{ my: 1 }}
          variant="standard"
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          sx={{ my: 1 }}
          variant="standard"
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        {typeOfEntry === EntryType.HealthCheck && (
          <TextField
            sx={{ my: 1 }}
            type="number"
            variant="standard"
            label="Healthcheck rating"
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(target.value)}
          />
        )}
        {typeOfEntry === EntryType.Hospital && (
          <>
            <TextField
              sx={{ my: 1 }}
              label="Discharge date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              sx={{ my: 1 }}
              label="Discharge criteria"
              variant="standard"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}
        {typeOfEntry === EntryType.OccupationalHealthcare && (
          <>
            <TextField
              sx={{ my: 1 }}
              label="Employer name"
              variant="standard"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              sx={{ my: 1 }}
              label="Sick leave start date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              sx={{ my: 1 }}
              label="Sick leave end date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}
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
