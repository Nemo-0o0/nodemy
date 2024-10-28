const express = require('express');
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var port = 3000;
// const AccountModel = require('./models/account')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')))

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

// Pagination
const userModel = require('./models/user')
const PAGE_SIZE = 2;

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/user', (req, res, next) => {
    var page = req.query.page; // "3"

    if (page) {
        // get page
        page = parseInt(page)
        if (page < 1) {
            page = 1
        }
        var skip = (page - 1) * PAGE_SIZE // 6

        userModel.find({})
            .skip(skip)
            .limit(PAGE_SIZE)
            .then(data => {
                userModel.countDocuments({}).then(total => {
                    var tongSoPage = Math.ceil(total / PAGE_SIZE)
                    res.json({
                        total: total,
                        tongSoPage: tongSoPage,
                        data: data
                    })
                })
                // res.json(data)
            })
            .catch(err => {
                res.status(500).send(err)
            })

    } else {
        // get all 
        userModel.find({})
            .then(data => {
                userModel.countDocuments({}).then(total => {
                    console.log(total)
                    var tongSoPage = Math.ceil(total / PAGE_SIZE)
                    res.json({
                        tongSoPage: tongSoPage,
                        data: data
                    })
                })
            })
            .catch(err => {
                res.status(500).send(err)
            })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})