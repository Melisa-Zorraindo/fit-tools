import { Gender } from "../types.js";
import { femalePrototypes } from "./assets/femalePrototypes.js";
import { malePrototypes } from "./assets/malePrototypes.js";
import { Prototype } from "./testTypes.js";

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

export const getGender = (): Gender => {
  return Math.random() > 0.5
    ? Gender.female
    : Gender.male
}

export const getPrototype = (gender: Gender): Prototype => {
  const randomIndex = getRandomInt(0, 49)
  return gender === Gender.female
    ? femalePrototypes[randomIndex]
    : malePrototypes[randomIndex]
}
