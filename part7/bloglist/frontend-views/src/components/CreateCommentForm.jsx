import { useState } from 'react'
import { useField } from '../hooks/useField'

const CreateCommentForm = ({ onSubmit }) => {
    const content = useField('comment')

    const resetForm = () => {
        content.reset()
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        onSubmit({ content: content.value })
        resetForm()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    {...content.inputProps()}
                />
                <button type="submit">add comment</button>
            </form>
        </div>
    )
}

export default CreateCommentForm
