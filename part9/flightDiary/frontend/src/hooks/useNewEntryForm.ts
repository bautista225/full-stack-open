import { useReducer } from "react";
import { NewDiaryEntry } from "../types";

type FormReducerAction =
  | {
      type: "change_value";
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | { type: "clear_form" };

interface NewEntryFormState {
  newEntry: NewDiaryEntry;
}

const INITIAL_STATE = {
  comment: "",
  date: "",
  visibility: "",
  weather: "",
};

const formReducer = (
  state: NewEntryFormState["newEntry"],
  action: FormReducerAction
) => {
  switch (action.type) {
    case "change_value": {
      const { inputName, inputValue } = action.payload;
      return { ...state, [inputName]: inputValue };
    }
    case "clear_form":
      return INITIAL_STATE;
  }
};

const useNewEntryForm = () => {
  return useReducer(formReducer, INITIAL_STATE);
};

export default useNewEntryForm;
