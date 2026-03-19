import { calculateBodyFatPercentage } from 'bodyFat-calculator.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getInvalidValue, getValidValue, ROUNDS } from './utils.test.js';
import { BodyFatParams, GenderType } from 'types.js';

describe("bodyFat-calculator properties", () => {
  it("body fat percentage decreases with height", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender: GenderType = Math.random() > 0.5 ? "male" : "female";
      const waist = getValidValue(60, 120);
      const neck = getValidValue(30, 50);
      const hip = getValidValue(85, 130);
      const heightOne = getValidValue(50, 100);
      const heightTwo = getValidValue(101, 251);
      const params = gender === 'male'
        ? { gender, waist, neck }
        : { gender, waist, neck, hip }

      const resultOne = calculateBodyFatPercentage({ ...params, height: heightOne })
      const resultTwo = calculateBodyFatPercentage({ ...params, height: heightTwo })

      if (resultOne === 0 || resultTwo === 0) {
        i--
        continue
      }

      const result = resultOne > resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)} | height one: ${heightOne} | height two: ${heightTwo}`
      )
    }
  })

  it("if male is provided, hip is ignored", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const waist = getValidValue(60, 120);
      const neck = getValidValue(30, 50);
      const hip = getValidValue(85, 130);
      const height = getValidValue(50, 251);
      const male: GenderType = 'male'
      const maleParams = { gender: male, waist, neck, height }
      const maleParamsWithHip = {
        gender: male, waist, neck, height, hip
      } as unknown as BodyFatParams
      
      const maleResult = calculateBodyFatPercentage(maleParams)
      const maleResultWithHip = calculateBodyFatPercentage(maleParamsWithHip)

      const result = maleResult === maleResultWithHip
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | male params: ${JSON.stringify(maleParams)} | female params: ${JSON.stringify(maleResultWithHip)}`
      )
    }
  })

  it("increases in circumference increase body fat percentage", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender: GenderType = Math.random() > 0.5 ? "male" : "female";
      const waistOne = getValidValue(60, 85);
      const waistTwo = getValidValue(105, 120);
      const neckOne = getValidValue(30, 35);
      const neckTwo = getValidValue(45, 50);
      const hipOne = getValidValue(85, 90);
      const hipTwo = getValidValue(115, 130);
      const height = getValidValue(50, 251);
      const paramsOne = gender === 'male'
        ? { gender, waist: waistOne, neck: neckOne, height }
        : { gender, waist: waistOne, neck: neckOne, height, hip: hipOne }
      const paramsTwo = gender === 'male'
        ? { gender, waist: waistTwo, neck: neckTwo, height }
        : { gender, waist: waistTwo, neck: neckTwo, height, hip: hipTwo }

      const resultOne = calculateBodyFatPercentage(paramsOne)
      const resultTwo = calculateBodyFatPercentage(paramsTwo)

      const result = resultOne < resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params one: ${JSON.stringify(paramsOne)} | params two: ${JSON.stringify(paramsTwo)}`
      )
    }
  })

  it("never returns NaN or Infinity", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender: GenderType = Math.random() > 0.5 ? "male" : "female"
      const waist = getInvalidValue(Math.random() > 0.5, -500, 0)
      const neck = getInvalidValue(Math.random() > 0.5, -500, 0)
      const hip = getInvalidValue(Math.random() > 0.5, -500, 0)
      const height = getInvalidValue(Math.random() > 0.5, -500, 0)
      const params = gender === "male"
        ? { gender, waist, neck, height }
        : { gender, waist, neck, hip, height }

      const result = calculateBodyFatPercentage(params)
      assert.ok(
        Number.isFinite(result),
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)}`
      )
    }
  })

  it("different genders produce different results for same measurements", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const male: GenderType = "male";
      const female: GenderType = "female";
      const waist = getValidValue(60, 120);
      const neck = getValidValue(30, 50);
      const hip = getValidValue(85, 130);
      const height = getValidValue(50, 251);
      const maleParams = { gender: male, waist, neck, height }
      const femaleParams = { gender: female, waist, neck, height, hip }

      const resultMale = calculateBodyFatPercentage(maleParams)
      const resultFemale = calculateBodyFatPercentage(femaleParams)

      if (resultMale === 0 || resultFemale === 0) {
        i--
        continue
      }

      const result = resultMale !== resultFemale
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | male params: ${JSON.stringify(maleParams)} | female params: ${JSON.stringify(femaleParams)}`
      )
    }
  })

  // edge case where waist === neck (circumference = 0)
  it("if waist === neck, it does not return NaN or Infinity", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender: GenderType = Math.random() > 0.5 ? "male" : "female"
      const waist = 0
      const neck = 0
      const hip = getInvalidValue(Math.random() > 0.5, -500, 0)
      const height = getInvalidValue(Math.random() > 0.5, -500, 0)
      const params = gender === "male"
        ? { gender, waist, neck, height }
        : { gender, waist, neck, hip, height }

      const result = calculateBodyFatPercentage(params)

      assert.ok(
        Number.isFinite(result),
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)}`
      )
    }
  })
})
