import mongoose from 'mongoose'

module.exports = mongoose.model('User', {
    _id: String,
    token: String,
    displayName: String,
    username: String,
    avatar: String
})