import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";
import NewEntryForm from "./components/NewEntryForm";
import { NewDiaryEntry } from "./types";
import axios from "axios";
import {
  addNewDiaryEntry,
  getAllDiaryEntries,
} from "./services/diaryEntryService";

interface AppState {
  diaryEntries: DiaryEntry[];
  errorMessage: string;
}

function App() {
  const [diaryEntries, setDiaryEntries] = useState<AppState["diaryEntries"]>(
    []
  );
  const [errorMessage, setErrorMessage] =
    useState<AppState["errorMessage"]>("");

  useEffect(() => {
    getAllDiaryEntries().then(setDiaryEntries);
  }, []);

  const handleNewEntry = (newEntry: NewDiaryEntry) => {
    addNewDiaryEntry(newEntry)
      .then((addedDiaryEntry) => {
        setDiaryEntries((diaryEntries) => [...diaryEntries, addedDiaryEntry]);
        setErrorMessage("");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.error(error.response);
          setErrorMessage(error.response?.data);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <>
      <NewEntryForm errorMessage={errorMessage} onNewEntry={handleNewEntry} />
      <DiaryEntries diaryEntries={diaryEntries} />
    </>
  );
}

export default App;
