import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    
    ${BOOK_DETAILS}
`
