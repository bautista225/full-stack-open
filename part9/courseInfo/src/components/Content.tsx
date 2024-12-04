import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};

export default Content;
