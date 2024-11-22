import { useField } from '../hooks/useField'
import Select from 'react-select'
import { useEditBirthyear } from '../authors/hooks'

const AuthorBirthyearForm = ({ authors }) => {
    const name = useField({
        name: 'name',
        type: 'select',
        defaultValue: null,
        options: authors.map((a) => ({ value: a.name, label: a.name })),
    })
    const born = useField({ name: 'born', type: 'number' })

    const editAuthorBirthyear = useEditBirthyear()

    const handleSubmit = (event) => {
        event.preventDefault()

        editAuthorBirthyear({ name: name.value, born: born.value })

        name.reset()
        born.reset()
    }

    return (
        <>
            <h3>Set birthyear</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <Select isClearable={true} {...name.selectProps()} />
                </div>
                <div>
                    born
                    <input {...born.inputProps()} />
                </div>
                <button type="submit">update author</button>
            </form>
        </>
    )
}

export default AuthorBirthyearForm
