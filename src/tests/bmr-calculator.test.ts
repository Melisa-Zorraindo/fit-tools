import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getGender, getPrototype, getRandomFloat, getRandomInt, getValidValue, ROUNDS } from './utils.test.js';
import { calculateBmrHarrisBenedict, calculateBmrMifflinStJeor } from '../bmr-calculators.js'
import { Gender } from '../types.js';

describe("bmr-harrisBenedict properties", () => {
  it("BMR increases with weight", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender)
      const weightOne = getValidValue(150, 225);
      const weightTwo = getValidValue(50, 100);

      const result = calculateBmrHarrisBenedict(
        gender, prototype.age, weightOne, prototype.height_cm
      ) > calculateBmrHarrisBenedict(
        gender, prototype.age, weightTwo, prototype.height_cm
      )

      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | weight one: ${weightOne} | weight two: ${weightTwo}`
      );
    }
  })

  it("BMR increases with height", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);
      const heightOne = getRandomInt(160, 200);
      const heightTwo = getRandomInt(120, 150);

      const result = calculateBmrHarrisBenedict(
        gender, prototype.age, prototype.weight_kg, heightOne
      ) > calculateBmrHarrisBenedict(
        gender, prototype.age, prototype.weight_kg, heightTwo
      )
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | height one: ${heightOne} | height two: ${heightTwo}`
      );
    }
  })

  it("BMR decreases with age", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);
      const ageOne = getRandomInt(50, 85);
      const ageTwo = getRandomInt(20, 40);

      const result = calculateBmrHarrisBenedict(
        gender, ageOne, prototype.weight_kg, prototype.height_cm
      ) < calculateBmrHarrisBenedict(
        gender, ageTwo, prototype.weight_kg, prototype.height_cm
      )
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | age one: ${ageOne} | age two: ${ageTwo}`
      );
    }
  })

  it("throws error on incorrect gender", () => {
    // use a cast so TypeScript allows the invalid value we intend to test
    const gender = "foo" as unknown as Gender;
    const prototype = getPrototype(Gender.male)

    assert.throws(() => calculateBmrHarrisBenedict(
      gender, prototype.age, prototype.weight_kg, prototype.height_cm
    ));
  })
})

describe("bmr-MifflinStJeor properties", () => {
  it("BMR increases with weight", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);
      const weightOne = getValidValue(150, 225);
      const weightTwo = getValidValue(50, 100);

      const result = calculateBmrMifflinStJeor(
        gender, prototype.age, weightOne, prototype.height_cm
      ) > calculateBmrMifflinStJeor(
        gender, prototype.age, weightTwo, prototype.height_cm
      )

      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | weight one: ${weightOne} | weight two: ${weightTwo}`
      );
    }
  })

  it("BMR increases with height", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);
      const heightOne = getRandomInt(160, 200);
      const heightTwo = getRandomInt(120, 150);

      const result = calculateBmrMifflinStJeor(
        gender, prototype.age, prototype.weight_kg, heightOne
      ) > calculateBmrMifflinStJeor(
        gender, prototype.age, prototype.weight_kg, heightTwo
      )
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | height one: ${heightOne} | height two: ${heightTwo}`
      );
    }
  })

  it("BMR decreases with age", () => {
    for (let i = 0; i < ROUNDS; i++) {
      const gender = getGender();
      const prototype = getPrototype(gender);
      const ageOne = getRandomInt(50, 85);
      const ageTwo = getRandomInt(20, 40);

      const result = calculateBmrMifflinStJeor(
        gender, ageOne, prototype.weight_kg, prototype.height_cm
      ) < calculateBmrMifflinStJeor(
        gender, ageTwo, prototype.weight_kg, prototype.height_cm
      )
      assert.ok(
        result,
        `Invalid result: ${result} | iteration ${i} | prototype: ${JSON.stringify(prototype)} | age one: ${ageOne} | age two: ${ageTwo}`
      );
    }
  })

  it("assumes 'male' on incorrect gender", () => {
    // use a cast so TypeScript allows the invalid value we intend to test
    const gender = "foo" as unknown as Gender;
    const prototype = getPrototype(Gender.female)

    assert.ok(() => calculateBmrMifflinStJeor(
      gender, prototype.age, prototype.weight_kg, prototype.height_cm
    ));
  })
})
