import type { ActivityLevelType, BmrCoeficcientType, GenderType, GoalType } from "./types"

/* ================================================== 
          constants used in the bmr calculator
   ================================================== */
export const BMR_COEFFICIENTS: Record<GenderType, BmrCoeficcientType> = {
  male: {
    baseline: 88.36,
    weight: 13.4,
    height: 4.8,
    age: 5.7
  },
  female: {
    baseline: 447.6,
    weight: 9.2,
    height: 3.1,
    age: 4.3
  }
}

/* ================================================== 
          constants used in the macro calculator
   ================================================== */
export const CARBS_CALORIES = 4
export const FAT_CALORIES = 9
export const PROTEIN_CALORIES = 4

/* ================================================== 
          constants used in the tdee calculator
   ================================================== */
export const ACTIVITY_LEVEL_COEFFICIENTS: Record<ActivityLevelType, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  heavy: 1.725,
};
export const GOAL_MULTIPLIERS: Record<GoalType, number> = {
  moderateLose: 0.85,
  mildLose: 0.9,
  maintain: 1,
  mildGain: 1.1,
  moderateGain: 1.15,
};

/* ================================================== 
        constants used in the lifting calculator
   ================================================== */
export const COEFFICIENTS: number[][] = [
  // RPE 6.5
  [0.878, 0.850, 0.824, 0.799, 0.774, 0.751, 0.723, 0.694, 0.667, 0.640, 0.613, 0.586, 0.561, 0.537, 0.514],
  // RPE 7.0
  [0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653, 0.626, 0.599, 0.574, 0.549, 0.525],
  // RPE 7.5
  [0.907, 0.878, 0.850, 0.824, 0.798, 0.774, 0.751, 0.723, 0.693, 0.667, 0.640, 0.613, 0.588, 0.563, 0.539],
  // RPE 8.0
  [0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653, 0.626, 0.601, 0.576, 0.552],
  // RPE 8.5
  [0.939, 0.907, 0.878, 0.850, 0.824, 0.798, 0.774, 0.751, 0.723, 0.693, 0.667, 0.640, 0.615, 0.590, 0.566],
  // RPE 9.0
  [0.955, 0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.653, 0.628, 0.603, 0.579],
  // RPE 9.5
  [0.978, 0.938, 0.907, 0.878, 0.850, 0.824, 0.798, 0.774, 0.751, 0.723, 0.693, 0.667, 0.642, 0.617, 0.593],
  // RPE 10.0
  [1.000, 0.955, 0.922, 0.892, 0.863, 0.837, 0.811, 0.786, 0.762, 0.739, 0.707, 0.680, 0.654, 0.629, 0.605]
]
export const MINIMUM_RPE: number = 6.5
