import { useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import CreateBlogForm from '../components/CreateBlogForm'
import Blog from '../components/Blog'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardContent } from '@mui/material'

const BlogList = () => {
    const { blogs, user } = useSelector((state) => ({
        blogs: state.blogs,
        user: state.user,
    }))
    const blogFormRef = useRef()

    return (
        <Box sx={{ display: 'grid', gap: 1 }}>
            <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                <CreateBlogForm />
            </Togglable>
            {[...blogs]
                .sort((blogA, blogB) => blogA.likes - blogB.likes)
                .reverse()
                .map((blog) => (
                    <Card key={blog.id}>
                        <CardContent>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title} by {blog.author} ({blog.likes}{' '}
                                likes)
                            </Link>
                        </CardContent>
                    </Card>
                ))}
        </Box>
    )
}

export default BlogList
