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
            User.findOneAndUpdate({
                // search query
                _id: profile.id
            }, {
                // updates
                _id: profile.id,
                token: token,
                tokenSecret: tokenSecret,
                username: profile._json.name,
                displayName: profile._json.screen_name,
                avatar: profile._json.profile_image_url_https
            }, {
                // options
                new: true, // return modified document
                upsert: true // create if not exists
            }, (err, updatedUser) => {
                if (err)
                    return done(err)
                else {
                    let { tokenSecret, ...sanitizedUser } = updatedUser
                    return done(null, sanitizedUser)
                }
            })
        })
    }))
}
