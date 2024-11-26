import Author from '../models/author.js'
import Book from '../models/book.js'
import { GraphQLError } from 'graphql'

export const typeDef = `
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }

    extend type Query {
        allAuthors: [Author!]!
        authorCount: Int!
    }
    
    extend type Mutation {
        editAuthor(
            name: String!, 
            setBornTo: Int!
        ): Author!
    }
`
export const resolvers = {
    Query: {
        authorCount: async () => await Author.collection.countDocuments(),
        allAuthors: async (root, args) => {
            return await Author.find({})
        },
    },
    Author: {
        bookCount: async (root, args, context) => {
            return context.loaders.bookCountLoader.load(root.id);
        },
    },
    Mutation: {
        editAuthor: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const author = await Author.findOne({ name: args.name })
            if (!author) return null
            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                    },
                })
            }

            return author
        },
    },
}
