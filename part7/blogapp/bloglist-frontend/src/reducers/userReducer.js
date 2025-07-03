import {createSlice} from "@reduxjs/toolkit";

const userReducer = createSlice({
    name: 'user',
    initialState: {loggedUser: null, users: []},
    reducers: {
        setLoggedUser(state, action) {
            state.loggedUser = action.payload
        },
        setUsers(state, action) {
            state.users = action.payload
        }
    }
})


export default userReducer.reducer
export const {setLoggedUser, setUsers} = userReducer.actions
