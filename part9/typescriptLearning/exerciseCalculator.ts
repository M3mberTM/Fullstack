import {extractArguments} from "./utils/utils";

interface exerciseEvaluation {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
const calculateExercises = (dailyExercises: number[], targetAmount: number): exerciseEvaluation => {

    const periodLength: number = dailyExercises.length;
    const trainingDays: number = dailyExercises.filter((exercise) => exercise > 0).length;
    const average: number = dailyExercises.reduce((total, num) => total + num) / periodLength;
    const success: boolean = average >= targetAmount;
    let rating: number;
    let ratingDescription: string;

    if (average > targetAmount + 2) {
        rating = 3
        ratingDescription = 'Exceptional! You have surpassed the limit'
    } else if (average < targetAmount ) {
        rating = 1
        ratingDescription = 'Not too bad but could be better'
    } else {
        rating = 2
        ratingDescription = 'Hours are well kept'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetAmount,
        average
    };
};

const inputs = extractArguments(process.argv);
console.log(calculateExercises(inputs.slice(0, inputs.length-1), inputs[inputs.length-1]));