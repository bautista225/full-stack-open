import { Box, Typography } from "@mui/material";
import { Entry, HealthCheckRating } from "../../types";
import {
  Favorite,
  LocalHospital,
  MonitorHeart,
  Work,
} from "@mui/icons-material";

interface Props {
  entry: Entry;
}

const entryBoxStyle = {
  border: 2,
  borderRadius: 1.5,
  padding: 1,
  marginY: 1,
};

const HospitalEntry = ({ entry }: Props) => {
  if (!(entry.type === "Hospital"))
    throw new Error("Invalid entry type for HospitalEntry component");
  return (
    <Box sx={entryBoxStyle}>
      <Typography variant="body1">
        {entry.date} <LocalHospital />
      </Typography>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>
      <Typography variant="body1">
        discharged {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const OccupationalHealthcare = ({ entry }: Props) => {
  if (!(entry.type === "OccupationalHealthcare"))
    throw new Error("Invalid entry type for OccupationalHealthcare component");
  return (
    <Box sx={entryBoxStyle}>
      <Typography variant="body1">
        {entry.date} <Work /> <em>{entry.employerName}</em>
      </Typography>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>
      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const HealthCheck = ({ entry }: Props) => {
  if (!(entry.type === "HealthCheck"))
    throw new Error("Invalid entry type for HealthCheck component");
  return (
    <Box sx={entryBoxStyle}>
      <Typography variant="body1">
        {entry.date} <MonitorHeart />
      </Typography>
      <Typography variant="body1">
        <em>{entry.description}</em>
      </Typography>
      <Favorite
        sx={{
          color:
            entry.healthCheckRating === HealthCheckRating.Healthy
              ? "green"
              : entry.healthCheckRating === HealthCheckRating.LowRisk
              ? "yellow"
              : entry.healthCheckRating === HealthCheckRating.HighRisk
              ? "orange"
              : "red",
        }}
      />
      <Typography variant="body1">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
  }
};

export default EntryDetails;
