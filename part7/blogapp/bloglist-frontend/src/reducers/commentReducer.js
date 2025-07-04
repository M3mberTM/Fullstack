import {createSlice} from "@reduxjs/toolkit";

const commentReducer = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload
        }
    }
})


export default commentReducer.reducer
export const {setComments} = commentReducer.actions
