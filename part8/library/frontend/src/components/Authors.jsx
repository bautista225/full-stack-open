import AuthorBirthyearForm from './AuthorBirthyearForm'
import { useAuthors } from '../authors/hooks'

const Authors = (props) => {
    if (!props.show) {
        return null
    }

    const { data, loading, error } = useAuthors()
    const authors = data

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.id}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AuthorBirthyearForm authors={authors} />
        </div>
    )
}

export default Authors
