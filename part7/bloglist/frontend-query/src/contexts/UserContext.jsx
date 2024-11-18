import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET': {
            const user = action.payload
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user),
            )
            return user
        }
        case 'REMOVE': {
            window.localStorage.removeItem('loggedBlogappUser')
            return null
        }
        default:
            return null
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserValue = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error(
            'useUserValue must be used within a UserContextProvider',
        )
    }
    return context[0]
}

export const useUserDispatch = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error(
            'useUserDispatch must be used within a UserContextProvider',
        )
    }
    return context[1]
}

export default UserContext
