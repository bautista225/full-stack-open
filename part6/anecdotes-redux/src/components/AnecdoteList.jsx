import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)

        dispatch(addVote(votedAnecdote))

        dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 10))
    }

    return (
        <>
            {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList