import { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  diaryEntries: DiaryEntry[];
}

const DiaryEntries = ({ diaryEntries }: DiaryEntriesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map((de) => (
        <div key={de.id}>
          <h4>{de.date}</h4>
          <div>visibility: {de.visibility}</div>
          <div>weather: {de.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
