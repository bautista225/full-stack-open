import { gql } from '@apollo/client'

export const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        id
        name
        born
        bookCount
    }
`
