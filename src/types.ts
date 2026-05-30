/* ================================================== 
          Types used in the bmr calculator
   ================================================== */
export type BmrCoeficcientType = {
  baseline: number,
  weight: number,
  height: number,
  age: number
}

export type Gender = 'male' | 'female'

export const Gender = {
  male: 'male',
  female: 'female',
} as const satisfies Record<string, Gender>

/* ================================================== 
          Types used in the macro calculator
   ================================================== */
export type Macros = {
  carbs: number,
  fat: number,
  protein: number
}

/* ================================================== 
          Types used in the tdee calculator
   ================================================== */
export type ActivityLevelType = 'sedentary' | 'light' | 'moderate' | 'heavy';
export type GoalType = 'moderateLose' |
  'mildLose' |
  'maintain' |
  'mildGain' |
  'moderateGain';
