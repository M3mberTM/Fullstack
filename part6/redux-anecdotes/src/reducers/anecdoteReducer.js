import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js"
const anecdoteReducer = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        voteNote(state, action) {

            const id = action.payload
            const votedAnecdote = state.find(n => n.id === id)
            const editedState =  state.map(note => note.id !== votedAnecdote.id ? note : {
                ...votedAnecdote,
                votes: votedAnecdote.votes + 1
            })
            return editedState.toSorted((a, b) => b.votes - a.votes)
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setNotes(anecdotes))
    }
}

export const createNote = (content) => {
    return async dispatch => {
        const anecdote = await anecdoteService.createNew(content)
        dispatch(appendNote(anecdote))
    }
}

export const {voteNote, appendNote, setNotes} = anecdoteReducer.actions
export default anecdoteReducer.reducer