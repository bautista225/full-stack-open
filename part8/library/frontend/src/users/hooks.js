import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { LOGIN } from './graphql/mutations'
import { useEffect } from 'react'
import { ME } from './graphql/queries'

export const useLogin = ({ setToken }) => {
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        },
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('libraryApp-user-token', token)
        }
    }, [result.data])

    return { login: (variables) => login({ variables }), result }
}

export const useLogout = ({ setToken }) => {
    const client = useApolloClient()

    const logout = () => {
        setToken(null)
        window.localStorage.clear()
        client.resetStore()
    }

    return { logout }
}

export const useRestartSession = ({ setToken }) => {
    const restartSession = () => {
        const token = localStorage.getItem('libraryApp-user-token')
        setToken(token || null)
    }

    return { restartSession }
}

export const useUser = (queryOptions = {}) => {
    const result = useQuery(ME, queryOptions)
    return {
        data: result.data?.me,
        error: result.error,
        loading: result.loading,
    }
}
