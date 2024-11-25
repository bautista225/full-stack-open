import { useEffect, useState } from 'react'
import { useBooks } from '../books/hooks'
import { useUser } from '../users/hooks'

const Books = ({ show }) => {
    const [filter, setFilter] = useState('')
    const { data: initialBooksData, loading: initialLoading } = useBooks()
    const { data: filteredBooksData, loading: filteredLoading } = useBooks(
        filter ? { variables: { genre: filter } } : {}
    )

    const getBookGenres = (books) => {
        const bookGenres = new Set()

        books.forEach((book) => {
            book.genres.forEach((genre) => bookGenres.add(genre))
        })

        return [...bookGenres]
    }

    if (initialLoading || filteredLoading) {
        return <div>loading...</div>
    }

    if (!show) {
        return null
    }

    const filterByGenre = (genre) => {
        setFilter(genre)
    }

    const resetFilter = () => {
        setFilter('')
    }

    return (
        <div>
            <h2>books</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooksData.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {getBookGenres(initialBooksData)
                    .sort()
                    .map((genre) => (
                        <button
                            key={genre}
                            onClick={() => filterByGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                <button key="reset" onClick={resetFilter}>
                    all genres
                </button>
            </div>
        </div>
    )
}

export default Books
