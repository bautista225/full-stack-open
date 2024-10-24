import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleSearchChange = (event) => setNewSearch(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const checkPersonExist = (newPerson) => {
    const matchedPersons = persons.filter(person => person.name === newPerson.name)
    return matchedPersons.length != 0
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (checkPersonExist(newPerson))
      return updatePerson(newPerson)
    
    personsService.create(newPerson).then(createdPerson => {
      setPersons([...persons, createdPerson])
    })

    setNewName('')
    setNewNumber('')
  }

  const updatePerson = (newPerson) => {
    if (!confirm(`${newPerson.name} is alerady added to phonebook, replace the old number with a new one?`))
      return

    const existingPerson = persons.filter(person => person.name === newPerson.name)[0]

    personsService.update(existingPerson.id, newPerson).then(updatedPerson => {
      setPersons([...persons.filter(person => person.id !== updatedPerson.id), updatedPerson])
    })

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (!window.confirm(`Delete ${person.name} ?`)) return

    personsService.remove(person.id).then(deletedPerson => {
      setPersons(persons.filter(person => person.id !== deletedPerson.id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNewPerson={addNewPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch} deletePerson={deletePerson} />
    </div>
  )
}

export default App