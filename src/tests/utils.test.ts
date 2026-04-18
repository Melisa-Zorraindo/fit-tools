export const MAX_POSITIVE_NUMBER = 1 ** 1000
export const ROUNDS = 100

export const getRandomFloat = (min: number, max: number): number => {
  return Number((Math.random() * (max - min + 1) + min).toFixed(2));
}

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getInvalidValue = (
  useExtremeValues: boolean, rangeStart: number, rangeEnd: number
): number => {
  if (useExtremeValues) return MAX_POSITIVE_NUMBER

  return Math.random() > 0.5
    ? getRandomInt(rangeStart, rangeEnd)
    : getRandomFloat(rangeStart, rangeEnd)
}

export const getValidValue = (rangeStart: number, rangeEnd: number): number => {
  return Math.random() > 0.5
    ? getRandomInt(rangeStart, rangeEnd)
    : getRandomFloat(rangeStart, rangeEnd)
}
