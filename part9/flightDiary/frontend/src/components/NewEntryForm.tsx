import { useState } from "react";
import { NewDiaryEntry } from "../types";
import RadioButton from "./RadioButton";

interface NewEntryFormProps {
  errorMessage: string;
  onNewEntry: (newEntry: NewDiaryEntry) => void;
}

const NewEntryForm = ({ errorMessage, onNewEntry }: NewEntryFormProps) => {
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({
    comment: "",
    date: "",
    visibility: "",
    weather: "",
  });

  const visibilityOptions = ["great", "good", "ok", "poor"];
  const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(newEntry);

    onNewEntry(newEntry);
    setNewEntry({
      comment: "",
      date: "",
      visibility: "",
      weather: "",
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="date"
            value={newEntry.date}
            onChange={(event) =>
              setNewEntry({ ...newEntry, date: event.target.value })
            }
          />
        </div>
        <div>
          visibility{" "}
          {visibilityOptions.map((o) => (
            <RadioButton
              key={o}
              name={o}
              checkedValue={newEntry.visibility}
              handleChange={(event) =>
                setNewEntry({ ...newEntry, visibility: event.target.value })
              }
            />
          ))}
        </div>
        <div>
          weather{" "}
          {weatherOptions.map((o) => (
            <RadioButton
              key={o}
              name={o}
              checkedValue={newEntry.weather}
              handleChange={(event) =>
                setNewEntry({ ...newEntry, weather: event.target.value })
              }
            />
          ))}
        </div>
        <div>
          comment
          <input
            value={newEntry.comment}
            onChange={(event) =>
              setNewEntry({ ...newEntry, comment: event.target.value })
            }
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
