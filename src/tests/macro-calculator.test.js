import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getRandomFloat, getRandomInt } from './utils.test';
import { calculateMacros } from '../macro-calculators'

describe("macro-calculator", () => {
  it("macronutrients' sum is less or equal than tdee", () => {
    const tdee = getRandomInt(1200, 2500);
    const { carbs, fat, protein } = calculateMacros(tdee);

    assert.ok((carbs * 4 + fat * 9 + protein * 4) <= tdee);
  });

  it("if protein percentage is provided, weight is ignored", () => {
    const tdee = getRandomInt(1800, 2400);
    const proteinPercentage = getRandomInt(0, 100);
    const weight1 = getRandomInt(50, 100);
    const weight2 = getRandomInt(125, 200);

    const result1 = calculateMacros(
      tdee, undefined, undefined, proteinPercentage, weight1
    );
    const result2 = calculateMacros(
      tdee, undefined, undefined, proteinPercentage, weight2
    );

    assert.deepStrictEqual(result1, result2);
  });
  
  it("if protein is not provided, weight must determine grams of protein", () => {
    const tdee = getRandomInt(1800, 2400);
    const weight1 = getRandomInt(50, 200);
    let weight2 = getRandomInt(50, 200);
    while(weight2 === weight1) {
      weight2 = getRandomInt(50, 200);
    }

    const result1 = calculateMacros(
      tdee, undefined, undefined, undefined, weight1
    );
    const result2 = calculateMacros(
      tdee, undefined, undefined, undefined, weight2
    );

    assert.strictEqual(result1.protein, weight1 * 2);
    assert.ok(result1.protein > 0);
    assert.ok(result1.protein !== result2.protein);
  });

  it("increase in protein percentage input decreases grams of carbs and fat", () => {
    const tdee = getRandomInt(1225, 2430);
    const proteinPercentage1 = getRandomInt(0, 50);
    const proteinPercentage2 = getRandomInt(51, 100);

    const result1 = calculateMacros(
      tdee, undefined, undefined, proteinPercentage1, undefined
    );
    const result2 = calculateMacros(
      tdee, undefined, undefined, proteinPercentage2, undefined
    );

    assert.ok(result1.carbs > result2.carbs && result1.fat > result2.fat);
  });

  it("higher carbs percentage input gives higher grams of carbs", () => {
    const tdee = getRandomInt(1500, 2550);
    const weight = Math.random() > 0.5
      ? getRandomInt(50, 200)
      : getRandomFloat(50, 200)
    const carbsPercentage1 = getRandomInt(0, 50);
    const carbsPercentage2 = getRandomInt(51, 100);

    const result1 = calculateMacros(
      tdee, carbsPercentage1, undefined, undefined, weight
    );
    const result2 = calculateMacros(
      tdee, carbsPercentage2, undefined, undefined, weight
    );

    assert.ok(result1.carbs < result2.carbs);
  });

  it("higher fat percentage input gives higher grams of fat", () => {
    const tdee = getRandomInt(1100, 2700);
    const weight = Math.random() > 0.5
      ? getRandomInt(60, 220)
      : getRandomFloat(60, 220)
    const fatPercentage1 = getRandomInt(0, 50);
    const fatPercentage2 = getRandomInt(51, 100);

    const result1 = calculateMacros(
      tdee, undefined, fatPercentage1, undefined, weight
    );
    const result2 = calculateMacros(
      tdee, undefined, fatPercentage2, undefined, weight
    );

    assert.ok(result1.fat < result2.fat);
  });

  it("higher protein percentage input gives higher grams of protein", () => {
    const tdee = getRandomInt(1800, 2200);
    const proteinPercentage1 = getRandomInt(0, 50);
    const proteinPercentage2 = getRandomInt(51, 100)

    const result1 = calculateMacros(
      tdee, undefined, undefined, proteinPercentage1, undefined
    );
    const result2 = calculateMacros(
      tdee, undefined, undefined, proteinPercentage2, undefined
    );

    assert.ok(result1.protein < result2.protein);
  });

  it("never returns NaN", () => {
    const { carbs, fat, protein } = calculateMacros(2000);
    assert.ok(
      !Number.isNaN(carbs) &&
      !Number.isNaN(fat) &&
      !Number.isNaN(protein)
    );
  });
})
