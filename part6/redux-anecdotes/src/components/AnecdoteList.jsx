import {useDispatch, useSelector} from "react-redux";
import {voteNote} from "../reducers/anecdoteReducer.js";
import {makeNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {

    const filteredAnecdotes = useSelector(({anecdotes, filter}) => {
        return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        const anecdote = filteredAnecdotes.find(n => n.id === id)
        dispatch(voteNote(anecdote))
        dispatch(makeNotification(`You voted: ${anecdote.content}`, 5))
    }

    return (
        <div>

            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList