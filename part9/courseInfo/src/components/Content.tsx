interface ContentPart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: ContentPart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((p) => (
        <p>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
