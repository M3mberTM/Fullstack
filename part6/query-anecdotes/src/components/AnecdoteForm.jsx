import {createNew} from "../services/anecdotes.js";
import {useMutation, useQueryClient} from '@tanstack/react-query'
import NotifContext from "../NotificationContext.jsx";
import {useContext} from 'react'

const AnecdoteForm = () => {
    const notifDispatch = useContext(NotifContext)[1]
    const client = useQueryClient()
    const newAnecdoteMut = useMutation({mutationFn: createNew, onSuccess: () => {
            client.invalidateQueries({queryKey: ['anecdotes'] })
        }})

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = {content, votes: 0}
        newAnecdoteMut.mutate(newAnecdote)
        notifDispatch({type: "ADD", payload: content})
        setTimeout(() => {
            notifDispatch({type: "REM"})
        }, 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
