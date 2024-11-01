var jwt = require('jsonwebtoken');

var data = { username: 'nodemy' }
// var token = jwt.sign(data, 'nodemy1234');

// console.log(token);

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGVteSIsImlhdCI6MTczMDE3NDg5NH0.hX8uDWM_yJpEbFZJzRn8CAdZekFn_AZxNNS-1_y3T4o'
// var ketqua = jwt.verify(token, 'nodemy1234') // đồng bộ
// console.log(ketqua); // đồng bộ

// Bất đồng bộ
jwt.sign(data, 'nodemy1234', {
    expiresIn: 60
}, function (err, data) {
    console.log('data', data);
})
console.log('outside'); // bất đ��ng bộ



