var jwt = require('jsonwebtoken')
var fs = require('fs')

// Ma Hoa
// var privateKey = fs.readFileSync('./Key/private.pem');
// var token = jwt.sign({ foo: 'dit cu nha may' }, privateKey, { algorithm: 'RS256' });

// console.log(token)

//  Giai Ma
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJkaXQgY3UgbmhhIG1heSIsImlhdCI6MTczNDU5MDA3Nn0.C0Txw0Eb5M6wEBdr6WhMtHrGv7Xfmwy9PQJwNKvEVYYmnQ7ehusjVl13R5mzAiL7rxigOybHWqbNiawRe_xxpwBbz-qYfbooE7Vkr2VdC5uTtK_-eq-Bq-dHJAZ3eKqZ61JuYOUJ5WKVufkOcWPM22isWyhP8Kf9hjQs4S9ymPSaj-4LoUrNOdddLupEGcwSm355OC9Y2HWPwsMQxkh1w9IMhc6ICIfDOACV_mCjVlVaPmc8psVrHovLbiu1sibwJ2dG-eLRBybkti13rZPx5bdNlOkm4polG7U7rldDm9E6gFeXRSVsxqGzH4jFxYgO7UEr3lTMZGMTUxgPgSLeEw'
var publicKey = fs.readFileSync('./Key/publickey.crt');

jwt.verify(token, publicKey, { algorithms: ['RS256'] }, function (err, data) {
    console.log(err)
    console.log(data)
})
