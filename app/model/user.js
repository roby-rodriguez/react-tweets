import mongoose from 'mongoose'

module.exports = mongoose.model('User', {
    id: String,
    token: String,
    displayName: String,
    username: String
})