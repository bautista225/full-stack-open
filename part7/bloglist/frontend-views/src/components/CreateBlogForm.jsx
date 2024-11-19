import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/useField'

const CreateBlogForm = () => {
    const dispatch = useDispatch()
    const title = useField('title')
    const author = useField('author')
    const url = useField('url')

    const resetForm = () => {
        title.reset()
        author.reset()
        url.reset()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch(
            createBlog({
                title: title.value,
                author: author.value,
                url: url.value,
            }),
        )

        dispatch(
            setNotification({
                message: `a new blog ${title} by ${author} added`,
            }),
        )

        resetForm()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        {...title.inputProps()}
                    />
                </div>
                <div>
                    author:
                    <input
                        {...author.inputProps()}
                    />
                </div>
                <div>
                    url:
                    <input
                        {...url.inputProps()}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlogForm
