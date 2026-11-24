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

/* ================================================== 
          Types used in the BMI calculator
   ================================================== */
export type BmiCategory = 'underweight' |
  'healthy' |
  'overweight' |
  'class 1 obesity' |
  'class 2 obesity' |
  'class 3 obesity';

export type BMI = {
  bmi: number,
  category: BmiCategory
}
