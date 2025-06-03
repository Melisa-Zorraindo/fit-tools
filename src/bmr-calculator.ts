type GenderType = 'male' | 'female'
type BmrCoeficcientType = {
  baseline: number,
  weight: number,
  height: number,
  age: number
}

const BMR_COEFFICIENTS: Record<GenderType, BmrCoeficcientType> = {
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

export const calculateBmr = (
  gender: GenderType, age: number, weight: number, height: number
): number => {
  const coeffs = BMR_COEFFICIENTS[gender]

  return Math.floor(
    coeffs.baseline +
    coeffs.weight * weight +
    coeffs.height * height -
    coeffs.age * age
  )
}
