import { useState, useEffect, useRef } from 'react'
import Login from './components/Login.jsx'
import blogService from './services/blogs'
import loginService from './services/login.js'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'
import {useSelector, useDispatch} from "react-redux";
import {makeNotification} from "./reducers/notificationReducer.js";
import {setBlogs} from "./reducers/blogReducer.js";

const App = () => {
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    // redux thingies
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            const sorted = blogs.toSorted((a,b) => {
                return b.likes - a.likes
            })
            dispatch(setBlogs(sorted))
        })
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = useRef()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            console.log('logged in')
        } catch (exception) {
            dispatch(makeNotification({
                text: 'Wrong username or password',
                isError: true,
            }, 5))
            console.log('Wrong credentials')
        }
    }

    const handleLogout = () => {
        console.log('logging out')
        window.localStorage.removeItem('loggedInUser')
        setUser(null)
    }

    const handleLike = async (blog) => {
        console.log('adding like to:', blog)
        const newBlog = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        try {
            const response = await blogService.update(newBlog)
            console.log('Response:', response)
            const newBlogs = await blogService.getAll()
            newBlogs.sort((a, b) => {
                return b.likes - a.likes
            })
            dispatch(setBlogs(newBlogs))
        } catch (e) {
            console.log('Something went wrong')
            console.log(e)
        }
    }

    const handleBlogDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            await blogService.remove(blog.id)
            console.log('Removed blog')
            dispatch(setBlogs(
                blogs.filter((val) => {
                    return val.id !== blog.id
                })
            ))
        }
    }

    const handleNewBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        console.log('Creating new blog', blog.author, blog.title, blog.url)

        try {
            await blogService.create(blog)

            console.log('created new blog')

            dispatch(makeNotification({
                text: `A new blog: ${blog.title} by ${blog.author} was created`,
                isError: false,
            }, 5))
            const newBlogs = await blogService.getAll()
            dispatch(setBlogs(newBlogs))
        } catch (exception) {
            dispatch(makeNotification({
                text: "Couldn't create a new blog",
                isError: true,
            }, 5))
            console.log('Something went wrong')
        }
    }

    if (user === null) {
        return (
            <div id={'main'}>
                {notification && (
                    <Notification
                        text={notification.text}
                        isError={notification.isError}
                    />
                )}

                <Login
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                />
            </div>
        )
    }

    return (
        <div id={'main'}>
            {notification && (
                <Notification
                    text={notification.text}
                    isError={notification.isError}
                />
            )}
            <BlogList
                blogs={blogs}
                user={user}
                handleLogout={handleLogout}
                handleNewBlog={handleNewBlog}
                handleLike={handleLike}
                handleDelete={handleBlogDelete}
                blogFormRef={blogFormRef}
            />
        </div>
    )
}

export default App
