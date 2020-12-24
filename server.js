const express = require('express')
const dotenv = require('dotenv')
// const connectDB = require('./config/db')
const app = express()
dotenv.config()
const { readdirSync } = require('fs')
const connectDB = require('./database/connectDB')
const path = require('path')
const cors = require('cors')

//init middleware
app.use(express.json({ limit: '5mb' }))
// app.use(express.urlencoded({ limit: '25mb' }))

//DB connection
connectDB()

app.use(cors({ origin: process.env.CLIENT_URL }))

//init routes
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

//port listener
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`The app listening at http://localhost:${PORT}`)
})
