const Header = ({ title }) => (<h2>{title}</h2>)

const Part = ({ name, exercises }) => (<p>{name} {exercises}</p>)

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((acc, part) => acc + part.exercises, 0)

    return (
        <p>
            <strong>total of {total} exercises</strong>
        </p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course