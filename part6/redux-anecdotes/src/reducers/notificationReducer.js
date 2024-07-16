import {createSlice} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";




const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (content) => {
    return {
        type: 'notification/createNotification',
        payload: content
    }
}

export const clearNotification = () => {
    return {
        type: 'notification/createNotification',
        payload: ''
    }
}

export default notificationReducer.reducer
export const {createNotification} = notificationReducer.actions
