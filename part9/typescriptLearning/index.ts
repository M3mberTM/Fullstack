import {calculateBmi} from "./bmiCalculator";
import express from 'express';
const app = express();

const PORT = 4000;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const queryParams = req.query
    const weight = queryParams.weight
    const height = queryParams.height
    if (typeof weight === 'string' && typeof height === 'string') {
        const weightNum = parseFloat(weight)
        const heightNum = parseFloat(height)
        if (weightNum && heightNum) {
            res.json({height: heightNum, weight: weightNum, bmi: calculateBmi(heightNum, weightNum)})
            return
        }
    }

    res.json({error: 'malformed parameters'})

})

app.listen(PORT, () => {
   console.log('Server running on port: ', PORT)
})