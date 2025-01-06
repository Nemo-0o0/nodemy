const express = require('express');
const app = express()
const path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')
var port = 3000;
const AccountModel = require('./models/account')
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')

// const redis = require('redis');
// const redisClient = redis.createClient()
// const redisStore = require('connect-redis')(session)
// redisClient.on('error', (err) => {
//     console.error('Redis error: ', err);
// });

// Use Redis store for sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 5000 },
    // store: new redisStore({
    //     host: 'localhost',
    //     port: 6379, // Redis port
    //     client: redisClient, // Use the Redis client
    //     ttl: 86400, // Time-to-live for session (in seconds)
    // }),
}));


app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')))

// #15 Session Cookie
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'demo-cookie.html'))
})

// Access the session as req.session
app.get('/demo', function (req, res, next) {
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})

app.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.send('Logout success')
})

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
// app.get('/login', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'login.html'))
// })

// app.get('/home', (req, res, next) => {
//     var token = req.cookies.token
//     var decodeToken = jwt.verify(token, "mk")
//     AccountModel.find({ _id: decodeToken._id }).then(function (data) {
//         console.log(data)
//         if (data.length == 0) {
//             return res.redirect("/login ")
//         } else {
//             if (data[0].role == 2 || data[0].role == 1 || data[0].role == 0) {
//                 next()
//             } else {
//                 return res.redirect("/login")
//             }
//         }
//     })
// }, (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'home.html'))
// })

// app.post("/edit", function (req, res, next) {
//     var token = req.headers.cookie.split("=")[1]
//     var decodeToken = jwt.verify(token, "mk")
//     AccountModel.find({ _id: decodeToken._id }).then(function (data) {
//         if (data.length == 0) {
//             return res.redirect('/login')
//         } else {
//             if (data[0].role == 2) {
//                 next()
//             } else {
//                 return res.json({
//                     error: true,
//                     message: 'Ban khong co quyen sua'
//                 })
//             }
//         }
//     })
// }, function (req, res) {
//     res.json("sua thanh cong")
// })


// app.get('/student', (req, res, next) => {
//     var token = req.cookies
//     console.log(token)
// }, (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'student.html'))
// })



// // POST Login
// app.post('/login', (req, res, next) => {
//     var { username, password } = req.body;

//     AccountModel.findOne({
//         username,
//         password
//     })
//         .then(data => {
//             if (data) {
//                 var token = jwt.sign({ _id: data._id }, 'mk')
//                 return res.json({
//                     message: 'thanh cong',
//                     token: token
//                 })
//             } else {
//                 return res.json('That Bai')
//             }
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json('Loi server')
//         })
// })

// var checkLogin = (req, res, next) => {
//     // check login
//     try {
//         var token = req.cookies.token
//         var idUser = jwt.verify(token, 'mk')
//         AccountModel.findOne({
//             _id: idUser
//         })
//             .then(data => {
//                 if (data) {
//                     req.data = data
//                     console.log(data)
//                     next()
//                 } else {
//                     res.json('NOT PERMISSON')
//                 }
//             })
//             .catch(err => {

//             })
//     } catch {
//         res.status(500).json('TOken không hợp lệ')
//     }
// }


// var checkStudent = (req, res, next) => {
//     var role = req.data.role

//     if (role >= 0) {
//         next()
//     } else {
//         res.send('Chua đăng nhập quyền ')
//     }
// }
// var checkTeacher = (req, res, next) => {
//     var role = req.data.role

//     if (role >= 1) {
//         next()
//     } else {
//         res.send('Đăng nhập quyền teacher')
//     }
// }

// var checkManager = (req, res, next) => {
//     var role = req.data.role
//     if (role >= 2) {
//         next()
//     } else {
//         res.send('đăng nhập quyền manager ')
//     }
// }

// var checkCompany = (req, res, next) => {
//     var role = req.data.role
//     if (role >= 3) {
//         next()
//     } else {
//         res.send('đăng nhập quyền company ')
//     }
// }

// // Task
// app.get('/task', checkLogin, checkStudent, (req, res, next) => {
//     console.log(req.data)
//     res.json('ALL Task')
// })

// // STUDENT
// app.get('/student', checkLogin, checkTeacher, (req, res, next) => {
//     console.log(req.data)
//     res.json('STUDENT')
// })

// // TEACHER
// app.get('/teacher', checkLogin, checkManager, (req, res, next) => {
//     console.log(req.data)
//     res.json('TEACHER')
// })

// // MANAGER
// app.get('/manager', checkLogin, checkCompany, (req, res, next) => {
//     console.log(req.data)
//     // res.sendFile(path.join(__dirname, 'index.html'))
//     res.json('MANAGER')
// })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})