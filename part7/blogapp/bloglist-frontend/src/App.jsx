import { useEffect, useRef } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import blogService from './services/blogs'
import loginService from './services/login.js'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'
import {useSelector, useDispatch} from "react-redux";
import {makeNotification} from "./reducers/notificationReducer.js";
import {setBlogs} from "./reducers/blogReducer.js";
import {setUser} from "./reducers/userReducer.js";
import Header from "./components/Header.jsx";
import Users from "./components/Users.jsx";

const App = () => {
    // redux thingies
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

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
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, [])

    const blogFormRef = useRef()

    const login = async (username, password) => {
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setUser(user))
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
        dispatch(setUser(null))
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

    return (
        <div id={'main'}>
            {notification && (
                <Notification
                    text={notification.text}
                    isError={notification.isError}
                />
            )}
            <Header handleLogin={login} user={user} handleLogout={handleLogout}/>
            {user !== null &&
                <Router>
                    <Routes>
                        <Route path={"/"} element={
                            <BlogList
                                blogs={blogs}
                                user={user}
                                handleLogout={handleLogout}
                                handleNewBlog={handleNewBlog}
                                handleLike={handleLike}
                                handleDelete={handleBlogDelete}
                                blogFormRef={blogFormRef}
                            />
                        }/>
                        <Route path={"/users"} element={<Users/>}/>
                    </Routes>
                </Router>
            }

        </div>
    )
}

export default App
