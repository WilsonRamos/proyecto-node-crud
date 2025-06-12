const express = require("express")
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { config } = require("dotenv")

config()
const bookRouters = require('./routes/book.routers')

const app = express()
app.use(bodyParser.json()) //Parseador de bodies
const port = process.env.PORT || 3000

//aca conectaremos la base de datos
mongoose.connect(process.env.MONGO_URL,{dbName : process.env.MONGO_DB_NAME})
const db = mongoose.connection;

app.use('/books',bookRouters)

app.listen(port, ()=> {
    console.log(`servidor iniciado en el puerto ${port}`)
})