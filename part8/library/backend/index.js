import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLError } from 'graphql'
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)
import Book from './models/book.js'
import Author from './models/author.js'
import User from './models/user.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = `
    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }
    
    type Book {
        title: String!,
        published: Int,
        author: Author!,
        id: ID!,
        genres: [String!]!,
    }

    type Query {
        me: User
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    
    type Mutation {
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        editAuthor(
            name: String!, 
            setBornTo: Int!
        ): Author!
    }
`

const resolvers = {
    Query: {
        me: (root, args, context) => context.currentUser,
        authorCount: async () => await Author.collection.countDocuments(),
        bookCount: async () => await Book.collection.countDocuments(),
        allBooks: async (root, args) => {
            let filters = {}

            if (args.author) filters.author = args.author
            if (args.genre) filters.genres = args.genre

            return await Book.find(filters).populate('author')
        },
        allAuthors: async (root, args) => {
            return await Author.find({})
        },
    },
    Author: {
        bookCount: async (root) => await Book.find({ author: root.id }).countDocuments(),
    },
    Mutation: {
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre,
            })

            return user.save().catch((error) => {
                throw new GraphQLError('Creating the user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error,
                    },
                })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
        addBook: async (root, args, context) => {
            if (!context.currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                })
            }

            let author = await Author.findOne({ name: args.author })
            if (!(author))
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

            return book
        },
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7),
                process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
