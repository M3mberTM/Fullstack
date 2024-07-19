import {useDispatch} from 'react-redux'
import {createNote} from "../reducers/anecdoteReducer.js";
import {clearNotification, setNotification} from "../reducers/notificationReducer.js";
import anecdoteService from '../services/anecdotes.js';

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const createNewNote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        anecdoteService.createNew(content).then(anecdote => {
            dispatch(createNote(anecdote))
            dispatch(setNotification(`New anecdote: ${anecdote.content}`))
            setTimeout(() => {
                dispatch(clearNotification())
            }, 5000)
        })

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewNote}>
                <div><input name={"content"}/></div>
                <button type={"submit"}>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm