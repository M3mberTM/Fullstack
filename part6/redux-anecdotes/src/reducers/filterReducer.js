import {createSlice} from "@reduxjs/toolkit";


const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        createFilter(state, action) {
            return action.payload.filter
        }
    }
})

export const {createFilter} = filterReducer.actions
export default filterReducer.reducer