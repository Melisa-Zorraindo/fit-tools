import { BMI_COEFFICIENTS, BODY_FAT_COEFFICIENTS } from "./constants.js";
import { Gender } from "./types.js";

/**
 * Calculates estimated body fat percentage using the U.S. Navy circumference method.
 * @param {Gender} gender - The gender of the person ('male' or 'female')
 * @param {number} waist - Waist circumference measured at navel level (cm)
 * @param {number} neck - Neck circumference measured below the Adam's apple (cm)
 * @param {number} height - Body height (cm)
 * @param {number} [hip] - Hip circumference measured at the widest point of the glutes (cm). 
 *                         Required if gender is 'female'; must not be provided if gender is 'male'.
 * @returns {number} Estimated body fat percentage
 */
export const calculateBodyFatPercentage = (
  gender: Gender, waist: number, neck: number, height: number, hip?: number
): number => {
  const coeffs = BODY_FAT_COEFFICIENTS[gender]
  const circumferenceSum = gender === Gender.female
    ? waist + (hip || 0) - neck
    : waist - neck

  const result = Number((
    coeffs.multiplier /
    (
      coeffs.baseline
      - coeffs.circumference * Math.log10(circumferenceSum)
      + coeffs.height * Math.log10(height)
    ) - coeffs.constant
  ).toFixed(2))

  return result > 0 ? result : 0
}

/**
 * Calculates estimated body fat percentage using the American Diabetes Association method.
 * @param {number} age - The age of the person
 * @param {Gender} gender - The gender of the person ('male' or 'female')
 * @param {number} weight - Weight in kilograms (integer or floating-point)
 * @param {number} height - Height in centimeters (integer)
 * @returns {number} Estimated body fat percentage
 */
export const calculateBodyFatPercentageAda = (
  age: number, gender: Gender, weight: number, height: number
): number => {
  const coeffs = BMI_COEFFICIENTS
  const bmi = weight / Math.pow(height / 100, 2) // bmi is calculated with height in m
  const squaredBmi = Math.pow(bmi, 2)
  const sex = gender === 'female' ? 1 : 0

  return Number((
    coeffs.baseline +
    (coeffs.age * age) +
    (coeffs.sex * sex) +
    (coeffs.bmi * bmi) -
    (coeffs.squaredBmi * squaredBmi) +
    (coeffs.bmiSex * bmi * sex) -
    (coeffs.bmiAge * bmi * age) -
    (coeffs.squaredBmiSex * squaredBmi * sex) +
    (coeffs.squaredBmiAge * squaredBmi * age)
  ).toFixed(2))
}
