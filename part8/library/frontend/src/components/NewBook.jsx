import { useState } from 'react'
import { useField } from '../hooks/useField'
import { useCreateBook } from '../books/hooks'

const NewBook = (props) => {
    const title = useField({ name: 'title' })
    const author = useField({ name: 'author' })
    const published = useField({ name: 'published', type: 'number' })
    const genre = useField({ name: 'genre' })
    const [genres, setGenres] = useState([])
    const createBook = useCreateBook()

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        createBook({
            title: title.value,
            author: author.value,
            published: published.value,
            genres: genres,
        })

        title.reset()
        author.reset()
        published.reset()
        genre.reset()
        setGenres([])
    }

    const addGenre = () => {
        setGenres(genres.concat(genre.value))
        genre.reset()
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input {...title.inputProps()} />
                </div>
                <div>
                    author
                    <input {...author.inputProps()} />
                </div>
                <div>
                    published
                    <input {...published.inputProps()} />
                </div>
                <div>
                    <input {...genre.inputProps()} />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook
