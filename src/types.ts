/* ================================================== 
        Types used in the bmr Harris-Benedict
   ================================================== */
export type BmrCoefficientHB = {
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
export type ActivityLevel = 'sedentary' |
  'light' |
  'moderate' |
  'heavy' |
  'veryHeavy';

export type Goal = 'moderateLose' |
  'mildLose' |
  'maintain' |
  'mildGain' |
  'moderateGain';
