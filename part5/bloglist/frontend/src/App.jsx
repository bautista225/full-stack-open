import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const notifyMessage = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 5000)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            notifyMessage('wrong username or password', 'error')
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = await blogService.create({
                title,
                author,
                url
            })
            
            setTitle('')
            setAuthor('')
            setUrl('')
            setBlogs(blogs.concat(blog))
            
            notifyMessage(`a new blog ${blog.title} by ${blog.author} added`)
        } catch (exception) {
            notifyMessage('Addition of the blog has failed', 'error')
        }
    }

    if (user === null)
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification notification={notification} />
                <LoginForm username={username} password={password} handleLogin={handleLogin}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                />
            </div>
        )

    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <div>
                {user.name} logged in<button onClick={handleLogout}>logout</button>
            </div>
            <CreateBlogForm title={title} author={author} url={url} handleCreateBlog={handleCreateBlog}
                handleTitleChange={({ target }) => setTitle(target.value)}
                handleAuthorChange={({ target }) => setAuthor(target.value)}
                handleUrlChange={({ target }) => setUrl(target.value)}
            />
            <div>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        </div>
    )
}

export default App