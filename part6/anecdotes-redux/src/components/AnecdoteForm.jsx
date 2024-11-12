import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitAnecdote = async (event) => {
        event.preventDefault()
        const anecdoteContent = event.target.anecdote.value

        dispatch(createAnecdote(anecdoteContent))

        dispatch(setNotification(`new anecdote created '${anecdoteContent}'`, 10))

        event.target.anecdote.value = ''
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default AnecdoteForm