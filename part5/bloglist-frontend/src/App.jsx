import {useState, useEffect} from 'react'
import Login from './components/Login.jsx'
import blogService from './services/blogs'
import loginService from './services/login.js'
import BlogList from "./components/BlogList.jsx";
import Notification from "./components/Notification.jsx";


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const [notification, setNotification] = useState(null)

    useEffect(() => {
        const getAll = async () => {
            const blogs = await blogService.getAll()
            blogs.sort((a,b)=> {return b.likes - a.likes})
            setBlogs(blogs)
        }
        getAll()
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedInUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const user = await loginService.login({username, password})

            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            console.log('logged in')
        } catch (exception) {
            setNotification({text: "Wrong username or password", isError: true})
            setTimeout(() => {
                setNotification(null)
            }, 5000)
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
            user: blog.user.id
        }

        try {
            const response = await blogService.update(newBlog)
            console.log('Response:', response)
            const newBlogs = await blogService.getAll()
            newBlogs.sort((a, b)=> {return b.likes - a.likes})
            setBlogs(newBlogs)


        } catch (e) {
            console.log('Something went wrong')
            console.log(e)
        }


    }

    const handleBlogDelete = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            const response = await blogService.remove(blog.id)
            console.log('Removed blog')
            setBlogs(blogs.filter((val) => {
                return val.id !== blog.id
            }))
        }
    }

    const handleNewBlog = async (blog) => {

        console.log('Creating new blog', blog.author, blog.title, blog.url)

        try {
            await blogService.create(blog)

            console.log('created new blog')

            setNotification({text: `A new blog: ${blog.title} by ${blog.author} was created`, isError: false})
            setTimeout(() => {
                setNotification(null)
            }, 5000)

            const newBlogs = await blogService.getAll()
            setBlogs(newBlogs)
        } catch (exception) {
            setNotification({text: "Couldn't create a new blog", isError: true})
            setTimeout(() => {
                setNotification(null)
            }, 5000)
            console.log('Something went wrong')
        }

    }
    if (user === null) {
        return <div id={"main"}>
            {notification !== null && <Notification text={notification.text} isError={notification.isError}/>}

            <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword}
                   handleLogin={handleLogin}/>
        </div>
    }


    return (
        <div id={"main"}>
            {notification !== null && <Notification text={notification.text} isError={notification.isError}/>}
            <BlogList blogs={blogs} user={user} handleLogout={handleLogout} handleNewBlog={handleNewBlog}
                      handleLike={handleLike} handleDelete={handleBlogDelete}/>
        </div>
    )
}

export default App