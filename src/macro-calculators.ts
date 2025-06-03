const PROTEIN_CALORIES = 4
const FAT_CALORIES = 9
const CARBS_CALORIES = 4

type Macros = {
  carbs: number,
  fat: number,
  protein: number
}

const remainingCalories = (tdee: number, p: number): number => {
  return Math.floor((tdee - p * PROTEIN_CALORIES) * 50 / 100)
}

export const calculateMacros = (
  tdee: number, weight: number, p: number, f: number, c: number
): Macros | Error => {
  if (!tdee) {
    return new Error("TDEE is required")
  }

  if (p === undefined && !weight) {
    return new Error("Please enter either protein percentage or weight")
  }

  if (
    p !== undefined &&
    f !== undefined &&
    c !== undefined &&
    p + f + c !== 100
  ) {
    return new Error("Macros percentages must amount to 100")
  }

  const protein = Math.floor((tdee * p / 100) / PROTEIN_CALORIES) || Math.floor(weight * 2);
  const fat = Math.floor((tdee * f / 100) / FAT_CALORIES) || remainingCalories(tdee, protein);
  const carbs = Math.floor((tdee * c / 100) / CARBS_CALORIES) || remainingCalories(tdee, protein);

  return {
    carbs,
    fat,
    protein,
  };
}
