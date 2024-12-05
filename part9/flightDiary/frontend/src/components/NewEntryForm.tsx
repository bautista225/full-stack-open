import { NewDiaryEntry } from "../types";
import RadioButton from "./RadioButton";
import useNewEntryForm from "../hooks/useNewEntryForm";

interface NewEntryFormProps {
  errorMessage: string;
  onNewEntry: (newEntry: NewDiaryEntry) => void;
}

const VISIBILITY_OPTIONS = ["great", "good", "ok", "poor"];
const WEATHER_OPTIONS = ["sunny", "rainy", "cloudy", "stormy", "windy"];

const NewEntryForm = ({ errorMessage, onNewEntry }: NewEntryFormProps) => {
  const [newEntry, dispatch] = useNewEntryForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "change_value",
      payload: {
        inputName: event.target.name,
        inputValue: event.target.value,
      },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(newEntry);

    onNewEntry(newEntry);

    dispatch({ type: "clear_form" });
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
            name="date"
            value={newEntry.date}
            onChange={handleChange}
          />
        </div>
        <div>
          visibility{" "}
          {VISIBILITY_OPTIONS.map((o) => (
            <RadioButton
              key={o}
              name="visibility"
              value={o}
              checkedValue={newEntry.visibility}
              handleChange={handleChange}
            />
          ))}
        </div>
        <div>
          weather{" "}
          {WEATHER_OPTIONS.map((o) => (
            <RadioButton
              key={o}
              name="weather"
              value={o}
              checkedValue={newEntry.weather}
              handleChange={handleChange}
            />
          ))}
        </div>
        <div>
          comment
          <input
            name="comment"
            value={newEntry.comment}
            onChange={handleChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
