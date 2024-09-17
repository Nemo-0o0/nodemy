// Using Node.js `require()`
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/pagination')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
}, {
    collection: 'user'
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel

for (let i = 0; i < 10; i++) {
    userModel.create({
        user: 'Das_' + i,
        password: '123123'
    })
        .then(() => console.log(`User ${i} created`))
        .catch(err => console.error(`Error creating user ${i}:`, err));
}