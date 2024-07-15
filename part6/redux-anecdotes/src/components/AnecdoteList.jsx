import {useDispatch, useSelector} from "react-redux";
import {voteNote} from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteNote(id))
    }

    return (
        <div>

            {anecdotes.map(anecdote =>
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