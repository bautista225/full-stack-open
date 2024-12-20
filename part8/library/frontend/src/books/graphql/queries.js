import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

export const ALL_BOOKS = gql`
    query AllBooks($genre: String) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`
