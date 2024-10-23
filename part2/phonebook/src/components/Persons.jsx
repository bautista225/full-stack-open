const Contact = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons, newSearch }) => {

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

    return (
        <div>
            {filteredPersons.map(person => <Contact key={person.name} person={person} />)}
        </div>
    )
}

export default Persons