import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addLike, createComment, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CreateCommentForm from '../components/CreateCommentForm'
import { Button } from '@mui/material'

const BlogDetails = () => {
    const dispatch = useDispatch()
    const { blogs, user } = useSelector(({ blogs, user }) => ({ blogs, user }))
    const match = useMatch('/blogs/:id')

    const blog = match
        ? blogs.find((blog) => blog.id === match.params.id)
        : null

    if (!blog) return null

    const showWhenUserIsOwner = {
        display: user.username === blog.user.username ? '' : 'none',
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

    const handleCommentSubmit = (comment) => {
        dispatch(createComment({ content: comment.content, blog: blog.id }))
        dispatch(
            setNotification({
                message: `added comment to ${blog.title}`,
            }),
        )
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                likes {blog.likes}
                <Button
                    size="small"
                    variant="outlined"
                    color='success'
                    onClick={handleLikeClick}
                    sx={{ ml: 1 }}
                >
                    like
                </Button>
            </div>
            <div>added by {blog.user.name}</div>
            <div style={showWhenUserIsOwner}>
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={handleRemoveClick}
                >
                    remove
                </Button>
            </div>
            <div>
                <h3>comments</h3>
                <div>
                    <CreateCommentForm onSubmit={handleCommentSubmit} />
                </div>
                <ul>
                    {blog.comments.map((comment) => (
                        <li key={comment.id}>{comment.content}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BlogDetails
