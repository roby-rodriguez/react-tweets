import passport from 'passport-twitter'
import User from '../model/user'
import config from  '../config'
const TwitterStrategy = passport.Strategy

module.exports = function (passport) {

    console.log(config)

    passport.use('twitter', new TwitterStrategy({
        consumerKey: config.consumer_key,
        consumerSecret: config.consumer_secret,
        callbackURL: config.callbackURL
    }, (token, tokenSecret, profile, done) => {
        process.nextTick(() => {
            User.findOneAndUpdate({
                // search query
                _id: profile.id
            }, {
                // updates
                _id: profile.id,
                access_token: token,
                access_token_secret: tokenSecret,
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
                    updatedUser["access_token_secret"] = undefined
                    console.log(updatedUser)
                    return done(null, updatedUser)
                }
            })
        })
    }))
}
