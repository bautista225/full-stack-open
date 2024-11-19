import { useState } from 'react'

const CreateCommentForm = ({ onSubmit }) => {
    const [content, setContent] = useState('')

    const resetForm = () => {
        setContent('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit({ content })
        resetForm()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={content}
                    name="comment"
                    placeholder="comment"
                    onChange={({ target }) => setContent(target.value)}
                />
                <button type="submit">add comment</button>
            </form>
        </div>
    )
}

export default CreateCommentForm
