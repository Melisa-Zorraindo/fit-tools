import { BMR_HARRIS_BENEDICT, BMR_MIFFLIN_STJEOR } from "./constants.js"
import { Gender } from "./types.js"

/**
 * Calculate the Basal Metabolic Rate (BMR) using the Harris-Benedict equation.
 * @param {Gender} gender - The bioological gender of the person ('male' or 'female')
 * @param {number} age - Age in years (integer)
 * @param {number} weight - Weight in kilograms (integer or floating-point)
 * @param {number} height - Height in centimeters (integer)
 * @returns {number} The calculated BMR rounded down to the nearest integer
 */
export const calculateBmrHarrisBenedict = (
  gender: Gender, age: number, weight: number, height: number
): number => {
  const coeffs = BMR_HARRIS_BENEDICT[gender]

  return Math.floor(
    coeffs.baseline +
    coeffs.weight * weight +
    coeffs.height * height -
    coeffs.age * age
  )
}

/**
 * Calculate the Basal Metabolic Rate (BMR) using the Mifflin-StJeor equation.
 * @param {Gender} gender - The biological gender of the person ('male' or 'female'). Provinding incorrect gender assumes 'male'.
 * @param {number} age - Age in years (integer)
 * @param {number} weight - Weight in kilograms (integer or floating-point)
 * @param {number} height - Height in centimeters (integer)
 * @returns {number} The calculated BMR rounded down to the nearest integer
 */
export const calculateBmrMifflinStJeor = (
  gender: Gender, age: number, weight: number, height: number
): number => {
  const {
    weightMultiplier, heightMultiplier, ageMultiplier, femaleConstant,
    maleConstant
  } = BMR_MIFFLIN_STJEOR

  const baseline = (weightMultiplier * weight) +
    (heightMultiplier * height) -
    (ageMultiplier * age)

  return gender === Gender.female
    ? Math.floor(baseline - femaleConstant)
    : Math.floor(baseline + maleConstant)
}
