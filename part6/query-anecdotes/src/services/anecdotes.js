import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const createNew = (newAnecdote) =>
    axios.post(baseUrl, newAnecdote).then(res => res.data)

export const update = (newAnecdote) =>
    axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)