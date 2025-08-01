import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";
import userReducer from "./reducers/userReducer.js";
import commentReducer from "./reducers/commentReducer.js";

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
        comments: commentReducer
    }
})

