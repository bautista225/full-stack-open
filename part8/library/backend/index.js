import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { v1 as uuid } from 'uuid'

let authors = [
    {
        name: "Robert Martin",
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: "Martin Fowler",
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963,
    },
    {
        name: "Fyodor Dostoevsky",
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821,
    },
    {
        name: "Joshua Kerievsky", // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: "Sandi Metz", // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
];

/*
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el
 * contexto del libro en lugar del nombre del autor.
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
    {
        title: "Clean Code",
        published: 2008,
        author: "Robert Martin",
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Agile software development",
        published: 2002,
        author: "Robert Martin",
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ["agile", "patterns", "design"],
    },
    {
        title: "Refactoring, edition 2",
        published: 2018,
        author: "Martin Fowler",
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring"],
    },
    {
        title: "Refactoring to patterns",
        published: 2008,
        author: "Joshua Kerievsky",
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "patterns"],
    },
    {
        title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
        published: 2012,
        author: "Sandi Metz",
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ["refactoring", "design"],
    },
    {
        title: "Crime and punishment",
        published: 1866,
        author: "Fyodor Dostoevsky",
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "crime"],
    },
    {
        title: "Demons",
        published: 1872,
        author: "Fyodor Dostoevsky",
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ["classic", "revolution"],
    },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }
    
    type Book {
        title: String!,
        published: Int,
        author: String!,
        id: ID!,
        genres: [String!]!,
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!, 
            setBornTo: Int!
        ): Author
    }
`;

const resolvers = {
    Query: {
        authorCount: () => authors.length,
        bookCount: () => books.length,
        allBooks: (root, args) => {
            let filteredBooks = [...books]
            if (args.author)
                filteredBooks = filteredBooks.filter(b => b.author === args.author)
            if (args.genre)
                filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
            return filteredBooks
        },
        allAuthors: () => authors,
    },
    Author: {
        bookCount: root => books.filter(b => b.author === root.name).length
    },
    Mutation: {
        addBook: (root, args) => {
            if (!authors.find(a => a.name === args.author))
                authors = authors.concat({ name: args.author })
            const book = { ...args, id: uuid() }
            books = books.concat(book)
            return book
        },
        editAuthor: (root, args) => {
            const author = authors.find(a => a.name === args.name)
            if (!author)
                return null
            authors = authors.filter(a => a.name !== args.name).concat({ ...author, born: args.setBornTo })
            return authors[authors.length - 1]
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
