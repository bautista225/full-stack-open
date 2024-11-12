import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        putNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return ''
        },
    }
})

export const { putNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
    return async dispatch => {
        const miliseconds = seconds * 1000

        dispatch(putNotification(message))

        setTimeout(() => {
            dispatch(removeNotification())
        }, miliseconds)
    }
}

export default notificationSlice.reducer