import {useDispatch, useSelector} from "react-redux";
import {voteNote} from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {

    const filteredAnecdotes = useSelector(({anecdotes, filter}) => {
        if (filter.length == 0) {
            return anecdotes
        }

        return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteNote(id))
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