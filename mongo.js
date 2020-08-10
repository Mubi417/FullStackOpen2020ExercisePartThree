const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length == 4 || process.argv.length > 5) {
    console.log('Please provide the arguments for the database in this format: node mongo.js <DB password> or node mongo.js <DB password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://kundominic:${password}@cluster0-ksr0k.mongodb.net/people?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Database Connected Successfully')
}).catch((error)=>{
    console.log(error)
})

const PersonSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Persons', PersonSchema)

if (process.argv.length === 3) {
    Person.find({}).then((person)=>{
        console.log('phonebook:')
        person.forEach((p) => {
            console.log(p.name + ' ' + p.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: name,
        number: number
    })
    
    person.save().then(()=> {
        console.log('saved successfully')
        mongoose.connection.close()
    })
}