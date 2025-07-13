import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
import express from 'express';
const app = express();
app.use(express.json());

const PORT = 4000;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const queryParams = req.query;
    const weight = queryParams.weight;
    const height = queryParams.height;
    if (typeof weight === 'string' && typeof height === 'string') {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);
        if (weightNum && heightNum) {
            res.json({height: heightNum, weight: weightNum, bmi: calculateBmi(heightNum, weightNum)});
            return;
        }
    }

    res.json({error: 'malformed parameters'});

});

app.post('/exercises', (req, res) => {
    if (!req.body) {
        res.json({error: 'parameters missing'});
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    if (!daily_exercises || !target) {
        res.json({error: 'parameters missing'});
        return;
    }
    if (Array.isArray(daily_exercises) && typeof target === 'number') {
        for (const val of daily_exercises) {
            if (typeof val !== 'number') {
                res.json({error: 'malformed parameters'});
                return;
            }
        }
        if (daily_exercises.length > 0) {
            const exercises = daily_exercises as number[];
            res.json(calculateExercises(exercises, target));
            return;
        }
    }

    res.json({error: 'malformed parameters'});

});

app.listen(PORT, () => {
   console.log('Server running on port: ', PORT);
});