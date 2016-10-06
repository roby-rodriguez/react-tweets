import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: String,
    requestToken: String,
    requestSecret: String,
    accessToken: String,
    accessSecret: String
})

var User = mongoose.model('User', userSchema)
module.exports = User