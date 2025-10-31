import { ACTIVITY_LEVEL_COEFFICIENTS, GOAL_MULTIPLIERS } from "./constants";
import type { ActivityLevelType, GoalType } from "./types";

/**
 * Calculates Total Daily Energy Expenditure (TDEE) based on BMR, activity level and goal
 * @param {number} bmr - Basal Metabolic Rate in calories (integer)
 * @param {ActivityLevelType} activityLevel - Activity level ('sedentary', 'light', 'moderate', 'heavy')
 * @param {GoalType} goal - Weight management goal ('moderateLose', 'mildLose', 'maintain', 'mildGain', 'moderateGain')
 * @returns {number} The calculated TDEE in calories
 */
export const calculateTdee = (
  bmr: number, activityLevel: ActivityLevelType, goal: GoalType
): number => {
  const activityCoefficient = ACTIVITY_LEVEL_COEFFICIENTS[activityLevel];
  const goalMultiplier = GOAL_MULTIPLIERS[goal];
  return bmr * activityCoefficient * goalMultiplier;
};
