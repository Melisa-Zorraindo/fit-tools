const MINIMUM_RPE: number = 6.5

const convertLiftedRpeToIndex = (liftedRpe: number): number => {
    return Math.round((liftedRpe - MINIMUM_RPE) / 0.5)
}

const coefficients: number[][] = [
  // RPE 6.5
  [0.878, 0.850, 0.824, 0.799, 0.774, 0.751, 0.723, 0.694, 0.667, 0.640, 0.613, 0.586, 0.561, 0.537, 0.514],
  // RPE 7.0
  [0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653, 0.626, 0.599, 0.574, 0.549, 0.525],
  // RPE 7.5
  [0.907, 0.878, 0.850, 0.824, 0.798, 0.774, 0.751, 0.723, 0.693, 0.667, 0.640, 0.613, 0.588, 0.563, 0.539],
  // RPE 8.0
  [0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653, 0.626, 0.601, 0.576, 0.552],
  // RPE 8.5
  [0.939, 0.907, 0.878, 0.850, 0.824, 0.798, 0.774, 0.751, 0.723, 0.693, 0.667, 0.640, 0.615, 0.590, 0.566],
  // RPE 9.0
  [0.955, 0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653, 0.628, 0.603, 0.579],
  // RPE 9.5
  [0.978, 0.938, 0.907, 0.878, 0.850, 0.824, 0.798, 0.774, 0.751, 0.723, 0.693, 0.667, 0.642, 0.617, 0.593],
  // RPE 10.0
  [1.000, 0.955, 0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.654, 0.629, 0.605]
]

const isNumber = (value: number): boolean => {
  return typeof value === 'number' && !isNaN(value)
}

const isGreaterThan = (value: number, comparator: number): boolean => {
  return value >= comparator
}

const isGender = (gender: string): boolean => {
  return gender === 'male' || gender === 'female'
}

export const calculateWeightToLift = (
  rm: number, desiredReps: number, desiredRpe: number
): number => {
  let errors: string[] = []
 
  !isNumber(rm) && errors.push('rm must be a number')
  !isNumber(desiredReps) && errors.push('desiredReps must be a number')
  !isNumber(desiredRpe) && errors.push('desiredRpe must be a number')

  if (errors.length) {
    throw new Error(errors.toString())
  }

  const wantedRpe: number[] = coefficients[desiredRpe]
  const coeffForRecommendedWeight: number = wantedRpe[desiredReps - 1]

  return Number((rm * coeffForRecommendedWeight).toFixed(1))
}

export const calculateOneRepMaxTuchscherer = (
  liftedRpe: number, liftedReps: number, liftedWeight: number
): number => {
    let errors: string[] = []
 
  !isNumber(liftedRpe) && errors.push('liftedRpe must be a number')
  !isGreaterThan(liftedRpe, MINIMUM_RPE) && errors.push(`liftedRpe must be greater than ${MINIMUM_RPE}`)
  !isNumber(liftedReps) && errors.push('liftedReps must be a number')
  !isNumber(liftedWeight) && errors.push('liftedWeight must be a number')

  if (errors.length) {
    throw new Error(errors.toString())
  }

  const rpe = convertLiftedRpeToIndex(liftedRpe)
  const selectedRpe: number[] = coefficients[rpe]
  const coeffForRM: number = selectedRpe[liftedReps - 1]

  return Number((liftedWeight / coeffForRM).toFixed(1))
}

export const calculateOneRepMaxEpley = (
  liftedWeight: number, liftedReps: number
): number | string[] => {
  let errors: string[] = []
 
  !isNumber(liftedWeight) && errors.push('liftedWeight must be a number')
  !isNumber(liftedReps) && errors.push('liftedReps must be a number')

  if (errors.length) {
    throw new Error(errors.toString())
  }

  return liftedWeight * (1 + liftedReps / 30)
}

export const calculateOneRepMaxBrzycki = (
  liftedWeight: number, liftedReps: number
): number | string[] => {
  let errors: string[] = []
 
  !isNumber(liftedWeight) && errors.push('liftedWeight must be a number')
  !isNumber(liftedReps) && errors.push('liftedReps must be a number')

  if (errors.length) {
    throw new Error(errors.toString())
  }

  return liftedWeight / (1.0278 - 0.0278 * liftedReps)
}

export const calculateOneRepMaxLombardi = (
  liftedWeight: number, liftedReps: number
): number | string[] => {
  let errors: string[] = []
 
  !isNumber(liftedWeight) && errors.push('liftedWeight must be a number')
  !isNumber(liftedReps) && errors.push('liftedReps must be a number')

  if (errors.length) {
    throw new Error(errors.toString())
  }

  return liftedWeight * Math.pow(liftedReps, 0.10)
}

export const calculateOneRepMaxOConner = (
  liftedWeight: number, liftedReps: number
): number | string[] => {
  let errors: string[] = []
 
  !isNumber(liftedWeight) && errors.push('liftedWeight must be a number')
  !isNumber(liftedReps) && errors.push('liftedReps must be a number')

  if (errors.length) {
    throw new Error(errors.toString())
  }

  return liftedWeight * (1 + 0.025 * liftedReps)
}
