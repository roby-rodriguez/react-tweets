import mongoose from 'mongoose'

module.exports = mongoose.model('User', {
    _id: String,
    access_token: String,
    access_token_secret: String,
    displayName: String,
    username: String,
    avatar: String
})