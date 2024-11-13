import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const notificationDispatch = useNotificationDispatch()

    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
        onError: (error) => {
            let errorMessage = error.message
            console.log(error)
            if (error.name === 'AxiosError')
                errorMessage = error.response.data?.error
            console.log(errorMessage)
            notificationDispatch({ type: 'SET', payload: errorMessage })
            setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000)
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        newAnecdoteMutation.mutate({ content, votes: 0 })
        event.target.anecdote.value = ''
        console.log('new anecdote')
        notificationDispatch({ type: 'SET', payload: `anecdote '${content}' created` })
        setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000)
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
