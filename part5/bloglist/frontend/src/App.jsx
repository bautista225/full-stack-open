import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const blogFormRef = useRef()

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

    const executeUserLogin = async (userCredentials) => {
        try {
            const user = await loginService.login(userCredentials)

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            notifyMessage('wrong username or password', 'error')
        }
    }

    const executeUserLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const addNewBlog = async (blogObject) => {
        try {
            const blog = await blogService.create(blogObject)

            blogFormRef.current.toggleVisibility()
            setBlogs(blogs.concat(blog))

            notifyMessage(`a new blog ${blog.title} by ${blog.author} added`)
        } catch (exception) {
            notifyMessage(`Addition of the blog has failed: ${exception.message}`, 'error')
        }
    }

    const updateBlog = async (blogObject) => {
        try {
            const updatedBlog = await blogService.update(blogObject)
            updatedBlog.user = blogObject.user
            setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))

            notifyMessage(` ${updatedBlog.title} by ${updatedBlog.author} updated`)
        } catch (exception) {
            notifyMessage(`Updating the blog has failed: ${exception.message}`, 'error')
        }
    }

    const removeBlog = async (blogObject) => {
        if (!window.confirm(`Remove ${blogObject.title} by ${blogObject.author}`))
            return

        try {
            await blogService.remove(blogObject)
            setBlogs(blogs.filter(blog => blog.id !== blogObject.id))

            notifyMessage(` ${blogObject.title} by ${blogObject.author} removed`)
        } catch (exception) {
            notifyMessage(`Removing the blog has failed: ${exception.message}`, 'error')
        }
    }

    if (user === null)
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification notification={notification} />
                <LoginForm executeUserLogin={executeUserLogin} />
            </div>
        )

    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <UserInfo name={user.name} executeUserLogout={executeUserLogout}/>
            <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <CreateBlogForm createBlog={addNewBlog} />
            </Togglable>
            <div>
                {blogs
                    .sort((blogA, blogB) => blogA.likes - blogB.likes)
                    .reverse()
                    .map(blog =>
                        <Blog updateBlog={updateBlog} key={blog.id} blog={blog} user={user} removeBlog={removeBlog} />)}
            </div>
        </div>
    )
}

export default App