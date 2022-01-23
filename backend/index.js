import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend working')
})

app.post('/create_table', (req, res) => {
    const { type, count, colName } = req.body
    console.log("Type ", type, " Count ", count, " ColName ", colName)
})

const PORT = process.env.PORT || 8000

app.listen(PORT,
    console.log(`Server running on port ${PORT}`)
)