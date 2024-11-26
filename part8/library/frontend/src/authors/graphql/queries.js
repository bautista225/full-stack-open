import { gql } from '@apollo/client'
import { AUTHOR_DETAILS } from './fragments'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }

    ${AUTHOR_DETAILS}
`
