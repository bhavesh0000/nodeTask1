const express = require('express')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
const dbURI = require('./db')
const userRoutes = require('./routes/user')
const app = express()

dotenv.config({path:'./.env'})

const port = process.env.PORT || 3000



dbURI()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.use('/api/user', userRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})