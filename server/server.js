require('dotenv').config({ path: './config.env' })

const express = require('express')
const { database_sync } = require('./models')


const app = express()
const PORT = process.env.PORT || 5555



const server = app.listen(PORT, () => {
    database_sync()
    console.log(`Listening on: http://localhost:${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    if(err) {
        console.error(`\n\n Server Error: \n ${err} \n\n`)
    }

    server.close(() => process.exit(1))
})