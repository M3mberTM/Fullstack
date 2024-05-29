const Total = ({allExercises}) => {

    const total = allExercises.reduce((total, num) => total + num);

    return (
        <p><b>total of {total} exercises</b></p>
    )
}
const Part = ({name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({course}) => {
    return (
        <div className={"courseContent"}>
            {course.parts.map((part) => {
                return <Part key={part.id} name={part.name} exercises={part.exercises}/>
            })}
            <Total allExercises={course.parts.map((part) => {
                return part.exercises
            })}/>
        </div>
    )
}

const Header = ({name}) => {
    return (
        <div className={"courseHeader"}>
            <h1>{name}</h1>
        </div>
    )
}
const Course = ({course}) => {

    return (
        <div className={"course"}>
            <Header name={course.name}/>
            <Content course={course}/>
        </div>
    )
}
const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div id={"courses"}>
            {courses.map((course) => {
                return <Course key={course.id} course={course}/>
            })}

        </div>

    )
}

export default App