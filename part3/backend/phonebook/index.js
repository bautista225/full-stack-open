const express = require('express')
const morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
const cors = require('cors')

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
    number_of_persons = persons.length
    response.send(`<p>Phonebook has info for ${number_of_persons} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person)
        response.json(person)
    else
        response.status(404).end()
})

const generateId = () => {
    const max = 1000000
    const min = 1
    let newId = Math.floor(Math.random() * (max - min) + min)

    while (persons.find(person => person.id === newId))
        newId = Math.floor(Math.random() * (max - min) + min)

    return newId
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body || !Object.keys(body).length)
        return response.status(400).json({ error: 'body missing' })

    if (!body.name)
        return response.status(400).json({ error: 'name missing' })

    if (!body.number)
        return response.status(400).json({ error: 'number missing' })

    if (persons.find(person => person.name === body.name))
        return response.status(400).json({ error: 'name must be unique' })

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
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