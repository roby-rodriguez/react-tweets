import twitter from './twitter'
import User from '../model/user'

module.exports = function (passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

    twitter(passport)
}