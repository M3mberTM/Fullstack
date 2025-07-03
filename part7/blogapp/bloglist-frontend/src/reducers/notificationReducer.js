import {createSlice} from "@reduxjs/toolkit";

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

export const makeNotification = (content, time) => {
    return async dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}

export default notificationReducer.reducer
export const {createNotification} = notificationReducer.actions
