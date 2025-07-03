import {createSlice} from "@reduxjs/toolkit";

const blogReducer = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        }
    }
})


export default blogReducer.reducer
export const {setBlogs} = blogReducer.actions
