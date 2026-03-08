const express = require('express')
const connectDb = require('./src/utils/dbConnect')
const cors = require('cors')
const noteRouter = require('./src/routes/noteRoutes')
const userRouter = require('./src/routes/userRoutes')
const app = express()
const port = 5000


connectDb()
app.use(express.json())

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000']
};

app.use(cors(corsOptions))

app.use('/api/note', noteRouter)
app.use('/api/auth', userRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))