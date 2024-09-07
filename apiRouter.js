const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send('Home!')
})
router.get('/product', (req, res) => {
    res.send('Product!')
})
router.get('/booking', (req, res) => {
    res.send('Booking!')
})
router.get('/:id', (req, res) => {
    res.send('Click path: ' + req.params.id)
})

module.exports = router