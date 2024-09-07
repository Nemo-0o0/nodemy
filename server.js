const express = require('express');
const app = express()
const port = 3000
var router = require('./apiRouter')


var checkdangnhap = (req, res, next) => {
    if (dangnhap) {
        req.user = user;
        next();
    } else {
        res.json('Bạn chưa đăng nhập');
    }
};

var checkadmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.json('Bạn không có quyền truy cập');
    }
};
app.get('/', checkdangnhap, (req, res, next) => {
    res.json('du lieu')
})

app.use('/admin/api/', checkadmin, checkdangnhap, router)
app.use('/api/', router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})