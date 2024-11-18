import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            state.push(action.payload)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            return state.map((blog) =>
                blog.id !== updatedBlog.id ? blog : updatedBlog,
            )
        },
        deleteBlog(state, action) {
            const deletedBlog = action.payload
            return state.filter((blog) => blog.id !== deletedBlog.id)
        },
    },
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = ({ title, author, url }) => {
    return async (dispatch) => {
        const blog = {
            title,
            author,
            url,
        }
        const newBlog = await blogService.create(blog)
        dispatch(addBlog(newBlog))
    }
}

export const addLike = (blog) => {
    return async (dispatch) => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.update(newBlog)
        updatedBlog.user = blog.user
        dispatch(updateBlog(updatedBlog))
    }
}

export const removeBlog = (blog) => {
    return async(dispatch) => {
        await blogService.remove(blog)
        dispatch(deleteBlog(blog))
    }
}

export default blogSlice.reducer
