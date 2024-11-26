import { gql } from '@apollo/client'
import { AUTHOR_DETAILS } from './fragments'

export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthorBirthyear($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            ...AuthorDetails
        }
    }

    ${AUTHOR_DETAILS}
`
