import {createSlice} from "@reduxjs/toolkit";

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
        createNote(state, action) {
            const content = action.payload
            state.push({content, votes: 0, id: getId()})
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const {voteNote, createNote, setNotes} = anecdoteReducer.actions
export default anecdoteReducer.reducer