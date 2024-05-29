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

export default Course