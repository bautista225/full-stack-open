import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS } from './graphql/queries'
import { EDIT_AUTHOR_BIRTHYEAR } from './graphql/mutations'

export const useAuthors = () => {
    const result = useQuery(ALL_AUTHORS)
    return {
        data: result.data?.allAuthors || [],
        error: result.error,
        loading: result.loading,
    }
}

export const useEditBirthyear = () => {
    const [editAuthorBirthyear] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })
    return (variables) => editAuthorBirthyear({ variables })
}
