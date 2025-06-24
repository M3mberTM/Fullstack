import {createContext, useReducer} from 'react'

const notifReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return `Anecdote "${action.payload}" was added`
        case "VOTE":
            return `Anecdote "${action.payload}" was voted on`
        case "ERR":
            return 'Too short. Anecdote must have length of 5 or more'
        case "REM":
            return undefined
        default:
            return state

    }
}

const NotifContext = createContext()

export const NotificationContext = (props) => {
    const [notif, notifDispatch] = useReducer(notifReducer, undefined)

    return (
        <NotifContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotifContext.Provider>
    )
}

export default NotifContext