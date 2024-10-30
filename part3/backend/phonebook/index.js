const express = require('express')
const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Phonebook app</h1>')
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        number_of_persons = persons.length
        response.send(`<p>Phonebook has info for ${number_of_persons} people</p><p>${new Date()}</p>`)
        mongoose.connection.close()        
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
        mongoose.connection.close()        
    })
})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person)
        response.json(person)
    else
        response.status(404).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body || !Object.keys(body).length)
        return response.status(400).json({ error: 'body missing' })

    if (!body.name)
        return response.status(400).json({ error: 'name missing' })

    if (!body.number)
        return response.status(400).json({ error: 'number missing' })

    Person.find({name: body.name}).then(persons => {                
        if (persons.length) {
            mongoose.connection.close()
            return response.status(400).json({ error: 'name must be unique' })
        }

        const newPerson = new Person({
            name: body.name,
            number: body.number,
        })

        newPerson.save().then(person => {
            response.json(person)
            mongoose.connection.close()
        })
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})