import {createNew} from "../services/anecdotes.js";
import {useMutation, useQueryClient} from '@tanstack/react-query'

const AnecdoteForm = () => {
    const client = useQueryClient()
    const newAnecdoteMut = useMutation({mutationFn: createNew, onSuccess: () => {
            client.invalidateQueries({queryKey: ['anecdotes'] })
        }})

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
        newAnecdoteMut.mutate({content, votes: 0 })
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
