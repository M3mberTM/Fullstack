import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getAnecdotes, update} from "./services/anecdotes.js";
import NotifContext from "./NotificationContext.jsx";
import {useContext} from 'react'

const App = () => {

    const notifDispatch = useContext(NotifContext)[1]
    const client = useQueryClient()
    const updateAnecdoteMut = useMutation({
        mutationFn: update, onSuccess: () => {
            client.invalidateQueries({queryKey: ['anecdotes']})
        }
    })

    const handleVote = (anecdote) => {
        const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
        updateAnecdoteMut.mutate(newAnecdote)
        notifDispatch({type: "VOTE", payload: anecdote.content})
        setTimeout(() => {
            notifDispatch({type: "REM"})
        }, 5000)
    }


    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false
    })


    const anecdotes = result.data

    if (result.isError) {
        return (
            <div>
                <p>Anecdote service not available due to problems in the server</p>
            </div>
        )
    }

    if (result.isLoading) {
        return (
            <div>
                <h3>Anecdote app</h3>

                <Notification/>
                <AnecdoteForm/>
                <p>Anecdotes are loading...</p>
            </div>
        )
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification/>
            <AnecdoteForm/>

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
