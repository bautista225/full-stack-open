import { gql } from '@apollo/client'

export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthorBirthyear($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            id
            name
            born
        }
    }
`
