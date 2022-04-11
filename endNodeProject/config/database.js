const mongoose = require('mongoose')

//Connection string
mongoose.connect('mongodb://localhost:27017/nodejs')

const db = mongoose.connection

db.on('error',console.error.bind(console,'connection error:'));
db.once('open' ,() => {
    console.log('connected')
})

