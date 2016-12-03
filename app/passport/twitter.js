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
            User.findOneAndUpdate({
                // search query
                _id: profile.id
            }, {
                // updates
                _id: profile.id,
                token: token,
                tokenSecret: tokenSecret,
                username: profile.username,
                displayName: profile.displayName,
                avatar: profile._json.profile_image_url_https.replace("_normal","")
            }, {
                // options
                new: true, // return modified document
                upsert: true // create if not exists
            }, (err, updatedUser) => {
                if (err)
                    return done(err)
                else {
                    // would've been nice if es6 worked by default, with imports n shit
                    // let { tokenSecret, ...sanitizedUser } = updatedUser
                    updatedUser["tokenSecret"] = undefined
                    console.log(updatedUser)
                    return done(null, updatedUser)
                }
            })
        })
    }))
}
