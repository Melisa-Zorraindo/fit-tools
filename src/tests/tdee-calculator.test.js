import assert from 'node:assert';
import { describe, it } from 'node:test';
import { getRandomInt } from './utils.test';
import { calculateTdee } from '../tdee-calculator'

describe("tdee-calculator properties", () => {
  const activityLevels = ['sedentary', 'light', 'moderate', 'heavy']
  const goals = [
    'moderateLose', 'mildLose', 'maintain', 'mildGain', 'moderateGain'
  ];

  it("returns a valid number", () => {
    const bmr = getRandomInt(530, 1300);
    const activityLevel = activityLevels[getRandomInt(0, activityLevels.length - 1)];
    const goal = goals[getRandomInt(0, goals.length - 1)];
    const result = calculateTdee(bmr, activityLevel, goal);
    assert.ok(!isNaN(result) && Number.isFinite(result));
  });

  it("as bmr increases, tdee increases", () => {
    const bmr1 = getRandomInt(400, 800);
    const bmr2 = getRandomInt(801, 1000);
    const bmr3 = getRandomInt(1001, 1200);
    const activityLevel = activityLevels[getRandomInt(0, activityLevels.length -1)];
    const goal = goals[getRandomInt(0, goals.length - 1)];

    const result1 = calculateTdee(bmr1, activityLevel, goal);
    const result2 = calculateTdee(bmr2, activityLevel, goal);
    const result3 = calculateTdee(bmr3, activityLevel, goal);

    assert.ok(result1 < result2  && result2 < result3);
  });

  it("as the activity level increases, tdee increases", () => {
    const bmr = getRandomInt(550, 1200);
    const activityLevel1 = activityLevels[0];
    const activityLevel2 = activityLevels[1];
    const activityLevel3 = activityLevels[2];
    const activityLevel4 = activityLevels[3];
    const goal = goals[getRandomInt(0, goals.length - 1)];

    const result1 = calculateTdee(bmr, activityLevel1, goal);
    const result2 = calculateTdee(bmr, activityLevel2, goal);
    const result3 = calculateTdee(bmr, activityLevel3, goal);
    const result4 = calculateTdee(bmr, activityLevel4, goal);

    assert.ok(result1 < result2 && result2 < result3 && result3 < result4);
  });

  it("TDEE decreases for fat-loss goals and increases for muscle-gain goals under the same BMR and activity level", () => {
    const bmr = getRandomInt(500, 1250);
    const activityLevel = activityLevels[getRandomInt(0, activityLevels.length -1)];
    const goal1 = goals[0]
    const goal2 = goals[1]
    const goal3 = goals[2]
    const goal4 = goals[3]
    const goal5 = goals[4]

    const result1 = calculateTdee(bmr, activityLevel, goal1);
    const result2 = calculateTdee(bmr, activityLevel, goal2);
    const result3 = calculateTdee(bmr, activityLevel, goal3);
    const result4 = calculateTdee(bmr, activityLevel, goal4);
    const result5 = calculateTdee(bmr, activityLevel, goal5);

    assert.ok(
      result1 < result2 &&
      result2 < result3 &&
      result3 < result4 &&
      result4 < result5
    );
  })

  it("throws error on incorrect activity level", () => {
    const bmr = 750;
    const activityLevel = "foo";
    const goal = 'maintain';

    assert.throws(() => calculateTdee(bmr, activityLevel, goal));
  });

  it("throws error on incorrect goal", () => {
    const bmr = getRandomInt(600, 1000);
    const activityLevel = 'moderate';
    const goal = "foo";

    assert.throws(() => calculateTdee(bmr, activityLevel, goal));
  });
})
