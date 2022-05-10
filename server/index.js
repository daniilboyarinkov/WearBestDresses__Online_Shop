const express = require('express')
const cors = require('cors')
require('dotenv').config()

const catalog = require('./static/catalog/catalog')

const PORT = process.env.PORT || 5000

const server = express()

server.use(cors())
server.use(express.static('static'))

server.get('/catalog', (_, res) => {
    res.json(catalog.all)
})

server.get('/catalog/:category', (req, res) => {
    const { category } = req.params
    const categoryProduct = catalog[`${category}`]
    res.json(categoryProduct || { error: 'No such a category' })
})

server.get('/catalog/:category/product/:id', (req, res) => {
    const { category, id } = req.params
    const product = catalog[`${category}`].find((p) => p.id == id)
    res.json(product || { error: 'No such a product' })
})

server.get('/catalog/product/:id', (req, res) => {
    const { id } = req.params
    const product = catalog.all.find((p) => p.id == id)
    res.json(product || { error: 'No such a product' })
})

server.listen(PORT, console.log(`Server has started on port ${PORT}`))
