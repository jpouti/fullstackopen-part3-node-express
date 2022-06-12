const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.ukrakxd.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] && process.argv[4]) {
  mongoose
    .connect(url)
    .then(() => {
      const name = process.argv[3]
      const number = process.argv[4]

      const person = new Person({
        name: name,
        number: number
      })
      return person.save()
        .then(() => {
          console.log(`added ${name} number ${number} to phonebook`)
          return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
    })
} else { // print all contacts
  mongoose.connect(url)
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(p => console.log(p.name, p.number))
      mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}