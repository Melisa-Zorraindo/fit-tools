import { BMR_COEFFICIENTS } from "./constants.js"
import type { Gender } from "./types.js"

/**
 * Calculate the Basal Metabolic Rate (BMR) using the Harris-Benedict equation.
 * @param {Gender} gender - The gender of the person ('male' or 'female')
 * @param {number} age - Age in years (integer)
 * @param {number} weight - Weight in kilograms (integer or floating-point)
 * @param {number} height - Height in centimeters (integer)
 * @returns {number} The calculated BMR rounded down to the nearest integer
 */
export const calculateBmr = (
  gender: Gender, age: number, weight: number, height: number
): number => {
  const coeffs = BMR_COEFFICIENTS[gender]

  return Math.floor(
    coeffs.baseline +
    coeffs.weight * weight +
    coeffs.height * height -
    coeffs.age * age
  )
}
