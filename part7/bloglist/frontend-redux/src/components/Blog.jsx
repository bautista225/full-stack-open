import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenUserIsOwner = {
        display: user.username === blog.user.username ? '' : 'none',
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const handleLikeClick = () => {
        dispatch(addLike(blog))

        dispatch(
            setNotification({
                message: `${blog.title} by ${blog.author} updated`,
            }),
        )
    }

    const handleRemoveClick = () => {
        if (!window.confirm(`Remove ${blog.title} by ${blog.author}`)) return

        dispatch(removeBlog(blog))

        dispatch(
            setNotification({
                message: `${blog.title} by ${blog.author} removed`,
            }),
        )
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button style={hideWhenVisible} onClick={toggleVisibility}>
                    view
                </button>
                <button style={showWhenVisible} onClick={toggleVisibility}>
                    hide
                </button>
            </div>
            <div style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}
                    <button onClick={handleLikeClick}>like</button>
                </div>
                <div>{blog.user.name}</div>
                <div>
                    <button
                        style={showWhenUserIsOwner}
                        onClick={handleRemoveClick}
                    >
                        remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Blog
