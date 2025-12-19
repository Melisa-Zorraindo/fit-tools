# Fitness tools

A lightweight TypeScript library for common strength training and nutrition calculations.
It provides formulas for energy expenditure, macronutrients, and one-rep max estimations, designed for use in Node.js and modern frontend frameworks.

## Features

**Energy & nutrition**
- BMR (Basal Metabolic Rate) using the Harris–Benedict equation
- TDEE (Total Daily Energy Expenditure) with activity level and goal adjustments
- Daily macronutrient distribution calculator

**Strength training**
- One-rep max (1RM) estimation formulas:
  - Brzycki
  - Epley
  - Lombardi
  - O’Conner
  - Tuchscherer (RPE-based)
- Weight-to-lift calculator based on target reps, RPE, and 1RM

## Installation

```bash
npm install fit-tools
```

## Usage

This package works in Node.js (Node 20+) and in modern frontend frameworks such as React, Vue, and Svelte.

### Importing

**Using EMS**
```typescript
import { calculateBmr, calculateTdee, calculateMacros } from 'fit-tools';
```
**Using CommonJS**
```javascript
const { calculateBmr, calculateTdee, calculateMacros } = require('fit-tools');
```

### Calculations

#### Basal Metabolic Rate (BMR)

Calculates daily calories burned at rest using the Harris-Benedict equation.

*Parameters*

- gender: 'male' | 'female'
- age: integer
- weight: integer | float - in kilograms
- height: integer - in centimeters

*Returns*
- bmr: integer - in calories. Rounded down

*Example*
```typescript
const bmr = calculateBmr('female', 30, 65, 170);
```

#### Total Daily Energy Expenditure (TDEE)

Calculates daily calorie needs based on BMR, activity level, and goal.

*Parameters*

- bmr: integer - in calories
- activityLevel: 'sedentary' | 'light' | 'moderate' | 'heavy'
- goal: 'moderateLose' | 'mildLose' | 'maintain' | 'mildGain' | 'moderateGain'

*Returns*

- tdee: integer - in calories

*Example*
```typescript
const tdee = calculateTdee(bmr, 'moderate', 'maintain');
```

#### Macronutrients

Calculates daily grams of carbohydrates, fat, and protein from a given TDEE.

*Parameters*

- tdee: integer - in calories
- carbs?: integer - percentage of calories from carbs (0-100)
- fat?: integer - percentage of calories from fat (0-100)
- protein?: integer - percentage of calories from protein (0-100). Must be provided if weight is not provided
- weight?: integer | float - in kilograms. Must be provided if protein is not provided

> Macronutrient percentages must total 100 when all are provided. If protein is omitted, its percentage is calculated as 100 - carbs - fat.

*Returns*

- macros: { carbs: integer, fat: integer, protein: integer} - grams of each macro per day

*Examples*

Using protein percentage:
```typescript
const macros = calculateMacros(2000, 40, 30, 30);
```
Using body weight:
```typescript
const macros = calculateMacros(2000, 40, 30, undefined, 65);
```

#### One-Rep Max (1RM) estimation

All 1RM functions return a number rounded to one decimal place.

##### Brzycki formula

*Parameters*

- liftedReps: integer - repetitions performed
- liftedWeight: integer | float - lifted weight in kilograms

*Example*
```typescript
const orm = calculateOneRepMaxBrzycki(5, 100);
```

##### Epley formula

*Parameters*

- liftedReps: integer - repetitions performed
- liftedWeight: integer | float - lifted weight in kilograms

*Example*
```typescript
const orm = calculateOneRepMaxEpley(5, 100);
```

##### Lombardi formula

*Parameters*

- liftedReps: integer - repetitions performed
- liftedWeight: integer | float - lifted weight in kilograms

*Example*
```typescript
const orm = calculateOneRepMaxLombardi(5, 100);
```

##### O'Conner formula

*Parameters*

- liftedReps: integer - repetitions performed
- liftedWeight: integer | float - lifted weight in kilograms

*Example*
```typescript
const orm = calculateOneRepMaxOConner(5, 100);
```

##### Tuchscherer formula

Estimates one-rep max using reps, RPE (rate of perceived exertion), and lifted weight.

*Parameters*

- liftedReps: integer - repetitions performed
- liftedRpe: integer | float - rate of perceived exertion. Valid range: 6.5 to 10, in increments of 0.5
- liftedWeight: integer | float - lifted weight in kilograms

*Example*
```typescript
const orm = calculateOneRepMaxTuchscherer(5, 8.5, 100);
```

#### Estimated weight to lift

Calculates the recommended training weight, given a known one-rep max.

> Although it uses similar inputs to the Tuchscherer formula, this function does not estimate 1RM — it derives a working weight from an existing 1RM.

*Parameters*

- desiredReps: integer - repetitions to perform
- desiredRpe: integer | float - desired rate of perceived exertion. Valid range: 6.5 to 10, in increments of 0.5
- oneRepMax: integer | float - in kilograms

*Example*
```typescript
const weight = calculateWeightToLift(5, 8, 100);
```

## Important Note

This library does not perform input validation in order to remain lightweight and focused on calculations. Make sure all inputs are validated in your application to avoid unreliable results.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add some new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

Please ensure your PR:
- Follows the existing code style
- Includes appropriate tests if adding new features
- Updates documentation as needed

## License

This project is licensed under the Unlicense License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:
- Check existing [issues](https://github.com/Melisa-Zorraindo/fitness-calculators-package/issues)
- Open a new issue if needed

## Authors

- Melisa Zorraindo - [Website](https://melisazor.com)
