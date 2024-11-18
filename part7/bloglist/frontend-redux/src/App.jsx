import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { restartUserSession } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()
    const { blogs, user } = useSelector(state => ({ blogs: state.blogs, user: state.user }))
    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(restartUserSession())
    }, [dispatch])

    useEffect(() => {
        if (user) blogService.setToken(user.token)
    }, [user])

    if (user === null)
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <LoginForm />
            </div>
        )

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <UserInfo />
            <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <CreateBlogForm />
            </Togglable>
            <div>
                {[...blogs]
                    .sort((blogA, blogB) => blogA.likes - blogB.likes)
                    .reverse()
                    .map((blog) => (
                        <Blog key={blog.id} blog={blog} user={user} />
                    ))}
            </div>
        </div>
    )
}

export default App
