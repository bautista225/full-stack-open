import { useMutation, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './graphql/queries'
import { CREATE_BOOK } from './graphql/mutations'
import { ALL_AUTHORS } from '../authors/graphql/queries'

export const useBooks = (queryOptions = {}) => {
    const result = useQuery(ALL_BOOKS, queryOptions)
    return {
        data: result.data?.allBooks || [],
        error: result.error,
        loading: result.loading,
    }
}

export const useCreateBook = () => {
    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    })
    return (variables) => createBook({ variables })
}
