import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "/api/diaries";

export const getAllDiaryEntries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get(baseUrl);

  return response.data;
};

export const addNewDiaryEntry = (
  newEntry: NewDiaryEntry
): Promise<DiaryEntry> => {
  return axios.post(baseUrl, newEntry).then((response) => response.data);
};
