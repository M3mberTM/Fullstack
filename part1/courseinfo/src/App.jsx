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
const Content = ({parts}) => {


    return (
        <div className={"content"}>
            <Part name={parts[0].name} execNum={parts[0].exercises}/>
            <Part name={parts[1].name} execNum={parts[1].exercises}/>
            <Part name={parts[2].name} execNum={parts[2].exercises}/>
        </div>

    )

}

const Total = ({exercises}) => {
    let total = 0;
    for (let i = 0; i < exercises.length; i++) {
        total += exercises[i].exercises;
    }

    return (
        <div className={"total"}>
            <p>Number of exercises {total}</p>
        </div>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total exercises={course.parts}/>
        </div>
    )
}

export default App