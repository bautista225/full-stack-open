import _ from 'lodash'
import { typeDef as Author, resolvers as authorResolvers } from './author.js'
import { typeDef as Book, resolvers as bookResolvers } from './book.js'
import { typeDef as User, resolvers as userResolvers } from './user.js'
import { PubSub } from 'graphql-subscriptions'
import dotenv from 'dotenv'
dotenv.config()

export const pubsub = new PubSub()

const Query = `
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
    
    type Subscription {
        _empty: String
    } 
`

const main_resolvers = {
    Mutation: {
    },
    Subscription: {
    },
}

export const typeDefs = [Query, Author, Book, User]
export const resolvers = _.merge(main_resolvers, authorResolvers, bookResolvers, userResolvers)
