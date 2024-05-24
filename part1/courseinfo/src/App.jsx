const Header = (props) => {
    return (
        <div className="header">
            <h1>{props.course}</h1>
        </div>
    )

}


const Part = ({name, execNum}) => {
    return (
        <div>
            <p>{name} {execNum}</p>
        </div>
    )

}
const Content = (props) => {


    return (
        <div className={"content"}>
            <Part name={props.parts[0]} execNum={props.exercises[0]}/>
            <Part name={props.parts[1]} execNum={props.exercises[1]}/>
            <Part name={props.parts[2]} execNum={props.exercises[2]}/>
        </div>

    )

}

const Total = (props) => {
    let total = 0;
    for (let i = 0; i < props.exercises.length; i++) {
        total += props.exercises[i];
    }

    return (
        <div className={"total"}>
            <p>Number of exercises {total}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
            <Total exercises={[exercises1, exercises2, exercises3]}/>
        </div>
    )
}

export default App