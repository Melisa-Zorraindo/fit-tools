/* ================================================== 
          Types used in the bmr calculator
   ================================================== */
export type BmrCoeficcientType = {
  baseline: number,
  weight: number,
  height: number,
  age: number
}
export type GenderType = 'male' | 'female'

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
