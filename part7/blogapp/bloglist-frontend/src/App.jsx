import { useEffect, useRef } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login.js'
import utilService from './services/utils.js'
import commentService from './services/comments.js'
import BlogList from './components/BlogList.jsx'
import Notification from './components/Notification.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { makeNotification } from './reducers/notificationReducer.js'
import { setBlogs } from './reducers/blogReducer.js'
import { setLoggedUser, setUsers } from './reducers/userReducer.js'
import Header from './components/Header.jsx'
import Users from './components/Users.jsx'
import UserService from './services/users.js'
import User from './components/User.jsx'
import BlogDetails from './components/BlogDetails.jsx'
import {setComments} from "./reducers/commentReducer.js";
// MUI imports
import {Container} from '@mui/material'

const App = () => {
    // redux thingies
    const dispatch = useDispatch()
    const notification = useSelector((state) => state.notification)
    const blogs = useSelector((state) => state.blogs)
    const loggedUser = useSelector((state) => state.user.loggedUser)
    const users = useSelector((state) => state.user.users)
    const comments = useSelector((state) => state.comments)

    // parametrized url setups
    const userMatch = useMatch('/users/:id')
    const pickedUser = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
        : null

    const blogMatch = useMatch('/blogs/:id')
    const pickedBlog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null
    const pickedComments = pickedBlog ? comments.filter((comment) => comment.blog.id === pickedBlog.id) : []

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            const sorted = blogs.toSorted((a, b) => {
                return b.likes - a.likes
            })
            dispatch(setBlogs(sorted))
        })
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(setLoggedUser(user))
            utilService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        UserService.getAll().then((data) => {
            console.log('Retrieved users: ', data)
            dispatch(setUsers(data))
        })
    }, [])

    useEffect(() => {
        commentService.getAll().then((data) => {
            console.log('Retrieved comments: ', data)
            dispatch(setComments(data))
        })
    }, [])

    const blogFormRef = useRef()

    const handleNewComment = async (blogId, content) => {
        console.log('Creating new comment: ', content)

        try {
            await commentService.create({blog: blogId, content: content})

            console.log('created new comment')

            dispatch(
                makeNotification(
                    {
                        text: `New comment was created: ${content}`,
                        isError: false,
                    },
                    5
                )
            )
            const newComments = await commentService.getAll()
            dispatch(setComments(newComments))
        } catch (exception) {
            dispatch(
                makeNotification(
                    {
                        text: "Couldn't create a new comment",
                        isError: true,
                    },
                    5
                )
            )
            console.log('Something went wrong')
        }
    }

    const login = async (username, password) => {
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            utilService.setToken(user.token)
            dispatch(setLoggedUser(user))
            console.log('logged in')
        } catch (exception) {
            dispatch(
                makeNotification(
                    {
                        text: 'Wrong username or password',
                        isError: true,
                    },
                    5
                )
            )
            console.log('Wrong credentials')
        }
    }

    const handleLogout = () => {
        console.log('logging out')
        window.localStorage.removeItem('loggedInUser')
        dispatch(setLoggedUser(null))
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
            dispatch(
                setBlogs(
                    blogs.filter((val) => {
                        return val.id !== blog.id
                    })
                )
            )
        }
    }

    const handleNewBlog = async (blog) => {
        blogFormRef.current.toggleVisibility()
        console.log('Creating new blog', blog.author, blog.title, blog.url)

        try {
            await blogService.create(blog)

            console.log('created new blog')

            dispatch(
                makeNotification(
                    {
                        text: `A new blog: ${blog.title} by ${blog.author} was created`,
                        isError: false,
                    },
                    5
                )
            )
            const newBlogs = await blogService.getAll()
            dispatch(setBlogs(newBlogs))
        } catch (exception) {
            dispatch(
                makeNotification(
                    {
                        text: "Couldn't create a new blog",
                        isError: true,
                    },
                    5
                )
            )
            console.log('Something went wrong')
        }
    }

    return (
        <Container id={'main'}>
            <Header
                handleLogin={login}
                user={loggedUser}
                handleLogout={handleLogout}
            />
            {notification && (
                <Notification
                    text={notification.text}
                    isError={notification.isError}
                />
            )}
            {loggedUser !== null && (
                <Routes>
                    <Route
                        path={'/'}
                        element={
                            <BlogList
                                blogs={blogs}
                                handleNewBlog={handleNewBlog}
                                blogFormRef={blogFormRef}
                            />
                        }
                    />
                    <Route path={'/users'} element={<Users users={users} />} />
                    <Route
                        path={'/users/:id'}
                        element={<User userObject={pickedUser} />}
                    />
                    <Route
                        path={'/blogs/:id'}
                        element={
                            <BlogDetails
                                handleRemove={handleBlogDelete}
                                handleLike={handleLike}
                                blogObject={pickedBlog}
                                comments={pickedComments}
                                handleNewComment={handleNewComment}
                            />
                        }
                    />
                </Routes>
            )}
        </Container>
    )
}

export default App
