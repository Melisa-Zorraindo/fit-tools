import { COEFFICIENTS } from "./constants"
import { convertLiftedRpeToIndex } from "./convertLiftedRpeToIndex"

/**
 * Calculates one rep max using the Brzycki formula
 * @param {number} liftedReps - Number of repetitions performed (integer)
 * @param {number} liftedWeight - Weight lifted in kg (integer or floating-point)
 * @returns {number} Estimated one rep max rounded to 1 decimal place
 */
export const calculateOneRepMaxBrzycki = (
  liftedReps: number, liftedWeight: number
): number => {
  return Number((liftedWeight / (1.0278 - 0.0278 * liftedReps)).toFixed(1))
}

/**
 * Calculates one rep max using the Epley formula
 * @param {number} liftedReps - Number of repetitions performed (integer)
 * @param {number} liftedWeight - Weight lifted in kg (integer or floating-point)
 * @returns {number} Estimated one rep max rounded to 1 decimal place
 */
export const calculateOneRepMaxEpley = (
  liftedReps: number, liftedWeight: number
): number => {
  return Number((liftedWeight * (1 + liftedReps / 30)).toFixed(1))
}

/**
 * Calculates one rep max using the Lombardi formula
 * @param {number} liftedReps - Number of repetitions performed (integer)
 * @param {number} liftedWeight - Weight lifted in kg (integer or floating-point)
 * @returns {number} Estimated one rep max rounded to 1 decimal place
 */
export const calculateOneRepMaxLombardi = (
  liftedReps: number, liftedWeight: number
): number => {
  return Number((liftedWeight * Math.pow(liftedReps, 0.10)).toFixed(1))
}

/**
 * Calculates one rep max using the O'Conner formula
 * @param {number} liftedReps - Number of repetitions performed (integer)
 * @param {number} liftedWeight - Weight lifted in kg (integer or floating-point)
 * @returns {number} Estimated one rep max rounded to 1 decimal place
 */
export const calculateOneRepMaxOConner = (
  liftedReps: number, liftedWeight: number
): number => {
  return Number((liftedWeight * (1 + 0.025 * liftedReps)).toFixed(1))
}

/**
 * Calculates one rep max using the Tuchscherer formula
 * @param {number} liftedReps - Number of repetitions performed (integer)
 * @param {number} liftedRpe - Rate of Perceived Exertion (RPE) (e.g., 6.5, 7.0). Valid range: 6.5 (minimum) to 10 (maximum).
 * @param {number} liftedWeight - Weight lifted in kg (integer or floating-point)
 * @returns {number} Estimated one rep max rounded to 1 decimal place
 */
export const calculateOneRepMaxTuchscherer = (
  liftedReps: number, liftedRpe: number, liftedWeight: number
): number => {
  const rpe = convertLiftedRpeToIndex(liftedRpe)
  const selectedRpe: number[] = COEFFICIENTS[rpe]
  const coeffForRM: number = selectedRpe[liftedReps - 1]

  return Number((liftedWeight / coeffForRM).toFixed(1))
}

/**
 * Calculates weight to lift based on desired reps, RPE and one rep max
 * @param {number} desiredReps - Target number of repetitions (integer)
 * @param {number} desiredRpe - Target Rate of Perceived Exertion (RPE) (e.g., 6.5, 7.0). Valid range: 6.5 (minimum) to 10 (maximum).
 * @param {number} oneRepMax - One rep max in kg (integer or floating-point)
 * @returns {number} Recommended weight to lift rounded to 1 decimal place
 */
export const calculateWeightToLift = (
  desiredReps: number, desiredRpe: number, oneRepMax: number
): number => {
  const wantedRpe: number[] = COEFFICIENTS[desiredRpe]
  const coeffForRecommendedWeight: number = wantedRpe[desiredReps - 1]

  return Number((oneRepMax * coeffForRecommendedWeight).toFixed(1))
}
