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
            // console.log(JSON.stringify(profile))
            User.findById(profile.id, (err, user) => {
                if (err)
                    return done(err)
                if (user) {
                    return done(null, user)
                } else {
                    let newUser = new User()
                    newUser._id = profile.id
                    newUser.token = token
                    newUser.username = profile.name
                    newUser.displayName = profile.screen_name
                    newUser.avatar = profile.profile_image_url_https
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