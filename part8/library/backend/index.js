import { ApolloServer } from '@apollo/server'
import { makeExecutableSchema } from '@graphql-tools/schema'
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)
import User from './models/user.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import http from 'http'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import { typeDefs, resolvers } from './graphql/schema.js'
import cors from 'cors'
import { bookCountLoader } from './loaders.js'
import DataLoader from 'dataloader'

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

const app = express()

const schema = makeExecutableSchema({ typeDefs, resolvers })
const apolloServer = new ApolloServer({
    schema,
})

const getCurrentUser = async (req) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
        const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return currentUser
    }
    return null
}

await apolloServer.start()
app.use(cors())
app.use(express.json())
app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
        context: async ({ req }) => {
            return {
                currentUser: await getCurrentUser(req),
                loaders: {
                    bookCountLoader: new DataLoader((authorId) =>
                        bookCountLoader(authorId)
                    ),
                },
            }
        },
    })
)

const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
})

useServer({ schema }, wsServer)

const PORT = 4000
httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`)
})
