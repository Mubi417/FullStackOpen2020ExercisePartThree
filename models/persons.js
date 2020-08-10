const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(()=>{
    console.log('Database Connected Successfully')
}).catch((error)=>{
    console.log(error)
})

const PersonSchema = new mongoose.Schema({
    name: {type: String, unique: true, required:true, minlength:3},
    number:  {type: String, unique: true, required:true, minlength:8}
})

PersonSchema.set('toJSON', {
    transform: (doc, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

PersonSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Persons', PersonSchema)