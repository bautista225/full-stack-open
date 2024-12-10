import { useState } from "react";
import { EntryType, HealthCheckRating, NewEntry, Diagnosis } from "../../types";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
  onSubmit: (newEntry: NewEntry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewHealthCheckEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const [typeOfEntry, setTypeOfEntry] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>();
  const [specialist, setSpecialist] = useState<string>();
  const [healthCheckRating, setHealthCheckRating] = useState<string>();
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
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
    setDiagnosisCodes([]);
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
      diagnosisCodes,
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
        <FormControl sx={{ mt: 1 }} fullWidth>
          <InputLabel id="diagnoseSelect">Diagnosis codes</InputLabel>
          <Select
            label="Diagnosis codes"
            labelId="diagnoseSelect"
            multiple
            value={diagnosisCodes}
            onChange={({ target }) =>
              setDiagnosisCodes(
                typeof target.value === "string"
                  ? target.value.split(",")
                  : target.value
              )
            }
            input={
              <OutlinedInput
                id="select-diagnoseSelect"
                label="Diagnosis codes"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() =>
                      setDiagnosisCodes(
                        diagnosisCodes.filter((item) => item !== value)
                      )
                    }
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {diagnoses.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} {d.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {typeOfEntry === EntryType.HealthCheck && (
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="healthcheckRating">Healthcheck rating</InputLabel>
            <Select
              label="Healthcheck rating"
              labelId="healthcheckRating"
              fullWidth
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
            >
              {Object.keys(HealthCheckRating)
                .filter((key) => isNaN(Number(key)))
                .map((key) => (
                  <MenuItem
                    key={key}
                    value={
                      HealthCheckRating[key as keyof typeof HealthCheckRating]
                    }
                  >
                    {key}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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
