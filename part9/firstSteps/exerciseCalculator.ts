import { isNotNumber } from "./utils.ts";

interface CalculateExercisesValues {
  hoursPerDay: number[];
  targetHours: number;
}

const checkArguments = (
  hoursPerDay: unknown,
  targetHours: unknown
): boolean => {
  return (
    Array.isArray(hoursPerDay) &&
    hoursPerDay.filter((v) => isNotNumber(v)).length === 0 &&
    !isNotNumber(targetHours)
  );
};

const parseArguments = (args: string[]): CalculateExercisesValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  if (checkArguments(args.slice(3), args[2])) {
    return {
      targetHours: Number(args[2]),
      hoursPerDay: args.slice(3).map((v) => Number(v)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

interface ExerciseCalculations {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

const calculateExercises = (
  hoursPerDay: number[],
  targetHours: number
): ExerciseCalculations => {
  const averageHours =
    hoursPerDay.reduce((acc, d) => acc + d, 0) / hoursPerDay.length;
  const rating =
    averageHours >= targetHours ? 3 : averageHours >= targetHours / 2 ? 2 : 1;
  return {
    periodLength: hoursPerDay.length,
    trainingDays: hoursPerDay.filter((d) => d > 0).length,
    target: targetHours,
    average: averageHours,
    success: averageHours >= targetHours,
    rating,
    ratingDescription:
      rating === 3
        ? "target achieved!"
        : rating === 2
        ? "not too bad but could be better"
        : "bad",
  };
};

try {
  const { hoursPerDay, targetHours } = parseArguments(process.argv);
  console.log(calculateExercises(hoursPerDay, targetHours));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default { checkArguments, calculateExercises };
