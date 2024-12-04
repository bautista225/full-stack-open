interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  const title = (
    <strong>
      {coursePart.name} {coursePart.exerciseCount}
    </strong>
  );

  let body = <></>;

  switch (coursePart.kind) {
    case "basic":
      body = (
        <p>
          <em>{coursePart.description}</em>
        </p>
      );
      break;
    case "group":
      body = <p>project exercises {coursePart.groupProjectCount}</p>;
      break;
    case "background":
      body = (
        <>
          <p>{coursePart.description}</p>
          <p>submit to {coursePart.backgroundMaterial}</p>
        </>
      );
      break;
    case "special":
      body = (
        <>
          <p>
            <em>{coursePart.description}</em>
          </p>
          <p>required skills: {coursePart.requirements.join(", ")}</p>
        </>
      );
      break;
  }

  return (
    <div>
      {title}
      {body}
    </div>
  );
};

export default Part;
