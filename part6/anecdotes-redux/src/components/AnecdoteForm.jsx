import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value

        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(addAnecdote(newAnecdote))

        dispatch(setNotification(`new anecdote created '${anecdote}'`))
        setTimeout(() => dispatch(removeNotification()), 5000)

        event.target.anecdote.value = ''
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </>
    )
}

export default AnecdoteForm