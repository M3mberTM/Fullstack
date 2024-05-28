import {useState} from 'react'


const Button = ({text, setValue, value}) => {
    const handleClick = () => {
        setValue(value + 1)
    }

    return (
        <button onClick={handleClick}>{text}</button>
    )
}
const Feedback = ({setTotalGood, setTotalNeutral, setTotalBad, totalGood, totalNeutral, totalBad}) => {

    return (
        <div id={"feedback"}>
            <h1>Give feedback</h1>
            <Button text={"Good"} setValue={setTotalGood} value={totalGood}></Button>
            <Button text={"Neutral"} setValue={setTotalNeutral} value={totalNeutral}></Button>
            <Button text={"Bad"} setValue={setTotalBad} value={totalBad}></Button>
        </div>
    )
}
const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>

    )
}
const Statistics = ({totalGood, totalNeutral, totalBad}) => {

    const allVals = totalGood + totalNeutral + totalBad

    if (allVals > 0) {
    return (
        <div id={"statistics"}>
            <h1>Statistics</h1>
            <table>
                <tbody>
            <StatisticLine text={"good"} value={totalGood}/>
            <StatisticLine text={"neutral"} value={totalNeutral}/>
            <StatisticLine text={"bad"} value={totalBad}/>
            <StatisticLine text={"all"} value={allVals}/>
            <StatisticLine text={"average"} value={(totalGood + totalBad*-1)/(allVals)}/>
            <StatisticLine text={"positive"} value={(allVals-totalBad-totalNeutral)/allVals*100}/>
                </tbody>
            </table>
        </div>
    )
    }
    return (
        <div id={"statistics"}>
            <h1>Statistics</h1>
            <p>No feedback given</p>
        </div>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Feedback setTotalGood={setGood} setTotalNeutral={setNeutral} setTotalBad={setBad} totalGood={good} totalNeutral={neutral} totalBad={bad}/>
            <Statistics totalGood={good} totalNeutral={neutral} totalBad={bad}/>
        </div>
    )
}

export default App