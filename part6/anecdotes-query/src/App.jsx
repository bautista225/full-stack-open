import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './reducers/notificationReducer'

const App = () => {
    const notificationDispatch = useNotificationDispatch()
    const queryClient = useQueryClient()
    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient
                .getQueryData(['anecdotes'])
                .map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
            queryClient.setQueryData(['anecdotes'], anecdotes)
        },
        onError: (error) => {
            let errorMessage = error.message
            if (error.name === 'AxiosError')
                errorMessage = error.response.data?.error
            notificationDispatch({ type: 'SET', payload: errorMessage })
            setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000)
        }
    })
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
        refetchOnWindowFocus: false
    })
    console.log(JSON.parse(JSON.stringify(result)))
    if (result.isLoading)
        return <div>loading data...</div>
    if (result.isError)
        return <div>anecdote service not available due to problems in server</div>

    const anecdotes = result.data

    const handleVote = (anecdote) => {
        console.log('vote')
        updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
        notificationDispatch({ type: 'SET', payload: `anecdote '${anecdote.content}' voted` })
        setTimeout(() => notificationDispatch({ type: 'REMOVE' }), 5000)
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
