import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            id
            title
            author
            published
            genres
        }
    }
`

export const EDIT_AUTHOR_BIRTHYEAR = gql`
    mutation editAuthorBirthyear(
        $name: String!
        $born: Int!
    ){
        editAuthor(name: $name, setBornTo: $born){
            id
            name
            born
        }    
    }
`