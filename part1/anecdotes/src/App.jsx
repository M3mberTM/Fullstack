import {useState} from 'react'


const RandButton = ({text, setNew, anecdotes}) => {
    const handleClick = () => {
        const newIndex = Math.floor(Math.random() * anecdotes.length)

        setNew(newIndex)
    }
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const VoteButton = ({text, setNewVotes, ogVotes, current}) => {
    const handleClick = () => {
        let copy = [...ogVotes]
        copy[current] += 1

        setNewVotes(copy)
    }

    return (
        <button onClick={handleClick}>{text}</button>
    )
}
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
    const [selected, setSelected] = useState(0)

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {anecdotes[selected]}
            <br/>
            <VoteButton text={"vote"} setNewVotes={setVotes} ogVotes={votes} current={selected}></VoteButton>
            <RandButton text={"next anecdote"} setNew={setSelected} anecdotes={anecdotes}></RandButton>
            <h1>Anecdote with the most votes</h1>
            <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        </div>
    )
}

export default App