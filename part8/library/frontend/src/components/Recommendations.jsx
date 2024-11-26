import { useBooks } from '../books/hooks'
import { useUser } from '../users/hooks'

const Recommendations = ({ show }) => {
    const { data: userData, loading: userLoading, error: userError } = useUser()

    const userFavoriteGenre = userData?.favoriteGenre
    const {
        data: booksData,
        loading: booksLoading,
        error: booksError,
    } = useBooks({
        variables: { genre: userFavoriteGenre },
        skip: !userFavoriteGenre,
    })

    if (userLoading || booksLoading) {
        return <div>Loading...</div>
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>recommendations</h2>
            <div>
                books in your favorite genre{' '}
                <strong>{userFavoriteGenre}</strong>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {booksData.map((a) => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations
