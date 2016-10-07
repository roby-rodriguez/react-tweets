import passport from 'passport-twitter'
import User from '../model/user'
import config from  '../config'
const TwitterStrategy = passport.Strategy

module.exports = function (passport) {

    passport.use('twitter', new TwitterStrategy({
        consumerKey: config.auth.consumerKey,
        consumerSecret: config.auth.consumerSecret,
        callbackURL: config.auth.callbackURL
    }, (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            User.findOne({ id: profile.id }, (err, user) => {
                if (err)
                    return done(err)
                if (user) {
                    return done(null, user)
                } else {
                    let newUser = new User()
                    newUser.id = profile.id
                    newUser.token = token
                    newUser.username = profile.username
                    newUser.displayName = profile.displayName
                    newUser.save(err => {
                        if (err)
                            throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }))
}