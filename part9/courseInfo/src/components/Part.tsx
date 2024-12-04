interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

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
        <div>
          <em>{coursePart.description}</em>
        </div>
      );
      break;
    case "group":
      body = <div>project exercises {coursePart.groupProjectCount}</div>;
      break;
    case "background":
      body = (
        <>
          <div>{coursePart.description}</div>
          <div>submit to {coursePart.backgroundMaterial}</div>
        </>
      );
      break;
    case "special":
      body = (
        <>
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>required skills: {coursePart.requirements.join(", ")}</div>
        </>
      );
      break;
    default:
      return assertNever(coursePart);
  }

  return (
    <div style={{ marginBottom: 10 }}>
      {title}
      {body}
    </div>
  );
};

export default Part;
