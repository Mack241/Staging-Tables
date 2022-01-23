import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const app = express()

const { Client } = pg

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

client.connect().then(
    console.log('Postgres connected')
)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend working')
})

app.post('/create_table', (req, res) => {
    const { type, count, colName, tableName } = req.body    //CREATE TABLE tables RateID integer, Username VARCHAR(50)
    let query = `CREATE TABLE IF NOT EXISTS ${tableName}( ` 
    
    for(let i=0; i<count; i++){
        if(i == count-1){
            query += colName[i]+" "+type[i]
        }else{
            query += colName[i]+" "+type[i]+", "
        }
    }
    query = query + " );"

    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
    })
    
})

const PORT = process.env.PORT || 8000

app.listen(PORT,
    console.log(`Server running on port ${PORT}`)
)