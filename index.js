const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

let persons = [
    {
      name: "Arto Hellas",
      number: "040-1234567",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id == id)
    if (!person) {
        return res.status(404).json({error: "person not found"})
    }
    res.status(200).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id == id)
    if (!person) {
        return res.status(404).json({error: "person not found"})
    }
    persons = persons.filter(person => person.id != id)
    console.log(persons)
    res.status(204).json({})
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const nameList = persons.map(person => person.name)

    if (!body.name) {
        return res.status(404).json({error: "Name not found"})
    } else if (!body.number) {
        return res.status(404).json({error: "Phone not found"})
    } else if (nameList.includes(body.name)) {
        return res.status(400).json({error: "Name must be unique"})
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.ceil(Math.random()*9999999999)
    }

    persons.push(person)

    res.status(201).json(person)
})


app.get('/info', (req, res) => {
    const date = new Date() 
    res.writeHead(200, {'Content-Type': 'text/html' })
    res.end(
    `<div><p>Phone Book has info for ${persons.length} people</p>${date.toUTCString()}<p></p></div>`
    )
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})