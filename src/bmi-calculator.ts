import { BMI_CATEGORIES } from "./constants.js";
import type { BMI, BmiCategory } from "./types.js";

/**
 * Calculate the Body Mass Index (BMI).
 * @param {number} weight - Weight in kilograms (integer or floating-point)
 * @param {number} height - Height in centimeters (integer)
 * @returns {BMI} The calculated BMI and its equivalent category
 */
export const calculateBmi = (weight: number, height: number): BMI => {
  const bmi = weight / Math.pow(height / 100, 2); // converts height to m before squaring it
  const category: BmiCategory = BMI_CATEGORIES.find(
    item => bmi < item.max
  )!.category

  return {
    bmi,
    category
  }
}
