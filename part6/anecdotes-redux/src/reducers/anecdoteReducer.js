import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
        updateAnecdote(state, action) {
            const updatedAnecdote = action.payload
            return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
        },
    }
})

export const { setAnecdotes, addAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = anecdoteContent => {
    return async dispatch => {
        const anecdote = {
            content: anecdoteContent,
            votes: 0
        }
        const newAnecdote = await anecdoteService.create(anecdote)
        dispatch(addAnecdote(newAnecdote))
    }
}

export const addVote = anecdote => {
    return async dispatch => {
        const changedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        const updatedAnecdote = await anecdoteService.change(changedAnecdote)
        dispatch(updateAnecdote(updatedAnecdote))
    }
}

export default anecdoteSlice.reducer