import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserInfo from './components/UserInfo'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    createNotification,
    useNotificationDispatch,
} from './contexts/NotificationContext'
import { useUserValue, useUserDispatch } from './contexts/UserContext'

const App = () => {
    const notificationDispatch = useNotificationDispatch()
    const user = useUserValue()
    const userDispatch = useUserDispatch()
    const blogFormRef = useRef()

    const notifyMessage = (message, type = 'success') => {
        createNotification(notificationDispatch, { message, type })
    }

    const onErrorQuery = (error) => {
        let errorMessage = error.message
        if (error.name === 'AxiosError')
            errorMessage = error.response.data?.error
        notifyMessage(errorMessage, 'error')
    }

    const queryClient = useQueryClient()
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => await blogService.getAll(),
        retry: 1,
        refetchOnWindowFocus: false,
    })

    const createBlogMutation = useMutation({
        mutationFn: async (obj) => await blogService.create(obj),
        onSuccess: (newBlog) => {
            newBlog.user = user
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
        },
        onError: onErrorQuery,
    })

    const updateBlogMutation = useMutation({
        mutationFn: async (obj) => blogService.update(obj),
        onSuccess: (updatedBlog) => {
            const blogs = queryClient
                .getQueryData(['blogs'])
                .map((blog) =>
                    blog.id === updatedBlog.id
                        ? { ...updatedBlog, user: blog.user }
                        : blog,
                )
            queryClient.setQueryData(['blogs'], blogs)
        },
        onError: onErrorQuery,
    })

    const removeBlogMutation = useMutation({
        mutationFn: async (obj) => blogService.remove(obj),
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        },
        onError: onErrorQuery,
    })

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            userDispatch({ type: 'SET', payload: loggedUser })
            blogService.setToken(loggedUser.token)
        }
    }, [userDispatch])

    const addNewBlog = async (blog) => {
        try {
            blog.user = {
                username: user.username,
                name: user.name,
                id: user.user,
            }
            blogFormRef.current.toggleVisibility()
            createBlogMutation.mutate(blog)

            notifyMessage(`a new blog ${blog.title} by ${blog.author} added`)
        } catch (exception) {
            notifyMessage(
                `Addition of the blog has failed: ${exception.message}`,
                'error',
            )
        }
    }

    const updateBlog = async (blog) => {
        try {
            updateBlogMutation.mutate(blog)
            notifyMessage(`${blog.title} by ${blog.author} updated`)
        } catch (exception) {
            notifyMessage(
                `Updating the blog has failed: ${exception.message}`,
                'error',
            )
        }
    }

    const removeBlog = async (blog) => {
        try {
            removeBlogMutation.mutate(blog)
            notifyMessage(`${blog.title} by ${blog.author} removed`)
        } catch (error) {
            notifyMessage(
                `Removing the blog has failed: ${error.message}`,
                'error',
            )
        }
    }

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const blogs = result.data

    const executeUserLogin = async (userCredentials) => {
        try {
            console.log(userCredentials)
            const loggedUser = await loginService.login(userCredentials)
            blogService.setToken(loggedUser.token)
            userDispatch({ type: 'SET', payload: loggedUser })
        } catch (exception) {
            console.log(exception)
            notifyMessage('wrong username or password', 'error')
        }
    }

    if (user === null)
        return (
            <div>
                <h2>Log in to application</h2>
                <Notification />
                <LoginForm executeUserLogin={executeUserLogin} />
            </div>
        )

    return (
        <div>
            <h2>blogs</h2>
            <Notification />
            <UserInfo />
            <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <CreateBlogForm createBlog={addNewBlog} />
            </Togglable>
            <div>
                {blogs
                    .sort((blogA, blogB) => blogA.likes - blogB.likes)
                    .reverse()
                    .map((blog) => (
                        <Blog
                            updateBlog={updateBlog}
                            key={blog.id}
                            blog={blog}
                            removeBlog={removeBlog}
                        />
                    ))}
            </div>
        </div>
    )
}

export default App
