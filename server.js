const express = require('express');
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var port = 3000;
const AccountModel = require('./models/account')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')


app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')))


// Cros
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     next();
// })

// Dang ki  
// app.post('/register', (req, res, next) => {
//     var username = req.body.username
//     var password = req.body.password

//     AccountModel.findOne({
//         username: username
//     })
//         .then(data => {
//             if (data) {
//                 res.status(400).json('Tai khoan da ton tai')
//             } else {
//                 return AccountModel.create({
//                     username: username,
//                     password: password
//                 })
//             }
//         })
//         .then(data => {
//             res.json('Tao Thanh cong')
//         })
//         .catch(err => {
//             res.status(500).json('Tao tai khoan that bai')
//         })
//     console.log(username, password)
// })
// Dang nhap
// app.post('/login', (req, res, next) => {
//     var username = req.body.username
//     var password = req.body.password

//     AccountModel.findOne({
//         username: username,
//         password: password
//     })
//         .then(data => {
//             if (data) {
//                 res.json('Dan nhap thanh cong')
//             } else {
//                 res.status(500).json('Dang nhap khong thanh cong')
//             }
//         })
//         .catch(err => {
//             res.status(401).json('Sai ten dang nhap hoac mat khau')
//         })
// })

// var accountRouter = require('./Router/router')
// app.use('/api/account/', accountRouter)
app.get('/', (req, res, next) => {
    res.send('Home')
})

// Pagination
// const userModel = require('./models/user')
// const PAGE_SIZE = 2;

// app.get('/user', (req, res, next) => {
//     var page = req.query.page; // "3"

//     if (page) {
//         // get page
//         page = parseInt(page)
//         if (page < 1) {
//             page = 1
//         }
//         var skip = (page - 1) * PAGE_SIZE // 6

//         userModel.find({})
//             .skip(skip)
//             .limit(PAGE_SIZE)
//             .then(data => {
//                 userModel.countDocuments({}).then(total => {
//                     var tongSoPage = Math.ceil(total / PAGE_SIZE)
//                     res.json({
//                         total: total,
//                         tongSoPage: tongSoPage,
//                         data: data
//                     })
//                 })
//                 // res.json(data)
//             })
//             .catch(err => {
//                 res.status(500).send(err)
//             })

//     } else {
//         // get all 
//         userModel.find({})
//             .then(data => {
//                 userModel.countDocuments({}).then(total => {
//                     console.log(total)
//                     var tongSoPage = Math.ceil(total / PAGE_SIZE)
//                     res.json({
//                         tongSoPage: tongSoPage,
//                         data: data
//                     })
//                 })
//             })
//             .catch(err => {
//                 res.status(500).send(err)
//             })
//     }
// })


// GET Login
app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'login.html'))
})

// POST Login
app.post('/login', (req, res, next) => {
    var { username, password } = req.body;

    AccountModel.findOne({
        username,
        password
    })
        .then(data => {
            if (data) {
                var token = jwt.sign({ _id: data._id }, 'mk')
                return res.json({
                    message: 'thanh cong',
                    token: token
                })
            } else {
                return res.json('That Bai')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json('Loi server')
        })
})

var checkLogin = (req, res, next) => {
    // check login
    try {
        var token = req.cookies.token
        var idUser = jwt.verify(token, 'mk')
        AccountModel.findOne({
            _id: idUser
        })
            .then(data => {
                if (data) {
                    req.data = data
                    console.log(data)
                    next()
                } else {
                    res.json('NOT PERMISSON')
                }
            })
            .catch(err => {

            })
    } catch {
        res.status(500).json('TOken không hợp lệ')
    }
}

var role = req.data.role
var checkStudent = (req, res, next) => {
    if (role === 'student' || 'teacher' || 'manager') {
        next()
    } else {
        res.send('Chua đăng nhập quyền ')
    }
}
var checkTeacher = (req, res, next) => {
    if (role === 'teacher' || 'manager') {
        next()
    } else {
        res.send('Đăng nhập quyền teacher or manager')
    }
}

var checkManager = (req, res, next) => {
    if (role === 'manager') {
        next()
    } else {
        res.send('đăng nhập quyền manager ')
    }
}

// MANAGER
app.get('/task', checkLogin, checkStudent, (req, res, next) => {
    console.log(req.data)
    res.send('ALL Task')
})

// STUDENT
app.get('/student', checkLogin, checkTeacher, (req, res, next) => {
    next()
}, (req, res, next) => {
    res.send('STUDENT')
})

// TEACHER
app.get('/teacher', checkLogin, checkManager, (req, res, next) => {
    next()
}, (req, res, next) => {
    res.send('TEACHER')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})