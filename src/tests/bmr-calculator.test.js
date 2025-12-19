import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getRandomFloat, getRandomInt } from './utils.test';
import { calculateBmr } from '../bmr-calculator'

describe("bmr-calculator properties", () => {
  it("BMR increases with weight", () => {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const age = getRandomInt(20, 85);
    const weight1 = Math.random() > 0.5
      ? getRandomInt(150, 225)
      : getRandomFloat(150, 225);
    const weight2 = Math.random() > 0.5
      ? getRandomInt(50, 100)
      : getRandomFloat(50, 100);
    const height = getRandomInt(120, 200);

    assert.ok(
      calculateBmr(gender, age, weight1, height) > 
      calculateBmr(gender, age, weight2, height)
    );
  })

  it("BMR increases with height", () => {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const age = getRandomInt(20, 85);
    const weight = Math.random() > 0.5
      ? getRandomInt(50, 225)
      : getRandomFloat(50, 225);
    const height1 = getRandomInt(160, 200);
    const height2 = getRandomInt(120, 150);

    assert.ok(
      calculateBmr(gender, age, weight, height1) >
      calculateBmr(gender, age, weight, height2)
    );
  })

  it("BMR decreases with age", () => {
    const gender = Math.random() > 0.5 ? "male" : "female";
    const age1 = getRandomInt(50, 85);
    const age2 = getRandomInt(20, 40);
    const weight = Math.random() > 0.5
      ? getRandomInt(50, 225)
      : getRandomFloat(50, 225);
    const height = getRandomInt(120, 200);

    assert.ok(
      calculateBmr(gender, age1, weight, height) <
      calculateBmr(gender, age2, weight, height)
    );
  })

  it("throws error on incorrect gender", () => {
    const gender = "foo"
    const age = getRandomInt(25, 90)
    const weight = Math.random() > 0.5
      ? getRandomInt(55, 230)
      : getRandomFloat(50, 225);
    const height = getRandomInt(120, 200);

    assert.throws(() => calculateBmr(gender, age, weight, height));
  })
})
