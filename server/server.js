require('dotenv').config({ path: './config.env' })

const cors = require('cors');
const express = require('express');
const { database_sync } = require('./models');


const app = express();
const PORT = process.env.PORT || 5555;

// middleware
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// route middleware
app.use('/api/auth', require('./routes/auth.js'));


const server = app.listen(PORT, () => {
    database_sync();
    console.log(`Listening on: http://localhost:${PORT}`);
})

process.on('unhandledRejection', (err, promise) => {
    if(err) {
        console.error(`\n\n Server Error: \n ${err} \n\n`);
    }

    server.close(() => process.exit(1));
})