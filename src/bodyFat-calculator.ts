import { BODY_FAT_COEFFICIENTS } from "constants.js";
import type { BodyFatParams } from "types.js";

/**
 * Calculates estimated body fat percentage using the U.S. Navy circumference method.
 * @param {Object} params - Parameters for the calculation
 * @param {'male' | 'female'} params.gender - Biological sex used for the formula
 * @param {number} params.waist - Waist circumference measured at navel level (cm)
 * @param {number} params.neck - Neck circumference measured below the Adam's apple (cm)
 * @param {number} params.height - Body height (cm)
 * @param {number} [params.hip] - Hip circumference measured at the widest point of the glutes (cm). 
 *                                 Required if gender is 'female'; must not be provided if gender is 'male'.
 * @returns {number} Estimated body fat percentage
 */
export const calculateBodyFatPercentage = (params: BodyFatParams): number => {
  const { gender, waist, neck, height, hip } = params
  const coeffs = BODY_FAT_COEFFICIENTS[gender]
  const circumferenceSum = waist + (gender === 'female' ? (hip || 0) : 0) - neck
  const result = coeffs.multiplier /
    (
      coeffs.baseline
      - coeffs.circumference * Math.log10(circumferenceSum)
      + coeffs.height * Math.log10(height)
    ) - coeffs.constant

  return result > 0 ? result : 0
}
