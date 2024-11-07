import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
    const [visible, setVisible] = useState(false)
    
    const showWhenVisible = { display: visible ? '' : 'none' }
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenUserIsOwner = { display: user.username === blog.user.username ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const addLike = () => {
        const newBlog = { ...blog, likes: blog.likes + 1 };
        updateBlog(newBlog)
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author}
                <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
                <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
            </div>
            <div style={showWhenVisible}>
                <div>{blog.url}</div>
                <div>likes {blog.likes}<button onClick={addLike}>like</button></div>
                <div>{blog.user.name}</div>
                <div><button style={showWhenUserIsOwner} onClick={() => removeBlog(blog)}>remove</button></div>
            </div>
        </div>
    )
}

export default Blog