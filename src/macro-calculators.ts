import { CARBS_CALORIES, FAT_CALORIES, PROTEIN_CALORIES } from "./constants"
import type { Macros } from "./types"

/**
 * Calculates daily macronutrient requirements based on TDEE
 * @param {number} tdee - Total Daily Energy Expenditure in calories (integer)
 * @param {number} [carbs] - Optional percentage of calories from carbohydrates (0-100) (integer or floating-point)
 * @param {number} [fat] - Optional percentage of calories from fat (0-100) (integer or floating-point)
 * @param {number} [protein] - Optional percentage of calories from protein (0-100) (integer or floating-point). If weight is not provided, this field is mandatory.
 * @param {number} [weight] - Optional body weight in kg (integer or floating-point). If protein is not provided, this field is mandatory.
 * @returns {Macros} Object containing daily grams of carbs, fat and protein
 */
export const calculateMacros = (
  tdee: number, carbs?: number, fat?: number, protein?: number, weight?: number
): Macros => {
  const p = Math.floor((tdee * (protein ?? 0) / 100) / PROTEIN_CALORIES)
    || Math.floor((weight ?? 0) * 2);

  let remainingCalories = tdee - p * PROTEIN_CALORIES;

  const c = carbs != null
    ? Math.floor((tdee * (carbs ?? 0) / 100) / CARBS_CALORIES)
    : Math.floor((remainingCalories / 2) / CARBS_CALORIES);

  remainingCalories = remainingCalories - c * CARBS_CALORIES;

  const f = fat != null
    ? Math.floor((tdee * (fat ?? 0) / 100) / FAT_CALORIES)
    : Math.floor((remainingCalories) / FAT_CALORIES);

  return {
    carbs: c,
    fat: f,
    protein: p,
  };
}
