import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getGender, getPrototype, getRandomInt, getValidValue, ROUNDS } from './utils.test.js';
import { calculateBmi } from '../bmi-calculator.js';
import { BMI_CATEGORIES } from '../constants.js';

describe("bmi properties", () => {
  it("BMI increases with weight", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender)
      const weightOne = getValidValue(150, 225);
      const weightTwo = getValidValue(50, 100);

      const { bmi: bmiOne } = calculateBmi(weightOne, prototype.height_cm);
      const { bmi: bmiTwo } = calculateBmi(weightTwo, prototype.height_cm);

      assert.ok(
        bmiOne > bmiTwo,
        `Invalid result: bmiOne: ${bmiOne} bmiTwo: ${bmiTwo} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | weight one: ${weightOne} | weight two: ${weightTwo}`
      );
    }
  })

  it("BMI decreases with height", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);
      const heightOne = getRandomInt(120, 150);
      const heightTwo = getRandomInt(160, 200);

      const { bmi: bmiOne } = calculateBmi(prototype.weight_kg, heightOne);
      const { bmi: bmiTwo } = calculateBmi(prototype.weight_kg, heightTwo);

      assert.ok(
        bmiOne > bmiTwo,
        `Invalid result: bmiOne: ${bmiOne} bmiTwo: ${bmiTwo} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | height one: ${heightOne} | height two: ${heightTwo}`
      );
    }
  })

  it("returns BMI without rounding", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const { bmi } = calculateBmi(prototype.weight_kg, prototype.height_cm);
      const expectedBmi =
        prototype.weight_kg / Math.pow(prototype.height_cm / 100, 2);

      assert.strictEqual(
        bmi,
        expectedBmi,
        `Invalid result: ${bmi} | iteration ${i} | prototype: ${JSON.stringify(prototype)}`
      );
    }
  });

  it("returns an object with bmi and category as properties", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const result = calculateBmi(prototype.weight_kg, prototype.height_cm);

      assert.deepStrictEqual(
        Object.keys(result).sort(),
        ['bmi', 'category'],
        `Invalid result: ${JSON.stringify(result)} | iteration ${i} | prototype: ${JSON.stringify(prototype)}`);
    }
  });

  it("category is a valid BMI category", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);

      const { category } = calculateBmi(prototype.weight_kg, prototype.height_cm);

      assert.ok(
        BMI_CATEGORIES.some(item => item.category === category),
        `Invalid result: ${JSON.stringify(category)} | iteration ${i} | prototype: ${JSON.stringify(prototype)}`);
    }
  });
})

// keep the category boundaries tests deterministic by using hardcoded values
describe("category classification - near boundaries", () => {
  const height = 163;

  it("classifies BMI below 18.5 as underweight", () => {
    const weight = 49.1;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'underweight',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'underweight'`
    );
  });

  it("classifies BMI just above 18.5 as healthy", () => {
    const weight = 49.2;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'healthy',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'healthy'`
    );
  });

  it("classifies BMI just below 25 as healthy", () => {
    const weight = 66.4;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'healthy',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'healthy'`
    );
  });

  it("classifies BMI just above 25 as overweight", () => {
    const weight = 66.5;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'overweight',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'overweight'`
    );
  });

  it("classifies BMI just below 30 as overweight", () => {
    const weight = 79.7;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'overweight',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'overweight'`
    );
  });

  it("classifies BMI just above 30 as class 1 obesity", () => {
    const weight = 79.8;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 1 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 1 obesity'`
    );
  });

  it("classifies BMI just below 35 as class 1 obesity", () => {
    const weight = 92.9;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 1 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 1 obesity'`
    );
  });

  it("classifies BMI just above 35 as class 2 obesity", () => {
    const weight = 93;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 2 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 2 obesity'`
    );
  });

  it("classifies BMI just below 40 as class 2 obesity", () => {
    const weight = 106.2;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 2 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 2 obesity'`
    );
  });

  it("classifies BMI just above 40 as class 3 obesity", () => {
    const weight = 106.3;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 3 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 3 obesity'`
    );
  });
})

describe("category classification - exact thresholds", () => {
  const height = 100;

  it("classifies BMI equal to 18.5 as healthy", () => {
    const weight = 18.5;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'healthy',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'healthy'`
    );
  });

  it("classifies BMI equal to 25 as overweight", () => {
    const weight = 25;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'overweight',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'overweight'`
    );
  });

  it("classifies BMI equal to 30 as class 1 obesity", () => {
    const weight = 30;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 1 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 1 obesity'`
    );
  });

  it("classifies BMI equal to 35 as class 2 obesity", () => {
    const weight = 35;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 2 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 2 obesity'`
    );
  });

  it("classifies BMI equal to 40 as class 3 obesity", () => {
    const weight = 40;
    const { bmi, category } = calculateBmi(weight, height);

    assert.strictEqual(
      category,
      'class 3 obesity',
      `Invalid result: bmi: ${bmi} | category: ${category} | expected category: 'class 3 obesity'`
    );
  });
})
