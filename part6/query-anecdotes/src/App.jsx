import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery} from "@tanstack/react-query";
import {getAnecdotes} from "./services/anecdotes.js";

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
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
          <h3>Anecdote app</h3>

          <Notification />
          <AnecdoteForm />
          <p>Something went wrong!</p>
        </div>
    )
  }

  if (result.isLoading) {
    return (
        <div>
          <h3>Anecdote app</h3>

          <Notification />
          <AnecdoteForm />
          <p>Anecdotes are loading...</p>
        </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
