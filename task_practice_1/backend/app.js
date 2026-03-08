const express = require('express')
const cors = require('cors')
const dbConect = require('./src/utils/dbConnect')
const authRoutes = require('./src/routes/authRoutes')
const noteRoutes = require('./src/routes/noteRoutes')
const { verifyToken } = require('./src/utils/function')
const app = express()
const port = 5000
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

app.use(express.json())
dbConect()

app.use('/api/note', verifyToken, noteRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))