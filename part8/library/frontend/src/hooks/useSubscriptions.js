import {
    useQuery,
    useMutation,
    useSubscription,
    useApolloClient,
} from '@apollo/client'
import { BOOK_ADDED } from '../books/graphql/subscriptions'
import { ALL_BOOKS } from '../books/graphql/queries'
import { ALL_AUTHORS } from '../authors/graphql/queries'

export const useSubscriptions = () => {
    const client = useApolloClient()

    const updateAllBooksCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map((p) => p.id).includes(object.id)

        let dataInStore = client.readQuery({ query: ALL_BOOKS })
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: {
                    allBooks: dataInStore.allBooks.concat(addedBook),
                },
            })
        }

        dataInStore = client.readQuery({ query: ALL_AUTHORS })
        client.writeQuery({
            query: ALL_AUTHORS,
            data: {
                allAuthors: dataInStore.allAuthors.map((a) =>
                    a.name === addedBook.author.name
                        ? { ...a, bookCount: a.bookCount + 1 }
                        : a
                ),
            },
        })

        // Actualizar la caché de ALL_BOOKS con filtros (géneros)
        const genres = addedBook.genres || []
        genres.forEach((genre) => {
            try {
                const filteredData = client.readQuery({
                    query: ALL_BOOKS,
                    variables: { genre },
                })

                if (!includedIn(filteredData.allBooks, addedBook)) {
                    client.writeQuery({
                        query: ALL_BOOKS,
                        variables: { genre },
                        data: {
                            allBooks: filteredData.allBooks.concat(addedBook),
                        },
                    })
                }
            } catch (error) {
                // Si no existe la caché con el filtro, ignora el error.
                console.warn(`No cache found for genre: ${genre}`)
            }
        })
    }

    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            const addedBook = data.data.bookAdded
            alert(`${addedBook.title} added`)
            updateAllBooksCacheWith(addedBook)
        },
    })

    return client
}
