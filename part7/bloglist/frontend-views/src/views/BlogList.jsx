import { useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import CreateBlogForm from '../components/CreateBlogForm'
import Blog from '../components/Blog'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const { blogs, user } = useSelector((state) => ({
        blogs: state.blogs,
        user: state.user,
    }))
    const blogFormRef = useRef()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div>
            <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <CreateBlogForm />
            </Togglable>
            <div>
                {[...blogs]
                    .sort((blogA, blogB) => blogA.likes - blogB.likes)
                    .reverse()
                    .map((blog) => (
                        <div style={blogStyle} key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title} by {blog.author} ({blog.likes} likes)
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default BlogList
