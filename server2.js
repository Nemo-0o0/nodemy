// const express = require('express');
// const app = express()
// const path = require('path')
// var bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json())
// app.use('/public', express.static(path.join(__dirname, 'public')))

// // Cros
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     next();
// })

// // Pagination
// const userModel = require('./models/user')
// const PAGE_SIZE = 2;

// app.get('/home', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'index.html'))
// })
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

// app.listen(4000)