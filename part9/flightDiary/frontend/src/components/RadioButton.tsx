interface RadioButtonProps {
  name: string;
  checkedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  name,
  checkedValue,
  handleChange,
}: RadioButtonProps) => {
  return (
    <label>
      {name}{" "}
      <input
        type="radio"
        id={name}
        name={name}
        value={name}
        onChange={handleChange}
        checked={name === checkedValue}
      />
    </label>
  );
};

export default RadioButton;
