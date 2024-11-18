import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload
        case 'REMOVE':
            return null
        default:
            return null
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null,
    )

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error(
            'useNotificationValue must be used within a NotificationContextProvider',
        )
    }
    return context[0]
}

export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error(
            'useNotificationDispatch must be used within a NotificationContextProvider',
        )
    }
    return context[1]
}

export const createNotification = (dispatch, notificationInfo, seconds = 5) => {
    dispatch({ type: 'SET', payload: notificationInfo })
    setTimeout(() => dispatch({ type: 'REMOVE' }), seconds * 1000)
}

export default NotificationContext
