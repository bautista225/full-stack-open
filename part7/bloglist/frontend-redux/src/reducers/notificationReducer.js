import { createSlice } from '@reduxjs/toolkit'

const emptyNotification = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        putNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return emptyNotification
        },
    },
})

export const { putNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notificationInfo, seconds = 5) => {
    return async (dispatch) => {
        const miliseconds = seconds * 1000

        dispatch(putNotification(notificationInfo))

        setTimeout(() => {
            dispatch(removeNotification())
        }, miliseconds)
    }
}

export default notificationSlice.reducer
