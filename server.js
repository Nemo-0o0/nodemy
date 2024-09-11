const express = require('express');
const app = express()
var bodyParser = require('body-parser')
var port = 3000;
const AccountModel = require('./models/account')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Dang ki 
app.post('/register', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username
    })
        .then(data => {
            if (data) {
                res.status(400).json('Tai khoan da ton tai')
            } else {
                return AccountModel.create({
                    username: username,
                    password: password
                })
            }
        })
        .then(data => {
            res.json('Tao Thanh cong')
        })
        .catch(err => {
            res.status(500).json('Tao tai khoan that bai')
        })
    console.log(username, password)
})
// Dang nhap
app.post('/login', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username,
        password: password
    })
        .then(data => {
            if (data) {
                res.json('Dan nhap thanh cong')
            } else {
                res.status(500).json('Dang nhap khong thanh cong')
            }
        })
        .catch(err => {
            res.status(401).json('Sai ten dang nhap hoac mat khau')
        })
})

var accountRouter = require('./Router/router')
app.use('/api/account/', accountRouter)
app.get('/', (req, res, next) => {
    res.send('Home')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})