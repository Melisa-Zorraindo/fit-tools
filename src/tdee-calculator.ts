type GoalType = 'moderateLose' |
  'mildLose' |
  'maintain' |
  'mildGain' |
  'moderateGain';
type ActivityLevelType = 'sedentary' | 'light' | 'moderate' | 'heavy';

const ACTIVITY_LEVEL_COEFFICIENTS: Record<ActivityLevelType, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  heavy: 1.725,
};

const GOAL_MULTIPLIERS: Record<GoalType, number> = {
  moderateLose: 0.85,
  mildLose: 0.9,
  maintain: 1,
  mildGain: 1.1,
  moderateGain: 1.15,
};

export const calculateTdee = (
  bmr: number, activityLevel: ActivityLevelType, goal: GoalType
): number => {
  const activityCoefficient = ACTIVITY_LEVEL_COEFFICIENTS[activityLevel];
  const goalMultiplier = GOAL_MULTIPLIERS[goal];
  return bmr * activityCoefficient * goalMultiplier;
};
