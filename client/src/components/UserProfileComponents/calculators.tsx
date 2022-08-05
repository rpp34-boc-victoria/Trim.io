
export function BMIcal(mass: number, height: number) {
  let heightInMeter = height / 100
  let result = mass / (heightInMeter * heightInMeter);
  return Math.round(result);
}

export function BFPcal(gender: string, mass: number, height: number, age: number) {
  let BMI = BMIcal(mass, height);
  let constant = 16.2;
  if (gender === 'F') { constant = 5.4 };
  //constant below is an average between male and female constant
  if (gender === 'N') { constant = 10.8 };

  let result = (1.2 * BMI) + (0.23 * age) - constant;
  return Math.round(result);
}

export function BMRcal(gender: string, mass: number, height: number, age: number) {
  let result = 0;
  let constant1 = 88.362;
  let constant2 = 13.397;
  let constant3 = 4.799;
  let constant4 = 5.677;
  if (gender === 'F') {
    constant1 = 444.593;
    constant2 = 9.247;
    constant3 = 3.098;
    constant4 = 4.33;
  }
  //contants below is an average between male and female constant
  if (gender === 'N') {
    constant1 = 266.4775;
    constant2 = 11.322;
    constant3 = 3.9485;
    constant4 = 5.9935;
  }

  result = constant1 + (constant2 * mass) + (constant3 * height) + (constant4 * age);
  return Math.round(result);
}

export function RecommandedCaloIntakecal(gender: string, mass: number, height: number, age: number) {
  let result = 0;
  let constant1 = 66.47;
  let constant2 = 13.75;
  let constant3 = 5.003;
  let constant4 = 6.755;
  if (gender === 'F') {
    constant1 = 655.1;
    constant2 = 9.563;
    constant3 = 1.85;
    constant4 = 4.676;
  }
  //contants below is an average between male and female constant
  if (gender === 'N') {
    constant1 = 360.785;
    constant2 = 11.6565;
    constant3 = 3.4265;
    constant4 = 5.7155;
  }

  result = constant1 + (constant2 * mass) + (constant3 * height) + (constant4 * age);
  return Math.round(result);
}

export function RecommandedWaterIntakecal(mass: number) {
  let weightInLb = mass * 2.20462;
  let waterInOZ = weightInLb / 2;
  let waterInCup = waterInOZ / 8;
  return Math.round(waterInCup);
}

/* Below are the formulas
BMI:
Mass in (kg’s) / (height in m)^2 = BMI
A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9. 

BFP:
Body fat percentage (BFP) formula for adult males:
BFP = 1.20 × BMI + 0.23 × Age - 16.2
Body fat percentage (BFP) formula for adult females:
BFP = 1.20 × BMI + 0.23 × Age - 5.4

BMR:
How To calculate BMR + Recommended Calorie Intake:
Men: 
BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) – (5.677 x age in years) 
Women: 
BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) – (4.330 x age in years)

Recommended Calorie Intake
Men:
 = 66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
Women: 
 = 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years)

Recommended Water intake amount:
roughly half of their weight (in pounds) in ounces
*/