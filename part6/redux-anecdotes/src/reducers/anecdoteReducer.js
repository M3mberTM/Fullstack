import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js"

const anecdoteReducer = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        updateNote(state, action) {
            const id = action.payload.id
            const editedState = state.map(note => note.id !== id ? note : action.payload)
            return editedState.toSorted((a, b) => b.votes - a.votes)
        },
        sortNotes(state, action) {
            return state.toSorted((a, b) => b.votes - a.votes)
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
        dispatch(sortNotes())
    }
}

export const createNote = (content) => {
    return async dispatch => {
        const anecdote = await anecdoteService.createNew(content)
        dispatch(appendNote(anecdote))
    }
}

export const voteNote = (note) => {
    return async dispatch => {
        const votedNote = {...note, votes: note.votes + 1}
        const anecdote = await anecdoteService.update(votedNote)
        dispatch(updateNote(anecdote))
    }
}

export const {updateNote, appendNote, setNotes, sortNotes} = anecdoteReducer.actions
export default anecdoteReducer.reducer