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

const Statistics = ({totalGood, totalNeutral, totalBad}) => {

    return (
        <div id={"statistics"}>
            <h1>Statistics</h1>
            <p>good {totalGood}</p>
            <p>neutral {totalNeutral}</p>
            <p>bad {totalBad}</p>
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