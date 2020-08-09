require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.status(200).json(persons)
    }).catch(error=>next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (!person){
            return res.status(400).end()
        }
        res.status(200).json(person)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id).then((result) => {
        if (!result){
            return res.status(400).end()
        }
        res.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name) {
        return res.status(404).json({error: "Name not found"})
    } else if (!body.number) {
        return res.status(404).json({error: "Phone not found"})
    }

    const person = new Person ({
        name: body.name,
        number: body.number,
    })

    person.save().then(result => {
        res.status(201).json(result)
    }).catch(error=>next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = {
        name: req.body.name,
        number: req.body.number
    }
    Person.findByIdAndUpdate(req.params.id, person,  {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => {
        if (!updatedPerson){
            return res.status(400).end()
        }
        res.json(updatedPerson)
    }).catch(error => next(error))
})

app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({}).then(persons => {
        res.writeHead(200, {'Content-Type': 'text/html' })
    res.end(
    `<div><p>Phone Book has info for ${persons.length} people</p>${date.toUTCString()}<p></p></div>`
    )
    })
})

app.use((error, req, res, next) => {
    console.log(error.message)

    if (error.name === "CastError") {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === "ValidationError") {
        return res.status(400).json({error: error.message})
    }

    next(error)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})