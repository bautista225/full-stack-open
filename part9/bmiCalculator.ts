import { isNotNumber } from "./utils";

interface CalculateBmiValues {
  height: number;
  mass: number;
}

const parseArguments = (args: string[]): CalculateBmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, mass: number): String => {
  const bmi = (mass / (height / 100) ** 2);

  if (bmi < 16) return "Underweight (Severe thinness)";
  else if (bmi < 17) return "Underweight (Moderate thinness)";
  else if (bmi < 18.5) return "Underweight (Mild thinness)";
  else if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 30) return "Overweight (Pre-obese)";
  else if (bmi < 35) return "Obese (Class I)";
  else if (bmi < 40) return "Obese (Class II)";
  else return "Obese (Class III)";
};

try {
  const { height, mass } = parseArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
