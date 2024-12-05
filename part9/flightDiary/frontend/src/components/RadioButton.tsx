interface RadioButtonProps {
  name: string;
  value: string;
  checkedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  name,
  value,
  checkedValue,
  handleChange,
}: RadioButtonProps) => {
  return (
    <label>
      {value}{" "}
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        onChange={handleChange}
        checked={value === checkedValue}
      />
    </label>
  );
};

export default RadioButton;
