import Book from '../models/book.js'
import Author from '../models/author.js'
import { GraphQLError } from 'graphql'
import { SUBSCRIPTIONS } from './subscriptions.js'
import { pubsub } from './schema.js'

export const typeDef = `
    type Book {
        title: String!,
        published: Int,
        author: Author!,
        id: ID!,
        genres: [String!]!,
    }

    extend type Query {
        allBooks(author: String, genre: String): [Book!]!
        bookCount: Int!
    }
    
    extend type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
    }
    
    extend type Subscription {
        bookAdded: Book!
    }
`
export const resolvers = {
    Query: {
        bookCount: async () => await Book.collection.countDocuments(),
        allBooks: async (root, args) => {
            let filters = {}

            if (args.author) filters.author = args.author
            if (args.genre) filters.genres = args.genre

            return await Book.find(filters).populate('author')
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            let author = await Author.findOne({ name: args.author })
            if (!author)
                try {
                    author = new Author({ name: args.author })
                    await author.save()
                } catch (error) {
                    throw new GraphQLError(error.message, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args,
                        },
                    })
                }

            const book = new Book({ ...args, author: author })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                    },
                })
            }

            pubsub.publish(SUBSCRIPTIONS.BOOK_ADDED, { bookAdded: book })

            return book
        },
    }
}
