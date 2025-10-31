import { BMR_COEFFICIENTS } from "./constants"
import type { GenderType } from "./types"

/**
 * Calculate the Basal Metabolic Rate (BMR) using the Harris-Benedict equation.
 * @param {GenderType} gender - The gender of the person ('male' or 'female')
 * @param {number} age - Age in years (integer)
 * @param {number} weight - Weight in kilograms (integer or floating-point)
 * @param {number} height - Height in centimeters (integer)
 * @returns {number} The calculated BMR rounded down to the nearest integer
 */
export const calculateBmr = (
  gender: GenderType, age: number, weight: number, height: number
): number => {
  const coeffs = BMR_COEFFICIENTS[gender]

  return Math.floor(
    coeffs.baseline +
    coeffs.weight * weight +
    coeffs.height * height -
    coeffs.age * age
  )
}
