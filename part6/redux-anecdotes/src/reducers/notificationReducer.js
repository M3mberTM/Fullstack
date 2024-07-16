import {createSlice} from "@reduxjs/toolkit";


const notificationReducer = createSlice({
    name: 'notification',
    initialState: 'NOTIFICATION',
    reducers: {
        createNotification(state, action) {
            const {content} = action.payload
            return content
        }
    }
})

export default notificationReducer.reducer
export const {createNotification} = notificationReducer.actions