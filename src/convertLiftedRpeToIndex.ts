import { MINIMUM_RPE } from "./constants.js"

export const convertLiftedRpeToIndex = (liftedRpe: number): number =>
  Math.round((liftedRpe - MINIMUM_RPE) / 0.5)
