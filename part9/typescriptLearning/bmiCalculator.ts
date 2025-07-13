import {extractArguments} from "./utils/utils";

export const calculateBmi = (height: number, mass: number): string => {
    const meterHeight = height / 100
    const bmi: number = mass / (meterHeight * meterHeight);
    // bmi classes logic
    if (Number.isNaN(bmi)) {
        throw new Error('Something is wrong')
    }
    if (bmi < 16) {
        return 'Underweight (Severe thinness)';
    }
    if (bmi < 17) {
        return 'Underweight (Moderate thinness)';
    }
    if (bmi < 18.5) {
        return 'Underweight (Mild thinness)';
    }
    if (bmi < 25) {
        return 'Normal range';
    }
    if (bmi < 30) {
        return 'Overweight (Pre-obese)';
    }
    if (bmi < 35) {
        return 'Overweight (Pre-obese)';
    }
    if (bmi < 40) {
        return 'Overweight (Pre-obese)';
    }
    return 'Overweight (Pre-obese)';

}
if (require.main === module) {
    const inputs = extractArguments(process.argv);
    if (typeof inputs[0] === 'number' && typeof inputs[1] === 'number') {
        console.log(calculateBmi(inputs[0], inputs[1]));
    }
}