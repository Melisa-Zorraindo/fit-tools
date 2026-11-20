import { ACTIVITY_LEVEL_COEFFICIENTS, GOAL_MULTIPLIERS } from "./constants.js";
import type { ActivityLevel, Goal } from "./types.js";

/**
 * Calculates Total Daily Energy Expenditure (TDEE) based on BMR, activity level and goal
 * @param {number} bmr - Basal Metabolic Rate in calories (integer)
 * @param {ActivityLevelType} activityLevel - Activity level ('sedentary', 'light', 'moderate', 'heavy')
 * @param {GoalType} goal - Weight management goal ('moderateLose', 'mildLose', 'maintain', 'mildGain', 'moderateGain')
 * @returns {number} The calculated TDEE in calories
 */
export const calculateTdee = (
  bmr: number, activityLevel: ActivityLevel, goal: Goal
): number => {
  if (
    activityLevel !== "sedentary" &&
    activityLevel !== "light" &&
    activityLevel !== "moderate" &&
    activityLevel !== "heavy" &&
    activityLevel !== "veryHeavy"
  ) {
    throw new Error(
      "Activity level must be one of: 'sedentary', 'light', 'moderate', 'heavy', 'veryHeavy'"
    );
  };

  if (
    goal !== "moderateLose" &&
    goal !== "mildLose" &&
    goal !== "maintain" &&
    goal !== "mildGain" &&
    goal !== "moderateGain"
  ) {
    throw new Error(
      "Goal must be one of: 'moderateLose', 'mildLose', 'maintain', 'mildGain', 'moderateGain'"
    );
  };

  const activityCoefficient = ACTIVITY_LEVEL_COEFFICIENTS[activityLevel];
  const goalMultiplier = GOAL_MULTIPLIERS[goal];
  return Math.floor(bmr * activityCoefficient * goalMultiplier);
};
