import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export const userLogin = (userCredentials) => {
    return async (dispatch) => {
        const user = await loginService.login(userCredentials)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        dispatch(setUser(user))
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(removeUser())
    }
}

export const restartUserSession = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
    }
}

export default userSlice.reducer
