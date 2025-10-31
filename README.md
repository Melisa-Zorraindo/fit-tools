# Fitness Calculators

A lightweight TypeScript library providing essential calculations for weightlifting and diet planning. Includes BMR (Basal Metabolic Rate), TDEE (Total Daily Energy Expenditure), macronutrient ratios, and various one-rep max estimation formulas.

## Features

- BMR calculation using Harris-Benedict equation
- TDEE calculation with activity level and goal adjustments
- Macronutrient distribution calculator
- One Rep Max calculators:
  - Brzycki formula
  - Epley formula
  - Lombardi formula
  - O'Conner formula
  - Tuchscherer formula (RPE-based)
- Weight to lift calculator based on RPE, reps and 1RM

## Installation

```bash
npm install fitness-calculators
```

## Usage

This package can be used in Node.js applications and modern browsers through frameworks like React, Vue, Svelte, etc.

### ESM Import
```typescript
import { calculateBmr, calculateTdee, calculateMacros } from 'fitness-calculators';
```

### CommonJS Require
```javascript
const { calculateBmr, calculateTdee, calculateMacros } = require('fitness-calculators');
```

### Examples

Calculate BMR:
```typescript
const bmr = calculateBmr('female', 30, 65, 170);
```

Calculate TDEE:
```typescript
const tdee = calculateTdee(bmr, 'moderate', 'maintain');
```

Calculate macronutrients:
```typescript
const macros = calculateMacros(2000, 40, 30, 30);
// or using body weight for protein calculation
const macros = calculateMacros(2000, 40, 30, undefined, 65);
```

Calculate one rep max:
```typescript
const orm = calculateOneRepMaxBrzycki(5, 100);
```

Calculate weight to lift:
```typescript
const weight = calculateWeightToLift(5, 8, 100);
```

## Important Note

This library does not include input validation. Users are responsible for validating inputs according to these guidelines:

- All numerical inputs should be positive numbers
- Weight values should be in kilograms
- Height should be in centimeters
- Age should be in years
- RPE values should be between 6.5 and 10
- Macronutrient percentages should sum to 100 if all three are provided
- Activity levels must be: 'sedentary', 'light', 'moderate', or 'heavy'
- Goals must be: 'moderateLose', 'mildLose', 'maintain', 'mildGain', or 'moderateGain'
- Gender must be: 'male' or 'female'

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

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please:
- Check existing [issues](https://github.com/Melisa-Zorraindo/fitness-calculators-package/issues)
- Open a new issue if needed

## Authors

- Melisa Zorraindo - [Website](https://melisazor.com)
