import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload
        },
        addAnecdote(state, action) {
            state.push(action.payload)
        },
        addVote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(anecdote => anecdote.id === id)

            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1
            }
            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        },
    }
})

export const { addVote, createAnecdote, setAnecdotes, addAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer