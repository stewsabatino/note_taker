const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
let db = require('./db/db.json')
const PORT = process.env.PORT || 3001
const uuid = require('./helpers/uuid')


app.use(express.json())
app.use(express.urlencoded({ exteded: true }))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    res.json(db)
})

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    req.body.id = uuid()
    db.push(req.body)
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2))
    res.json(db)
})

app.delete('/api/notes/:id', (req, res) => {
    db = db.filter(note => note.id !== req.params.id)
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 2))
    res.json(db)
})


app.listen(PORT, () =>{
    console.log(`App listening at http://localhost:${PORT}`)
})