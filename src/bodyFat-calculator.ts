import { BODY_FAT_COEFFICIENTS } from "./constants.js";
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
