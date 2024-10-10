const express = require('express');
var router = express.Router();
// var AccountModel = require('../models/account')

// lay du lieu tu DB (get) lay tat ca
router.get('/', (req, res, next) => {
    AccountModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
});

// lay du lieu tu DB (get) lay mot
router.get('/', (req, res, next) => {
    var id = req.params.id
    AccountModel.findById({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
});

// Them du lieu tu DB (add)
router.post('/', (req, res, next) => {
    // var username = req.body.username
    // var password = req.body.password
    const {
        username,
        password
    } = req.body
    AccountModel.create({
        username: username,
        password: password
    })
        .then(data => {
            res.json('Them account thanh cong')
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
});

// Sua du lieu tu DB (update)
router.put('/:id', (req, res, next) => {
    var id = req.params.id
    var newPassword = req.body.newPassword

    AccountModel.findByIdAndUpdate(id, {
        password: newPassword
    })
        .then(data => {
            res.json('Update Thanh Cong')
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
});

// Xoa du lieu tu DB (delete)
router.delete('/:id', (req, res, next) => {
    // var id = req.params.id   
    AccountModel.deleteOne({
        _id: req.params.id
    })
        .then(data => {
            res.json('Xoa Thanh Cong')
        })
        .catch(err => {
            res.status(500).json('loi server')
        })
});

module.exports = router