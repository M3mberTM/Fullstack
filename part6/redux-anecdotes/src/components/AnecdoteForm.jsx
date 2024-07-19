import {useDispatch} from 'react-redux'
import {createNote} from "../reducers/anecdoteReducer.js";
import {clearNotification, setNotification} from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {

    const dispatch = useDispatch()
    const createNewNote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(createNote(content))
        dispatch(setNotification(`New anecdote: ${content}`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)


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