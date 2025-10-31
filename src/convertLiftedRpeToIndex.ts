import { MINIMUM_RPE } from "./constants"

export const convertLiftedRpeToIndex = (liftedRpe: number): number => {
  return Math.round((liftedRpe - MINIMUM_RPE) / 0.5)
}
