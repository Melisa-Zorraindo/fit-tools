import { calculateBodyFatPercentage, calculateBodyFatPercentageAda } from '../bodyFat-calculator.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getInvalidValue, getValidValue, ROUNDS, getPrototype, getGender } from './utils.test.js';
import { Gender } from '../types.js';

describe("bodyFat-calculator U.S. Navy properties", () => {
  it("body fat percentage decreases with height", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const waist = prototype.waist_circumference_cm;
      const neck = prototype.neck_circumference_cm;
      const hip = prototype.hip_circumference_cm
        ? prototype.hip_circumference_cm
        : undefined;
      const heightOne = gender === 'female' ? 165 : 175;
      const heightTwo = heightOne + 10;
      const params = Gender.male
        ? { gender, waist, neck }
        : { gender, waist, neck, hip }

      const resultOne = calculateBodyFatPercentage(
        gender, waist, neck, heightOne, hip
      )
      const resultTwo = calculateBodyFatPercentage(
        gender, waist, neck, heightTwo, hip
      )

      const result = resultOne > resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)} | height one: ${heightOne} | height two: ${heightTwo}`
      )
    }
  })

  it("if male is provided, hip is ignored", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const prototype = getPrototype('male');

      const waist = prototype.waist_circumference_cm;
      const neck = prototype.neck_circumference_cm;
      const hip = getValidValue(85, 130);
      const height = prototype.height_cm;

      const maleParams = {
        gender: prototype.gender,
        waist,
        neck,
        height
      }
      const maleParamsWithHip = {
        gender: prototype.gender,
        waist,
        neck,
        height,
        hip
      }

      const maleResult = calculateBodyFatPercentage('male', waist, neck, height)
      const maleResultWithHip = calculateBodyFatPercentage(
        'male', waist, neck, height, hip
      )

      const result = maleResult === maleResultWithHip
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | male params: ${JSON.stringify(maleParams)} | male params with hip: ${JSON.stringify(maleParamsWithHip)}`
      )
    }
  })

  it("if female is provided but hip is not, it returns a number", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const prototype = getPrototype('female');

      const waist = prototype.waist_circumference_cm;
      const neck = prototype.neck_circumference_cm;
      const height = prototype.height_cm;

      const femaleParamsWithNoHip = {
        gender: prototype.gender,
        waist,
        neck,
        height
      }

      const result = calculateBodyFatPercentage('female', waist, neck, height)
      assert.ok(
        Number.isFinite(result),
        `Invalid result: ${result} | iteration ${i} | female params with no hip: ${JSON.stringify(femaleParamsWithNoHip)}`
      )
    }
  })

  it("higher waist increases body fat percentage", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const waistOne = prototype.waist_circumference_cm;
      const waistTwo = prototype.waist_circumference_cm + 10;
      const neck = prototype.neck_circumference_cm;
      const hip = prototype.hip_circumference_cm;
      const height = prototype.height_cm;

      const paramsOne = Gender.male
        ? { gender, waist: waistOne, neck, height }
        : { gender, waist: waistOne, neck, height, hip }
      const paramsTwo = Gender.male
        ? { gender, waist: waistTwo, neck, height }
        : { gender, waist: waistTwo, neck, height, hip }

      const resultOne = calculateBodyFatPercentage(
        gender, waistOne, neck, height, hip
      )
      const resultTwo = calculateBodyFatPercentage(
        gender, waistTwo, neck, height, hip
      )

      const result = resultOne < resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params one: ${JSON.stringify(paramsOne)} | params two: ${JSON.stringify(paramsTwo)}`
      )
    }
  })

  it("higher neck decreases body fat percentage", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const waist = prototype.waist_circumference_cm;
      const neckOne = prototype.neck_circumference_cm;
      const neckTwo = prototype.neck_circumference_cm + 10;
      const hip = prototype.hip_circumference_cm;
      const height = prototype.height_cm;

      const paramsOne = Gender.male
        ? { gender, waist, neck: neckOne, height }
        : { gender, waist, neck: neckTwo, height, hip }
      const paramsTwo = Gender.male
        ? { gender, waist, neck: neckOne, height }
        : { gender, waist, neck: neckTwo, height, hip }

      const resultOne = calculateBodyFatPercentage(
        gender, waist, neckOne, height, hip
      )
      const resultTwo = calculateBodyFatPercentage(
        gender, waist, neckTwo, height, hip
      )

      const result = resultOne > resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params one: ${JSON.stringify(paramsOne)} | params two: ${JSON.stringify(paramsTwo)}`
      )
    }
  })

  it("higher hip increases body fat percentage", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const prototype = getPrototype('female');

      const waist = prototype.waist_circumference_cm;
      const neck = prototype.neck_circumference_cm;
      const hipOne = prototype.hip_circumference_cm;
      const hipTwo = prototype.hip_circumference_cm + 10;
      const height = prototype.height_cm;

      const paramsOne = { gender: 'female', waist, neck, height, hip: hipOne }
      const paramsTwo = { gender: 'female', waist, neck, height, hip: hipTwo }

      const resultOne = calculateBodyFatPercentage(
        'female', waist, neck, height, hipOne
      )
      const resultTwo = calculateBodyFatPercentage(
        'female', waist, neck, height, hipTwo
      )

      const result = resultOne < resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params one: ${JSON.stringify(paramsOne)} | params two: ${JSON.stringify(paramsTwo)}`
      )
    }
  })

  it("never returns NaN or Infinity", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const waist = getInvalidValue(Math.random() > 0.5, -500, 0);
      const neck = getInvalidValue(Math.random() > 0.5, -500, 0);
      const hip = getInvalidValue(Math.random() > 0.5, -500, 0);
      const height = getInvalidValue(Math.random() > 0.5, -500, 0);
      const params = Gender.male
        ? { gender, waist, neck, height }
        : { gender, waist, neck, hip, height }

      const result = calculateBodyFatPercentage(
        gender, waist, neck, height, hip
      )
      assert.ok(
        Number.isFinite(result),
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)}`
      )
    }
  })

  it("different genders produce different results for same measurements", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const prototype = getPrototype('female');

      const waist = prototype.waist_circumference_cm;
      const neck = prototype.neck_circumference_cm;
      const hip = prototype.hip_circumference_cm;
      const height = prototype.height_cm;
      const maleParams = { gender: 'male', waist, neck, height }
      const femaleParams = { gender: 'female', waist, neck, height, hip }

      const resultMale = calculateBodyFatPercentage(
        'male', waist, neck, height
      )
      const resultFemale = calculateBodyFatPercentage(
        'female', waist, neck, height, hip
      )

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
      const gender = getGender();
      const waist = 0;
      const neck = 0;
      const hip = getInvalidValue(Math.random() > 0.5, -500, 0);
      const height = getInvalidValue(Math.random() > 0.5, -500, 0);
      const params = Gender.male
        ? { gender, waist, neck, height }
        : { gender, waist, neck, hip, height };

      const result = calculateBodyFatPercentage(
        gender, waist, neck, height, hip
      )

      assert.ok(
        Number.isFinite(result),
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)}`
      )
    }
  })
})

describe("bodyFat-calculator American Diabetes Association properties", () => {
  it("body fat percentage decreases with height", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const age = prototype.age;
      const weight = prototype.weight_kg;
      const heightOne = gender === 'female' ? 165 : 175;
      const heightTwo = heightOne + 10;
      const params = { age, gender, weight }

      const resultOne = calculateBodyFatPercentageAda(
        age, gender, weight, heightOne
      )
      const resultTwo = calculateBodyFatPercentageAda(
        age, gender, weight, heightTwo
      )

      const result = resultOne > resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)} | height one: ${heightOne} | height two: ${heightTwo}`
      )
    }
  })

  it("body fat percentage increases with weight", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const age = prototype.age;
      const weightOne = prototype.weight_kg;
      const weightTwo = prototype.weight_kg + 20;
      const height = prototype.height_cm;
      const params = { age, gender, height }

      const resultOne = calculateBodyFatPercentageAda(
        age, gender, weightOne, height
      )
      const resultTwo = calculateBodyFatPercentageAda(
        age, gender, weightTwo, height
      )

      const result = resultOne < resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)} | weight one: ${weightOne} | weight two: ${weightTwo}`
      )
    }
  })

  it("body fat percentage increases with age", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const ageOne = prototype.age;
      const ageTwo = prototype.age + 10;
      const weight = prototype.weight_kg;
      const height = prototype.height_cm;
      const params = { gender, weight, height }

      const resultOne = calculateBodyFatPercentageAda(
        ageOne, gender, weight, height
      )
      const resultTwo = calculateBodyFatPercentageAda(
        ageTwo, gender, weight, height
      )

      const result = resultOne < resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)} | age one: ${ageOne} | age two: ${ageTwo}`
      )
    }
  })

  it("females have higher body fat than males at equal measurements", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const prototype = getPrototype('female');

      const age = prototype.age;
      const weight = prototype.weight_kg;
      const height = prototype.height_cm;
      const params = { age, weight, height }

      const resultOne = calculateBodyFatPercentageAda(
        age, prototype.gender, weight, height
      )
      const resultTwo = calculateBodyFatPercentageAda(
        age, 'male', weight, height
      )

      const result = resultOne > resultTwo
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)}`
      )
    }
  })

  it("returns a value within a realistic body fat range", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const age = prototype.age;
      const weight = prototype.weight_kg;
      const height = prototype.height_cm;
      const params = { age, gender, weight, height }

      const result = calculateBodyFatPercentageAda(age, gender, weight, height)
      assert.ok(
        result > 0 && result < 70,
        `Invalid result: ${result} | iteration ${i} | params: ${JSON.stringify(params)}`
      )
    }
  })
})

